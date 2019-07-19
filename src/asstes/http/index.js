import axios from 'axios';
import { session } from '../js/utils-methods';

const _setParams = (url, params) => {
  const str = Object.keys(params).reduce((result, key) => {
    result += `${key}=${params[key]}&`; // eslint-disable-line
    return result;
  }, '');
  return `${url}?${str.substr(0, str.length - 1)}`;
};

// 需要在请求头中添加token的 url
const tokenUrl = [
  '/api/index',
  '/api/promotions',
  '/api/profile',
  '/api/balance',
];

// 控制
let cancelFlag = false;

// 请求前拦截
axios.interceptors.request.use(
  (request) => {
    // 获取storage中的缓存Token
    const loginInfo = session.getSession('loginInfo');
    tokenUrl.forEach((items) => {
      if (request.url.startsWith(items) && loginInfo) {
        request.headers.Authorization = loginInfo.token;
      }
    });
    return request;
  },
  (err) => {
    console.log('请求超时', err);
    return Promise.reject(err);
  },
);

// 返回后拦截 都返回一个Promise对象
axios.interceptors.response.use(
  // 成功的返回
  response => new Promise((resolve) => {
    // 如果服务端返回了新的 token 就写入 session
    // console.log('response: ', response.headers);
    if (response.headers.authorization) {
      session.setSession('loginInfo', {
        token: response.headers.authorization,
        isLogin: true,
      });
    }
    if (response.status === 200) {
      resolve(response.data);
    }
  }),
  // 失败的返回
  (err) => {
    if (err.response.status === 504 || err.response.status === 404) {
      console.log('服务器被吃了⊙﹏⊙∥');
    } else if (err.response.status === 401) {
      // 401 登录信息失效 重定向到 登录页面
      if (cancelFlag) {
        return Promise.reject(err.response);
      }
      console.log('登录信息失效⊙﹏⊙∥', err.response);
      window.__history__.push('/s/signin');
      cancelFlag = true;
    } else if (err.response.status === 500) {
      console.log('服务器开小差了⊙﹏⊙∥');
    }
    return Promise.reject(err.response);
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
  const obj = {
    method: 'get',
    url: params ? _setParams(url, params) : url,
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
