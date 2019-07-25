import React from 'react';
import uuid from 'uuid';
import moment from 'moment';
import Add from '@material-ui/icons/Add';
import Remove from '@material-ui/icons/Remove';
import {
  MySvgIconProfile,
  MySvgIconPayment,
  MySvgIconWebsite,
  MySvgIconPsd,
  MySvgIconTaxes,
  MySvgIconReset,
  MySvgIconScaleX,
  MySvgIconScaleY,
  MySvgIconRightRotate,
  MySvgIconLeftRotate,
} from '../../common/material-ui-component/svg-icon';


// 网站分类 (注册信息页面 | 个人账户页面)
const webSiteCategory = [
  'Adult', // 成人
  'Arts', // 艺术
  'Automobile', // 汽车
  'Blogs', // 博客
  'Books', // 图书
  'Business', // 商业
  'Career', // 事业
  'Celebrities', // 名人
  'Computer', // 电脑
  'Education', // 教育
  'Electronics', // 电子产品
  'Entertainment', // 娱乐
  'Finance', // 金融
  'Fitness', // 身体素质
  'Food & Beverage', // 食品与饮料
  'Gambling', // 赌博
  'Games', // 游戏
  'Government', // 政府
  'Hardware', // 硬件
  'Health', // 健康
  'Hobbies', // 嗜好
  'Home & Family', // 家庭
  'Industry', // 行业
  'Information Technology', // 文献
  'Literature', // 信息技术
  'News & Media', // 新闻媒体
  'Others', // 其他
  'People & Society', // 人与社会
  'Pets & Animals', // 宠物和动物
  'Reference', // 参考
  'Science', // 科学
  'Shopping', // 购物
  'Sports', // 体育
  'Telecommunications', // 电信
  'Travel', // 旅行
];

// 网站月访问量 (用于信息注册页面 | 个人账户页面)
const monthlyVisitors = [
  '< 1k',
  '1k - 10k',
  '10k - 100k',
  '100k - 1000k',
  '> 1000k',
];

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
const polylineDaily = (daily) => {
  // 曲线图中 时间数组
  const dailyTime = [];

  // 曲线图中 数据数组 二位数组
  // 如果没有数据, 则初始化下数据
  const dailyData = [
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
  ];

  if (Array.isArray(daily) && daily.length) {
    dailyData.length = 0;
    daily.forEach((v, i) => {
      // 把时间格式修改 然后存入 this.dailyDate 数组中
      dailyTime.push(moment(v.date).format('MMM DD,YYYY'));
      if (i === 0) {
        dailyData[0] = [v.clicks];
        dailyData[1] = [v.purchaseQty];
        dailyData[2] = [v.rate];
        dailyData[3] = [v.purchaseAmount];
        dailyData[4] = [v.expectedBrokerageAmount];
        dailyData[5] = [v.completeBrokerageAmount];
      } else {
        dailyData[0].push(v.clicks);
        dailyData[1].push(v.purchaseQty);
        dailyData[2].push(v.rate);
        dailyData[3].push(v.purchaseAmount);
        dailyData[4].push(v.expectedBrokerageAmount);
        dailyData[5].push(v.completeBrokerageAmount);
      }
    });
  }
  return {
    dailyTime,
    dailyData,
  };
};

/* 商家推广商品默认数据 */
const storeProduct = {
  productSort: [
    {
      uuid: uuid(),
      name: 'Date: New to Old',
      value: 'dateDesc',
    },
    {
      uuid: uuid(),
      name: 'Date: Old to New',
      value: 'dateAsc',
    },
    {
      uuid: uuid(),
      name: 'Ad Fees Rate: High to Low',
      value: 'rateDesc',
    },
    {
      uuid: uuid(),
      name: 'Ad Fees Rate: Low to High',
      value: 'rateAsc',
    },
    {
      uuid: uuid(),
      name: 'Price: High to Low',
      value: 'priceDesc',
    },
    {
      uuid: uuid(),
      name: 'Price: Low to High',
      value: 'priceAsc',
    },
    {
      uuid: uuid(),
      name: 'Alphabetically: A-Z',
      value: 'nameDesc',
    },
    {
      uuid: uuid(),
      name: 'Alphabetically: Z-A',
      value: 'nameAsc',
    },
  ],
};

/* 我的推广商品默认数据 */
const myProduct = {
  productSort: [
    {
      uuid: uuid(),
      name: 'Selected Date: default',
      value: 'dateDesc',
    },
    {
      uuid: uuid(),
      name: 'Selected Date: Old to New',
      value: 'dateAsc',
    },
    {
      uuid: uuid(),
      name: 'Ad Fees Rate: High to Low',
      value: 'rateDesc',
    },
    {
      uuid: uuid(),
      name: 'Ad Fees Rate: Low to High',
      value: 'rateAsc',
    },
    {
      uuid: uuid(),
      name: 'Alphabetically: A-Z',
      value: 'nameDesc',
    },
    {
      uuid: uuid(),
      name: 'Alphabetically: Z-A',
      value: 'nameAsc',
    },
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
      links: 'my-products',
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
    text: 'Product Qty',
  },
  {
    id: uuid(),
    text: 'Protein',
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
    // eslint-disable-next-line no-nested-ternary
    return status === '0' ? 'Created' : status === '1' ? 'Uncompleted' : 'Completed';
  },

  // 处理表格数据
  setTableData(tables) {
    const arr = [];
    if (!tables.length) {
      return arr;
    }
    let index = 0;
    // eslint-disable-next-line no-restricted-syntax
    for (const v of tables) {
      arr[index] = {
        id: v.id || uuid(),
        orderSN: v.orderSN,
        orderTime: moment(v.orderTime).format('YYYY-MM-DD HH:mm:ss'),
        orderStatus: this.orderStatus(v.orderStatus),
        prodName: v.prodName,
        purchaseQty: v.purchaseQty,
        purchaseAmount: `$ ${v.purchaseAmount}`,
        brokerageRate: `${v.brokerageRate} %`,
        brokerageAmount: `$ ${v.brokerageAmount}`,
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
const myBalanceType = [
  'income',
  'withdraw',
  'refund',
];

// 个人账户index页面
const accountIndex = [
  {
    id: uuid(),
    title: 'Profile',
    text: 'Viw and update your profile',
    links: 'account-profile',
    icon: MySvgIconProfile,
  },
  {
    id: uuid(),
    title: 'Website',
    text: 'Viw and update your websiteinformation',
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
  {
    id: uuid(),
    title: 'Taxes',
    text: 'Manage your taxes information',
    links: 'account-taxes',
    icon: MySvgIconTaxes,
  },
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
    // eslint-disable-next-line no-restricted-syntax
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
};
