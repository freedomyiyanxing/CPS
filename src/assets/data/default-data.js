import React from 'react';
import uuid from 'uuid';
import moment from 'moment';
import {
  MySvgIconProfile,
  MySvgIconPayment,
  MySvgIconWebsite,
  MySvgIconPsd,
  MySvgIconReset,
  MySvgIconScaleX,
  MySvgIconScaleY,
  MySvgIconRightRotate,
  MySvgIconLeftRotate,
  Add,
  Remove,
} from '../../common/material-ui-component/svg-icon';


// 网站分类 (注册信息页面 | 个人账户页面)
const webSiteCategory = {
  'Adult': 1, // 成人
  'Arts': 2, // 艺术
  'Automobile': 3, // 汽车
  'Blogs': 4, // 博客
  'Books': 5, // 图书
  'Business': 6, // 商业
  'Career': 7, // 事业
  'Celebrities': 8, // 名人
  'Computer': 9, // 电脑
  'Education': 10, // 教育
  'Electronics': 11, // 电子产品
  'Entertainment': 12, // 娱乐
  'Finance': 13, // 金融
  'Fitness': 14, // 身体素质
  'Food & Beverage': 15, // 食品与饮料
  'Gambling': 16, // 赌博
  'Games': 17, // 游戏
  'Government': 18, // 政府
  'Hardware': 19, // 硬件
  'Health': 20, // 健康
  'Hobbies': 21, // 嗜好
  'Home & Family': 22, // 家庭
  'Industry': 23, // 行业
  'Information Technology': 24, // 文献
  'Literature': 25, // 信息技术
  'News & Media': 26, // 新闻媒体
  'People & Society': 27, // 人与社会
  'Pets & Animals': 28, // 宠物和动物
  'Reference': 29, // 参考
  'Science': 30, // 科学
  'Shopping': 31, // 购物
  'Sports': 32, // 体育
  'Telecommunications': 33, // 电信
  'Travel': 34, // 旅行
  'Others': 99, // 其他 99
};

// 网站月访问量 (用于信息注册页面 | 个人账户页面)
const monthlyVisitors = {
  '< 1k': 1,
  '1k - 10k': 2,
  '10k - 100k': 3,
  '100k - 1000k': 4,
  '> 1000k': 5,
};

// 联系我们select选择
const contactUsSelect = {
  'Account': 9,
  'Ads Fees & Earnings': 10,
  'Balance & Withdrawal': 11,
  'Join Us': 12,
  'Linking': 13,
  'Products': 14,
  'Others': 15,
};

// 用户首页 推广数据统计 tab数据
const statisticsTabs = statistics => ([
  {
    id: uuid(),
    unit: null,
    text: 'Clicks',
    value: statistics.clicks,
  },
  {
    id: uuid(),
    unit: null,
    text: 'Ordered items',
    value: statistics.purchaseQty,
  },
  {
    id: uuid(),
    unit: '%',
    text: 'Conversion',
    value: statistics.rate,
  },
  {
    id: uuid(),
    unit: '$',
    text: 'Ordered amount',
    value: statistics.purchaseAmount,
  },
  {
    id: uuid(),
    unit: '$',
    text: 'Esimated earnings from uncompleted items',
    value: statistics.expectedBrokerageAmount,
  },
  {
    id: uuid(),
    unit: '$',
    text: 'Earnings from completed items',
    value: statistics.completeBrokerageAmount,
  },
]);

