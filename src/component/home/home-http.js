import { get } from '../../asstes/http/index';

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
  // eslint-disable-next-line import/prefer-default-export
  httpResponse,
};
