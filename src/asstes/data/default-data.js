import uuid from 'uuid';

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

export {
  webSiteCategory,
  monthlyVisitors,
  storeProduct,
  myProduct,
  accountSettingTabs,
};