// 用户首页 推广数据统计 (曲线图)
const polylineDaily = (daily, time) => {
  // 曲线图中 时间数组
  const dailyTime = [];

  // 曲线图中 数据数组 二位数组
  const dailyData = [];
  if (Array.isArray(daily) && daily.length) {
    daily.forEach((v, i) => {
      // 把时间格式修改 然后存入 this.dailyDate 数组中
      dailyTime.push(moment(v.date).format('MMM DD,YYYY'));
      const {
        clicks, purchaseQty, rate, purchaseAmount, expectedBrokerageAmount, completeBrokerageAmount,
      } = v;
      if (i === 0) {
        dailyData[0] = [clicks];
        dailyData[1] = [purchaseQty];
        dailyData[2] = [rate];
        dailyData[3] = [purchaseAmount];
        dailyData[4] = [expectedBrokerageAmount];
        dailyData[5] = [completeBrokerageAmount];
      } else {
        dailyData[0].push(clicks);
        dailyData[1].push(purchaseQty);
        dailyData[2].push(rate);
        dailyData[3].push(purchaseAmount);
        dailyData[4].push(expectedBrokerageAmount);
        dailyData[5].push(completeBrokerageAmount);
      }
    });
  } else {
    const day = 24 * 60 * 60 * 1000;
    const numbers = Math.ceil((time.end - time.start) / day) || 10; // 获得相隔天数
    const aa = new Date().getTime() - (day * 10);
    for (let i = 0; i < numbers; i += 1) {
      dailyTime.push(moment((time.start || aa) + (i * day)).format('MMM DD,YYYY'));
    }
    for (let d = 0; d < 6; d += 1) {
      dailyData[d] = Array.from({ length: numbers }, () => 0);
    }
  }
  return {
    dailyTime,
    dailyData,
  };
};

/* 商家推广商品默认数据 */
const storeProduct = {
  productSort: [ // value 就是请求参数, 详情请看接口文档和需求文档
    {
      uuid: uuid(),
      name: 'Date: New to Old',
      value: 'createdDate,desc&sort=brokerageRate,desc&sort=prodPrice,desc&sort=prodName',
    },
    {
      uuid: uuid(),
      name: 'Date: Old to New',
      value: 'createdDate&sort=brokerageRate,desc&sort=prodPrice,desc&sort=prodName',
    },
    {
      uuid: uuid(),
      name: 'Ad Fees Rate: High to Low',
      value: 'brokerageRate,desc&sort=createdDate,desc&sort=prodPrice,desc&sort=prodName',
    },
    {
      uuid: uuid(),
      name: 'Ad Fees Rate: Low to High',
      value: 'brokerageRate&sort=createdDate,desc&sort=prodPrice,desc&sort=prodName',
    },
    {
      uuid: uuid(),
      name: 'Price: High to Low',
      value: 'prodPrice,desc&sort=createdDate,desc&sort=brokerageRate,desc&sort=prodName',
    },
    {
      uuid: uuid(),
      name: 'Price: Low to High',
      value: 'prodPrice&sort=createdDate,desc&sort=brokerageRate,desc&sort=prodName',
    },
    {
      uuid: uuid(),
      name: 'Alphabetically: A-Z',
      value: 'prodName&sort=createdDate,desc&sort=brokerageRate,desc&sort=prodPrice,desc',
    },
    {
      uuid: uuid(),
      name: 'Alphabetically: Z-A',
      value: 'prodName,desc&sort=createdDate,desc&sort=brokerageRate,desc&sort=prodPrice,desc',
    },
  ],
};

/* 我的推广商品默认数据 */
const myProduct = {
  productSort: [
    {
      uuid: uuid(),
      name: 'Selected Date: default',
      value: 'promotionProduct.createdDate,desc&sort=promotionProduct.brokerageRate,desc&sort=promotionProduct.prodName',
    },
    {
      uuid: uuid(),
      name: 'Selected Date: Old to New',
      value: 'promotionProduct.createdDate&sort=promotionProduct.brokerageRate,desc&sort=promotionProduct.prodName',
    },
    {
      uuid: uuid(),
      name: 'Ad Fees Rate: High to Low',
      value: 'promotionProduct.brokerageRate,desc&sort=promotionProduct.createdDate,desc&sort=promotionProduct.prodName',
    },
    {
      uuid: uuid(),
      name: 'Ad Fees Rate: Low to High',
      value: 'promotionProduct.brokerageRate&sort=promotionProduct.createdDate,desc&sort=promotionProduct.prodName',
    },
    {
      uuid: uuid(),
      name: 'Alphabetically: A-Z',
      value: 'promotionProduct.prodName&sort=promotionProduct.createdDate,desc&sort=promotionProduct.brokerageRate,desc',
    },
    {
      uuid: uuid(),
      name: 'Alphabetically: Z-A',
      value: 'promotionProduct.prodName,desc&sort=promotionProduct.createdDate,desc&sort=promotionProduct.brokerageRate,desc',
    },
  ],
  tableHeadText: [
    '',
    'Items Name',
    'Price',
    'Category',
    'Advertising Fees',
    'Remaining Days',
    'Status',
    '',
  ],
};

