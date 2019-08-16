import moment from 'moment';

const getViewDate = (time) => {
  // 返回 目标时间 与 当前时间 相隔的天数
  const day = moment(time).diff(moment(), 'days');
  if (day >= 1) {
    return `${day} Days`;
  }

  // 如果天数小于1天 则返回小时, 不管小时是否为0 都返回1小时
  const hours = moment(time).diff(moment(), 'hours');
  // 如果是0小时xx分xx秒 && 失效时间必须大于当前时间
  if (hours > -1 && time > new Date().getTime()) {
    return `${hours || 1} Hours`;
  }

  // 如果过期 则返回 Expired
  return 'Expired';
};

// 计算一天的毫秒数
const dayTime = 24 * 60 * 60 * 1000;

/**
 * 获取当前日期的毫秒数  (某一天的 23点59分59秒)
 * @param value 必须是moment对象
 * @param end 为真 获取 (某一天的 23点59分59秒) 否则 获取 (某一天的 0点0分0秒)
 * @returns {boolean}
 */
function getTime(value, end = null) {
  if (!value) return null;
  let n = null;
  if (typeof value === 'number') {
    n = moment(moment(value).format('YYYY-MM-DD')).valueOf();
  } else {
    n = moment(value.format('YYYY-MM-DD')).valueOf();
  }
  if (end === 'end') {
    n = n + dayTime - 1000;
  }
  return n;
}

/**
 * 获取以前多少天的毫秒数
 * @param number 天数
 * @returns {moment.Moment}
 */
function getDaysTime(number = 90) {
  return moment().subtract(number, 'days');
}

// 根据数据设置当前的check值
const getCheckArr = (data, isTrue) => {
  for (const v of data) {
    v.check = isTrue || false;
  }
  return data;
};

// 防抖函数
const debounce = (func, wait = 300) => {
  let timeout; // 定时器变量
  return (event, callback) => {
    clearTimeout(timeout); // 每次触发时先清除上一次的定时器,然后重新计时
    if (event.persist) {
      event.persist(); // 保留对事件的引用
    }
    timeout = setTimeout(() => {
      func(event, callback);
    }, wait); // 指定 xx ms 后触发真正想进行的操作 handler
  };
};

// 密码加密成base64
const psdBase64 = {
  encryption(psd) { // 加base64
    return window.btoa(psd);
  },
  decrypt(psd) { // 解base64
    return window.atob(psd);
  },
};

// localStorage 定时存储
const storage = {
  local: window.localStorage,

  /**
   * localStorage
   * @param name
   * @param obj
   * @param day 默认有效期 15天
   */
  setStorage(name, obj, day = 15) {
    const currentTime = new Date().getTime();
    const days = (dayTime * day) + currentTime;
    const objs = Object.assign({}, { exp: days }, obj);
    this.local.setItem(name, JSON.stringify(objs));
  },

  // 获取
  getStorage(name) {
    const currentTimes = new Date().getTime();
    const result = JSON.parse(this.local.getItem(name));
    if (!result) {
      return null;
    }
    // 已经过期
    if (result.exp < currentTimes) {
      // 清除保存的密码信息
      this.local.removeItem(name);
      return null;
    }
    return result;
  },
};

// sessionStorage 存储
const session = {
  sess: window.sessionStorage,
  setSession(key, value) {
    this.sess.setItem(key, JSON.stringify(value));
  },
  getSession(key) {
    try {
      return JSON.parse(this.sess.getItem(key));
    } catch (e) {
      console.log(e, key, this.sess.getItem(key));
    }
  },
  remove(key) {
    this.sess.removeItem(key);
  },
};

// cookies 存储
// const cookies = {
//   setCookie(key, value) {
//     document.cookie = `${key}=${value}`;
//   },
//
//   getCookie(key) {
//     const name = `${key}=`;
//     const ca = document.cookie.split(';');
//     for (let i = 0; i < ca.length; i += 1) {
//       const c = ca[i].trim();
//       if (c.indexOf(name) === 0) {
//         return c.substring(name.length, c.length);
//       }
//     }
//     return null;
//   },
// };

// 处理搜索参数 (剔除value为空字符串与null的属性)
const setSearchArg = (value) => {
  const obj = {};
  Object.keys(value).forEach((items) => {
    if (value[items] !== '' && value[items] != null) {
      obj[items] = value[items];
    }
  });
  return obj;
};

// 处理select选择值
const getSelectValue = (arr, value, isKey = false) => {
  if (isKey) {
    const ar = Object.keys(arr);
    for (let i = 0; i < ar.length; i += 1) {
      if (value === ar[i]) {
        return arr[ar[i]];
      }
    }
  }
  return Object.keys(arr).filter(key => value === arr[key]).join();
};

// 获取表单是否发送了修改
const getIsForm = (form, data, valueArr) => {
  let isSubmit = true;
  // 触发了change事件
  const errors = form.getFieldError(valueArr);
  if (form.isFieldsTouched(valueArr)) {
    // 是否有错误
    if (Object.keys(errors).some(field => errors[field])) {
      return true;
    }
    // 判断上一次提交对象 与 当前提交对象 不一致
    isSubmit = valueArr.every(items => form.getFieldValue(items) === data[items]);
  }
  return isSubmit;
};

// 处理佣金比例
const setBrokerageRate = (prodPrice, rate) => (prodPrice * (rate / 100)).toFixed(2);

// 处理商品分类数据
const setCategory = (data) => {
  if (!data) return null;
  const arr = [];
  data.forEach((items) => {
    arr.push(items.name);
  });
  return arr;
};

// 判断当前日期是否可提现
const getCurrentDatePaypal = (date) => {
  const arr = date.split(',');
  const obj = {
    isWithdrow: false,
    text: '',
  };
  const { parseInt } = window;
  const currentDay = moment().get('date'); // 获取当前日期
  // data = '5,20' (表示每个月5号到20号) || '5,'(表示每个月5号到月底);
  if (arr.length === 2) {
    const [start, end] = arr;
    if (end === '') {
      obj.isWithdrow = currentDay >= start;
      obj.text = `提现必须是每个月${start}号 至 月底`;
    } else {
      obj.isWithdrow = currentDay >= start && currentDay <= end;
      obj.text = `提现必须是每个月${start}号 至 ${end}号`;
    }
  }
  // data == '5'(表示每个月5号 才有效)
  if (arr.length === 1) {
    obj.isWithdrow = parseInt(arr[0]) === currentDay;
    obj.text = `提现必须是每个月${arr[0]}号`;
  }
  // 其他一律视为 false;
  return obj;
};

export {
  getViewDate,
  getSelectValue,
  getCheckArr,
  debounce,
  psdBase64,
  storage,
  session,
  // cookies,
  getTime,
  getDaysTime,
  setSearchArg,
  getIsForm,
  setBrokerageRate,
  setCategory,
  getCurrentDatePaypal,
};
