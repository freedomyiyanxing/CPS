const getTimes = (time) => {
  const currentTime = new Date().getTime();
  if (currentTime > time) return '无效的商品';
  const dateStamp = time - currentTime;
  const days = dateStamp / (24 * 60 * 60 * 1000);
  const hours = dateStamp / (60 * 60 * 1000);
  const minutes = dateStamp / 60000;
  if (days > 1) {
    return `${Math.floor(days)} Days`; // 返回天数
  }
  if (hours > 1) {
    return `${Math.floor(hours)} Hours`; // 返回小时
  }
  if (minutes > 1) {
    return `${Math.floor(minutes)} Minutes`; // 返回分钟
  }
  return `${Math.floor(dateStamp / 1000)} Seconds`; // 返回秒数
};

const imgPath = 'https://cdn.influmonsters.com/fit-in/250x313/filters:fill(fff)';

// 根据数据设置当前的check值
const getCheckArr = (data, isTrue) => {
  // eslint-disable-next-line no-restricted-syntax
  for (const v of data) {
    v.check = isTrue || false;
  }
  return data;
};


export {
  getTimes,
  imgPath,
  getCheckArr,
};