// 登录完成的头部 下拉菜单
const myHeader = {
  homeList: [
    {
      id: uuid(),
      text: 'Product Search',
      links: 'product-search',
    },
    {
      id: uuid(),
      text: 'My Products',
      links: 'own-products',
    },
  ],

  account: [
    {
      id: uuid(),
      text: 'Account',
      links: 'account',
    },
    {
      id: uuid(),
      text: 'Account Balance',
      links: 'account-balance',
    },
  ],
};

// 登录首页 表格头部标题文字
const myIndexTableHeaders = [
  {
    id: uuid(),
    text: 'Order Number',
  },
  {
    id: uuid(),
    text: 'Purdchase Time',
  },
  {
    id: uuid(),
    text: 'Order Status',
  },
  {
    id: uuid(),
    text: 'Product Name',
  },
  {
    id: uuid(),
    text: 'Product Qty',
  },
  {
    id: uuid(),
    text: 'Amount',
  },
  {
    id: uuid(),
    text: 'Advertising fees rate',
  },
  {
    id: uuid(),
    text: 'Earnings',
  },
];

// 登录首页 表格数据处理
const myIndexTablesBody = {
  orderStatus(status) {
    switch (status) {
      case 1:
        return 'Uncompleted';
      case 2:
        return 'Completed';
      case 3:
        return 'Returned';
      case 4:
        return 'Cancelled';
      default:
        return '';
    }
  },

  // 处理表格数据
  setTableData(tables) {
    const arr = [];
    if (!tables.length) {
      return arr;
    }
    let index = 0;
    for (const v of tables) {
      arr[index] = {
        id: v.id || uuid(),
        orderSN: v.orderSN,
        orderTime: moment(v.orderTime).format('YYYY-MM-DD HH:mm:ss'),
        orderStatus: this.orderStatus(v.orderStatus),
        prodName: v.prodName,
        purchaseQty: v.purchaseQty,
        purchaseAmount: `$ ${v.purchaseAmount.toFixed(2)}`,
        brokerageRate: `${v.brokerageRate} %`,
        brokerageAmount: `$ ${v.brokerageAmount.toFixed(2)}`,
      };
      index += 1;
    }
    return arr;
  },
};

// 个人账户account-balance页 (表格头部数据)
const balanceTableHeaders = [
  {
    id: uuid(),
    text: 'Date',
  },
  {
    id: uuid(),
    text: 'Amount',
  },
  {
    id: uuid(),
    text: 'Balance',
  },
  {
    id: uuid(),
    text: 'Type',
  },
  {
    id: uuid(),
    text: 'Description',
  },
];

// 个人推广商品页面 状态刷选 默认数据
const myProductStatus = ['Invalid', 'Normal'];

// 个人账户的个人推广商品明细
const myBalanceType = {
  'Get Earnings': 1,
  'Withdraw': 2,
  'Refund': 3,
};

// 个人账户index页面
const accountIndex = [
  {
    id: uuid(),
    title: 'Profile',
    text: 'View and update your profile',
    links: 'account-profile',
    icon: MySvgIconProfile,
  },
  {
    id: uuid(),
    title: 'Website',
    text: 'View and update your website information',
    links: 'account-website',
    icon: MySvgIconWebsite,
  },
  {
    id: uuid(),
    title: 'Password',
    text: 'Change your password',
    links: 'account-password',
    icon: MySvgIconPsd,
  },
  {
    id: uuid(),
    title: 'Payment',
    text: 'Manage your payment information',
    links: 'account-payment',
    icon: MySvgIconPayment,
  },
  // {
  //   id: uuid(),
  //   title: 'Taxes',
  //   text: 'Manage your taxes information',
  //   links: 'account-taxes',
  //   icon: MySvgIconTaxes,
  // },
];

