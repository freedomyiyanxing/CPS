import { get } from '../../assets/http/index';

const httpResponse = (url, params) => new Promise((resolve, reject) => {
  get(url, params)
    .then((response) => {
      resolve(response);
    })
    .catch((err) => {
      reject(err);
    });
});

export {
  httpResponse,
};
