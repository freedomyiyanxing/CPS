import axios from 'axios';
import { session } from '../js/utils-methods';
import { openNotifications } from '../../common/prompt-box/prompt-box';
import {
  tokenPrompt, clientErrorText, errorText, clientNetworkError,
} from '../data/prompt-text';

const _setParams = (url, params) => {
  const str = Object.keys(params).reduce((result, key) => {
    result += `${key}=${params[key]}&`;
    return result;
  }, '');
  return `${url}?${str.substr(0, str.length - 1)}`;
};

let isGetToken = true; // 当前是否从storage获取token
let loginInfo = null;

// 需要在请求头中添加token的 url
const tokenUrl = [
  '/api/index',
  '/api/promotions',
  '/api/profile',
  '/api/balance',
  '/api/payout',
  '/api/common',
];

// 请求前拦截
axios.interceptors.request.use(
  (request) => {
    // 获取storage中的缓存Token
    if (isGetToken || loginInfo === null) {
      loginInfo = session.getSession('loginInfo') || { token: 'xxx' };
    }
    // 在符合要求的请求头中添加token
    tokenUrl.forEach((items) => {
      if (request.url.startsWith(items) && loginInfo) {
        request.headers.Authorization = loginInfo.token;
      }
    });
    isGetToken = false;
    return request;
  },
  err => Promise.reject(err),
);

// 控制
let cancelFlag = true;

// 返回后拦截 都返回一个Promise对象
axios.interceptors.response.use(
  // 成功的返回
  response => new Promise((resolve) => {
    // 如果服务端返回了新的 token 就写入 session
    if (response.headers.authorization) {
      session.setSession('loginInfo', {
        token: response.headers.authorization,
        isLogin: true,
      });
    }
    if (response.status === 200) {
      resolve(response.data);
    }
    isGetToken = true;
    cancelFlag = true;
  }),
  // 失败的返回
  (err) => {
    const { response } = err;
    // 网络错误拦截
    if (!response) {
      openNotifications.open({
        message: clientNetworkError,
        variant: 'error',
      });
      return Promise.reject(response);
    }
    const { status, data } = response;
    const { violations, detail } = data;
    const message = violations ? violations[0].message : detail;
    if (status === 400) {
      openNotifications.open({
        message,
        variant: 'error',
      });
      return Promise.reject(response);
    }
    if (status === 401) {
      // 401 登录信息失效 重定向到 登录页面
      if (cancelFlag) {
        openNotifications.open({
          message: tokenPrompt.warningText,
          variant: 'warning',
        });
        cancelFlag = false;
        window.__history__.push('/s/signin');
        return Promise.reject(response);
      }
    }
    if (status > 402 && status < 500) {
      openNotifications.open({
        message: detail || clientErrorText,
        variant: 'error',
      });
      return Promise.reject(response);
    }
    if (status >= 500) {
      openNotifications.open({
        message: detail || errorText,
        variant: 'error',
      });
    }
    return Promise.reject(response);
  },
);

// post请求
const postRequestBody = (url, params) => axios({
  method: 'post',
  url,
  data: params,
  headers: {
    'Content-Type': 'application/json',
    charset: 'utf-8',
  },
});

// patch请求
const patchRequestBody = (url, params) => axios({
  method: 'patch',
  url,
  data: params,
  headers: {
    'Content-Type': 'application/json',
    charset: 'utf-8',
  },
});

// get请求
const get = (url, params, buffer) => {
  if (typeof params === 'string') {
    buffer = params;
  }
  const obj = {
    method: 'get',
    url: (typeof params === 'object') ? _setParams(url, params) : url,
  };

  if (buffer) {
    obj.responseType = buffer;
  }
  return axios(obj);
};

// delete请求
const deleteRequestBody = (url, params) => axios({
  method: 'delete',
  url: params ? _setParams(url, params) : url,
});

const multiple = (requsetArray, callback) => {
  axios.all(requsetArray).then(axios.spread(callback));
};

// 成功返回的标志
const SUCCESS = 'Success!';

export {
  get,
  postRequestBody,
  patchRequestBody,
  multiple,
  SUCCESS,
  deleteRequestBody,
};