// 忘记密码页面
const forgetPasswordText = 'Type in your email address below and well send you an email with Instructions on how to reset your password. Due to Security reasons, theink will be valid for 2 hours, after 2 hours you will need to submit anotherrequestgaln.';

// 邮件发送页面
const emailSentText = (is) => {
  let s = null;
  if (is) {
    s = 'Please click the link in the email to confirm your email address';
  } else {
    s = `
      with a link to reset your password,Please click here 
      tologin to your mail box, The email might take a couple 
      of minutes to reach your account, Please check your lunk 
      mail to ensure you receive it.
    `;
  }
  return s;
};

// 图片上传裁剪 控制按钮
const cropperBtnArr = [
  {
    id: uuid(),
    name: 'leftRotate',
    icon: MySvgIconLeftRotate,
  },
  {
    id: uuid(),
    name: 'rightRotate',
    icon: MySvgIconRightRotate,
  },
  {
    id: uuid(),
    name: 'scaleX',
    icon: MySvgIconScaleX,
  },
  {
    id: uuid(),
    name: 'scaleY',
    icon: MySvgIconScaleY,
  },
  {
    id: uuid(),
    name: 'reset',
    icon: MySvgIconReset,
  },
];

// 处理余额明细页面中的 表格数据
const amountTable = {
  setAmount(classes, type, amount = null) {
    return (
      <span className={classes.amount}>
        {
          amount > 0 && (
            type === '1' || type === '3'
              ? <Add className={classes.icon} />
              : <Remove className={classes.icon} />
          )
        }
        $
        {amount.toFixed(2)}
      </span>
    );
  },
  operateType(type) {
    if (type === '1') {
      return 'Get Earning';
    }
    if (type === '2') {
      return 'Withdraw';
    }
    if (type === '3') {
      return 'Refund';
    }
    return '';
  },
  setTableData(tables, classes) {
    const arr = [];
    let index = 0;
    for (const v of tables) {
      // 1.改变数据顺序 保证遍历渲染顺序正确
      // 2.处理数据格式
      arr[index] = {
        id: v.id || uuid(),
        createdDate: moment(v.createdDate).format('YYYY-MM-DD HH:mm:ss'),
        amount: this.setAmount(classes, v.operateType, v.amount),
        balance: `$ ${v.balance.toFixed(2)}`,
        operateType: this.operateType(v.operateType),
        remark: v.remark,
      };
      index += 1;
    }
    return arr;
  },
};

// 银行账户的类型
const bankAccountTypes = {
  'Checking': '1',
  'Savings': '2',
};

// 国家类型 Country
const country = {
  'UNITED STATES': 'US',
};

const currencyCode = {
  'USD': 'USD',
};

// 注册用户协议
const agreement = 'In order to make effective use of QQ number resours and safeguard the legitimate rights and interests of users, we have formulated the "QQ Number Rules" (hereinafter referred to as "these Rules") You should read and abide by the Tencent Service an Agreement. Please read carefully and fully understand the contents of each clause, especially the clauses exempting or limiting Tencent\'s liability, the clauses restricting andre users\'rights, the clauses stipulating dispute';

export {
  webSiteCategory,
  monthlyVisitors,
  storeProduct,
  myProduct,
  statisticsTabs,
  polylineDaily,
  myHeader,
  myIndexTableHeaders,
  myIndexTablesBody,
  forgetPasswordText,
  emailSentText,
  balanceTableHeaders,
  myProductStatus,
  myBalanceType,
  accountIndex,
  cropperBtnArr,
  amountTable,
  agreement,
  contactUsSelect,
  bankAccountTypes,
  country,
  currencyCode,
};
