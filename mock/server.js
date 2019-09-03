const express = require('express');
const Mock = require('mockjs');

const app = express();

const router = express.Router();

app.use(router);

const timeout = 1000;

router.get('/mock/payout/binding', (req, res) => {
  setTimeout(() => {
    res.json(Mock.mock(binding('paypal')))
  }, timeout)
});

router.get('/mock/common/settings', (req, res) => {
  setTimeout(() => {
    res.json(Mock.mock(settings))
  }, timeout)
});

app.listen('7070', () => {
  console.log('监听端口 7070')
});


// 2.6.1. 查询绑定的提现账号
function binding(isPay) {
  if (isPay === 'paypal') {
    return {
      "id": "312412243221",
      "accountType": "1",
      "paypalEmail": "xforcework-buyer@hotmail.com",
      "paypalName": "test buyer",
      "currencyCode": null,
      "bankAccountCountry": null,
      "bankAccountName": null,
      "bankAccountType": null,
      "bankAccountNumber": null,
      "bankName": null,
      "bankRoutingNumber": null
    }
  } else if (isPay === 'direct') {
    return {
      "id": "312412243221",
      "accountType": "2",
      "paypalEmail": null,
      "paypalName": null,
      "currencyCode": "USD",
      "bankAccountCountry": "US",
      "bankAccountName": "Colin Liu",
      "bankAccountType": "1",
      "bankAccountNumber": "12924371902094122",
      "bankName": "This is bank name",
      "bankRoutingNumber": "1241ASDA12"
    }
  }
  return null
}

// 2.2.1. 查询系统设置
function settings() {
  return {
    "paypal": {
      "mode": "sandbox",
      "returnUrl": "http://192.168.1.20:8800/my/account-payment",
      "appId": "AbnTFD59Dsq2akoU6PWlmfIA9QwDz99Os7eeh9M_2MdjRpwSb03L4G9i3fNMS8wd9b4xhB_NIzUsrhCE"
    },
    "payout": {
      "paypal": {
        "tax": 2.00,
        "min": 100.00,
        "date": "2,20"
      },
      "bank": {
        "tax": 0,
        "min": 100.00,
        "date": "1,"
      }
    }
  }
}
