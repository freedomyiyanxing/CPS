// 个人信息数据
export const accountData = {
  id: '1242133122222',
  firstName: 'Colin',
  lastName: 'Liu LiuLiuLiuLiuLiu',
  photo: 'https://fengyuanchen.github.io/cropperjs/images/picture.jpg',
  mobile: '+8618600000000',
  balance: 12.06,
  email: '851989962@qq.com',
};

export const statisticsTbs = {
  clicks: 6526,
  purchaseQty: 23.05,
  rate: 0.63,
  purchaseAmount: 125.63,
  expectedBrokerageAmount: 2.23,
  completeBrokerageAmount: 10.56,
};

//模拟曲线图的数据
export const daily = [
  {
    date: 1551269600000, // 4月1
    clicks: 123,
    purchaseQty: 12,
    rate: 57,
    purchaseAmount: 0,
    expectedBrokerageAmount: 12,
    completeBrokerageAmount: 12
  },
  {
    date: 1551456000000, // 4月2
    clicks: 124,
    purchaseQty: 2,
    rate: 23,
    purchaseAmount: 0,
    expectedBrokerageAmount: 12,
    completeBrokerageAmount: 12
  },
  {
    date: 1551542400000, // 4月3
    clicks: 25,
    purchaseQty: 5,
    rate: 32,
    purchaseAmount: 0,
    expectedBrokerageAmount: 12,
    completeBrokerageAmount: 12
  },
  {
    date: 1551628800000, // 4月4
    clicks: 234,
    purchaseQty: 0,
    rate: 36,
    purchaseAmount: 0,
    expectedBrokerageAmount: 12,
    completeBrokerageAmount: 12
  },
  {
    date: 1551715200000, // 4月5
    clicks: 345,
    purchaseQty: 19,
    rate: 47,
    purchaseAmount: 0,
    expectedBrokerageAmount: 12,
    completeBrokerageAmount: 12
  },
  {
    date: 1551801600000, // 4月6
    clicks: 56,
    purchaseQty: 31,
    rate: 29,
    purchaseAmount: 0,
    expectedBrokerageAmount: 12,
    completeBrokerageAmount: 12
  },
  {
    date: 1551888000000, // 4月7
    clicks: 16,
    purchaseQty: 9,
    rate: 78,
    purchaseAmount: 0,
    expectedBrokerageAmount: 12,
    completeBrokerageAmount: 12
  },
  {
    date: 1551974400000, // 4月8
    clicks: 123,
    purchaseQty: 45,
    rate: 65,
    purchaseAmount: 0,
    expectedBrokerageAmount: 12,
    completeBrokerageAmount: 12
  },
  {
    date: 1552060800000, // 4月9
    clicks: 567,
    purchaseQty: 112,
    rate: 20,
    purchaseAmount: 0,
    expectedBrokerageAmount: 12,
    completeBrokerageAmount: 12
  },
  {
    date: 1552147200000, // 4月10
    clicks: 142,
    purchaseQty: 56,
    rate: 80,
    purchaseAmount: 0,
    expectedBrokerageAmount: 12,
    completeBrokerageAmount: 12
  },
];

//查询推广数据明细
export const details = {
  total: 256,
  pages: 12,
  items: [
    {
      orderSN: '124412sd2S',
      orderTime: 1560333699,
      orderStatus: '0',
      prodName: '11商品名字',
      purchaseQty: 1,
      purchaseAmount: 100.00,
      brokerageRate: '0.10',
      brokerageAmount: 10.00
    },
    {
      orderSN: '12441sdf22S',
      orderTime: 1560733699,
      orderStatus: '1',
      prodName: '22商品名字12',
      purchaseQty: 1,
      purchaseAmount: 100.00,
      brokerageRate: '0.10',
      brokerageAmount: 10.00
    },
    {
      orderSN: '124sdf2sd2S',
      orderTime: 1561355847969,
      orderStatus: '2',
      prodName: '商品名字333',
      purchaseQty: 1,
      purchaseAmount: 100.00,
      brokerageRate: '0.10',
      brokerageAmount: 10.00
    },
  ]
};

// 个人查询余额变动
export const balance = {
  total: 1233,
  pages: 50,
  items: [
    {
      createdDate: 1561355847969,
      operateType: 'in',
      amount: 23.01,
      balance: 569.12,
      remark: '描述11111',
    },
    {
      createdDate: 1561337908207,
      operateType: 'out',
      amount: 23.01,
      balance: 569.12,
      remark: '描述22222',
    }
  ]
};

// 查询推广商品
export const promotions = {
  total: 256,
  pages: 12,
  items: [
    {
      id: 124412242141,
      prodId: 5654323521,
      prodName: '商品名字',
      prodPrice: 12.00,
      prodImg: '/upload/image/member/2018/06/09/3d2cc564-25c0-4221-9483-d44b97328553.png',
      storeName: '店铺的名字',
      brokerageRate: 10.00,
      endTime: 1560733699
    }
  ]
};
