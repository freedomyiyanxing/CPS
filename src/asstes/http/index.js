import axios from 'axios';

// 请求前拦截
axios.interceptors.request.use(
  config => config,
  (err) => {
    console.log('请求超时');
    return Promise.reject(err);
  },
);

// 返回后拦截 都返回一个Promise对象
axios.interceptors.response.use(
  response => new Promise((resolve) => { // 成功的返回
    if (response.status === 200) {
      resolve(response.data);
    }
  }),
  (err) => { // 失败的返回
    if (err.response.status === 504 || err.response.status === 404) {
      console.log('服务器被吃了⊙﹏⊙∥');
    } else if (err.response.status === 401) {
      console.log('登录信息失效⊙﹏⊙∥');
    } else if (err.response.status === 500) {
      console.log('服务器开小差了⊙﹏⊙∥');
    }
    return Promise.reject(err);
  },
);

// @RequestBody请求
const postRequestBody = (url, params) => {
  console.log(params);
  axios({
    method: 'post',
    url,
    data: params,
    headers: {
      'Content-Type': 'application/json',
      charset: 'utf-8',
    },
  });
};

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

const get = url => axios({
  method: 'get',
  url,
});

const multiple = (requsetArray, callback) => {
  axios.all(requsetArray).then(axios.spread(callback));
};

export {
  get,
  postRequestBody,
  postRequestParam,
  multiple,
};
