/* eslint-disable */
import React from 'react';
import axios from 'axios';
import { Redirect } from 'react-router-dom';
import { session } from '../js/utils-methods';

//
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

// 请求前拦截
axios.interceptors.request.use(
  (request) => {
    // 获取storage中的缓存Token
    const loginInfo = JSON.parse(window.sessionStorage.getItem('loginInfo'));
    tokenUrl.forEach((items) => {
      if (request.url.startsWith(items) && loginInfo) {
        request.headers.Authorization = loginInfo.token;
      }
    });
    // console.log('request: ', request);
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
      console.log('登录信息失效⊙﹏⊙∥');
    } else if (err.response.status === 500) {
      console.log('服务器开小差了⊙﹏⊙∥');
    }
    return Promise.reject(err.response);
  },
);

// @RequestBody请求
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


// @RequestParam请求
const postRequestParam = (url, params) => axios({
  method: 'post',
  url,
  data: params,
  transformRequest: [
    (data) => {
      let ret = '';
      // eslint-disable-next-line guard-for-in,no-restricted-syntax
      for (const it in data) {
        ret += `${encodeURIComponent(it)}=${encodeURIComponent(data[it])}&`;
      }
      return ret;
    },
  ],
  headers: {
    'Content-Type': 'application/x-www-form-urlencoded',
  },
});

const get = (url, params) => axios({
  method: 'get',
  url: params ? _setParams(url, params) : url,
});

const multiple = (requsetArray, callback) => {
  axios.all(requsetArray).then(axios.spread(callback));
};

const SUCCESS = 'Success!';

export {
  get,
  postRequestBody,
  postRequestParam,
  patchRequestBody,
  multiple,
  SUCCESS,
};
