import uuid from 'uuid';
import moment from 'moment';

// 网站分类默认数据 (用于信息注册页面)
const webSiteCategory = [
  {
    id: uuid(),
    sign: '1',
    text: 'Adult', // 成人
  },
  {
    id: uuid(),
    sign: '2',
    text: 'Arts', // 艺术
  },
  {
    id: uuid(),
    sign: '3',
    text: 'Automobile', // 汽车
  },
  {
    id: uuid(),
    sign: '4',
    text: 'Blogs', // 博客
  },
  {
    id: uuid(),
    sign: '5',
    text: 'Books', // 图书
  },
  {
    id: uuid(),
    sign: '6',
    text: 'Business', // 商业
  },
  {
    id: uuid(),
    sign: '7',
    text: 'Career', // 事业
  },
  {
    id: uuid(),
    sign: '8',
    text: 'Celebrities', // 名人
  },
  {
    id: uuid(),
    sign: '9',
    text: 'Computer', // 电脑
  },
  {
    id: uuid(),
    sign: '10',
    text: 'Education', // 教育
  },
  {
    id: uuid(),
    sign: '11',
    text: 'Electronics', // 电子产品
  },
  {
    id: uuid(),
    sign: '12',
    text: 'Entertainment', // 娱乐
  },
  {
    id: uuid(),
    sign: '13',
    text: 'Finance', // 金融
  },
  {
    id: uuid(),
    sign: '14',
    text: 'Fitness', // 身体素质
  },
  {
    id: uuid(),
    sign: '15',
    text: 'Food & Beverage', // 食品与饮料
  },
  {
    id: uuid(),
    sign: '16',
    text: 'Gambling', // 赌博
  },
  {
    id: uuid(),
    sign: '17',
    text: 'Games', // 游戏
  },
  {
    id: uuid(),
    sign: '18',
    text: 'Government', // 政府
  },
  {
    id: uuid(),
    sign: '19',
    text: 'Hardware', // 硬件
  },
  {
    id: uuid(),
    sign: '20',
    text: 'Health', // 健康
  },
  {
    id: uuid(),
    sign: '21',
    text: 'Hobbies', // 嗜好
  },
  {
    id: uuid(),
    sign: '22',
    text: 'Home & Family', // 家庭
  },
  {
    id: uuid(),
    sign: '23',
    text: 'Industry', // 行业
  },
  {
    id: uuid(),
    sign: '24',
    text: 'Information Technology', // 文献
  },
  {
    id: uuid(),
    sign: '25',
    text: 'Literature', // 信息技术
  },
  {
    id: uuid(),
    sign: '26',
    text: 'News & Media', // 新闻媒体
  },
  {
    id: uuid(),
    sign: '27',
    text: 'Others', // 其他
  },
  {
    id: uuid(),
    sign: '28',
    text: 'People & Society', // 人与社会
  },
  {
    id: uuid(),
    sign: '29',
    text: 'Pets & Animals', // 宠物和动物
  },
  {
    id: uuid(),
    sign: '30',
    text: 'Reference', // 参考
  },
  {
    id: uuid(),
    sign: '31',
    text: 'Science', // 科学
  },
  {
    id: uuid(),
    sign: '32',
    text: 'Shopping', // 购物
  },
  {
    id: uuid(),
    sign: '33',
    text: 'Sports', // 体育
  },
  {
    id: uuid(),
    sign: '34',
    text: 'Telecommunications', // 电信
  },
  {
    id: uuid(),
    sign: '35',
    text: 'Travel', // 旅行
  },
];

// 网站月访问量 (用于信息注册页面)
const monthlyVisitors = [
  {
    id: uuid(),
    sign: '1',
    text: '< 1k',
  },
  {
    id: uuid(),
    sign: '2',
    text: '1k - 10k',
  },
  {
    id: uuid(),
    sign: '3',
    text: '10k - 100k',
  },
  {
    id: uuid(),
    sign: '4',
    text: '100k - 1000k',
  },
  {
    id: uuid(),
    sign: '5',
    text: '> 1000k',
  },
];

// 修改个人资料页面 的 tabs 文案
const accountSettingTabs = [
  {
    id: 'uuid-1',
    index: 0,
    text: 'Basic Setting',
  },
  {
    id: 'uuid-2',
    index: null,
    text: null,
  },
  {
    id: 'uuid-3',
    index: 1,
    text: 'Wibsite Setting',
  },
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
      text: 'Account Setting',
      links: 'account-setting',
    },
    {
      id: uuid(),
      text: 'Account Balance',
      links: 'account-balance',
    },
    {
      id: uuid(),
      text: 'Change Password',
      links: 'account-password',
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
const myProductStatus = [
  {
    id: uuid(),
    sign: 'normal',
    text: 'Normal',
  },
  {
    id: uuid(),
    sign: 'invalid',
    text: 'Invalid',
  },
];

// 忘记密码页面
const forgetPasswordText = `
  Type in your email address below and well send you an email with 
  Instructions on how to reset your password. Due to Security reasons,
  theink will be valid for 2 hours, after 2 hours you will 
  need to submit anotherrequestgaln.
`;

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

export {
  webSiteCategory,
  monthlyVisitors,
  storeProduct,
  myProduct,
  accountSettingTabs,
  statisticsTabs,
  polylineDaily,
  myHeader,
  myIndexTableHeaders,
  myIndexTablesBody,
  forgetPasswordText,
  emailSentText,
  balanceTableHeaders,
  myProductStatus,
};
