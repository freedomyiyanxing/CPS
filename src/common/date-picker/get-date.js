const _getYear = (number = 100) => {
  const currentYear = new Date().getFullYear();
  const minYear = currentYear - number;
  const arr = [];
  for (let y = currentYear; y >= minYear; y -= 1) {
    arr.push(y);
  }
  return arr;
};

const _getMonth = Array.from(Array(12), (v, k) => k);

const _getDate = Array.from(Array(31), (v, k) => k);

export default {
  month: _getMonth,
  date: _getDate,
  year: _getYear(),
};

export const MonthText = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];

export const getDefault = (number = null) => {
  let obj = {};
  const now = new Date(number);
  if (number) {
    obj = {
      year: now.getFullYear(),
      month: _getMonth[now.getMonth() + 1],
      date: _getDate[now.getDate()],
    };
  } else {
    obj = {
      year: 'Year',
      month: 'Month',
      date: 'Day',
    };
  }
  obj.time = now.getTime();

  return obj;
};

export const getDateFormat = (year, month, date) => `'${year}/${month}/${date}'`;
