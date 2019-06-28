import uuid from 'uuid';

const webSiteCagegory = [
  'Adult', 'Arts', 'Automobile', 'Blogs', 'Books', 'Business',
  'Career', 'Celebrities', 'Computer', 'Education', 'Electronics', 'Entertainment',
  'Finance', 'Fitness', 'Food & Beverage', 'Gambling', 'Games', 'Government',
  'Hardware', 'Health', 'Hobbies', 'Home & Family', 'Industry', 'Information Technology',
  'Literature', 'News & Media', 'Others', 'People & Society', 'Pets & Animals', 'Reference',
  'Science', 'Shopping', 'Sports', 'Telecommunications', 'Travel',
];

const monthlyVisitors = ['< 1K', '1K – 10K', '10K – 100K', '100K – 1000K', '>1000K'];

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
  storeProduct,
  myProduct,
  webSiteCagegory,
  monthlyVisitors,
  accountSettingTabs,
};
