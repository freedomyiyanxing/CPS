import React, { useState } from 'react';
import PropTypes from 'prop-types';
import Picker from 'rc-calendar/lib/Picker';
import RangeCalendar from 'rc-calendar/lib/RangeCalendar';
import enUS from 'rc-calendar/lib/locale/en_US';
import moment from 'moment';
import FormControl from '@material-ui/core/FormControl';
import 'moment/locale/en-gb';

import MyInput from '../material-ui-component/input';
import MyTextField from '../material-ui-component/text-field-input';
import MyLabel from '../material-ui-component/input-label';
import DateClose from './date-close';
import { getTime, getDaysTime } from '../../assets/js/utils-methods';
import '../../assets/style/rc-calendar.css';

// 转换 日期的 语言
moment.locale('en-gb');

// 将日期格式转换为 YYYY-MM-DD
function format(v) {
  return v ? v.format('YYYY-MM-DD') : '';
}

// 验证选择的日期
function isValidRange(v) {
  return v && v[0] && v[1];
}

// 时间限制区
function disabledDate(current) {
  // 时间限制 (当前日期的 && 当前日期前90天) 之间的日期 是允许的
  return current < getTime(getDaysTime(90))
    || current > getTime(moment(), 'end');
}

const DateRange = (props) => {
  const { onChange, is } = props;
  const [values, setValues] = useState([]);

  const handleChange = (value) => {
    setValues(value);
    // 获取开始时间的 某一天的 0点0分0秒
    const start = getTime(value[0]);
    // 获取结束时间的 某一天的 23点59分59秒
    const end = getTime(value[1], 'end');
    onChange({
      start,
      end,
    });
  };

  const calendar = (
    <RangeCalendar
      dateInputPlaceholder={['start', 'end']}
      disabledDate={disabledDate}
      locale={enUS}
      showClear
      clearIcon={<DateClose />}
    />
  );

  return (
    <Picker
      value={values}
      onChange={handleChange}
      animation="slide-up"
      calendar={calendar}
    >
      {
        ({ value }) => (
          is
            ? (
              <FormControl
                fullWidth
                margin="dense"
              >
                <MyLabel fontSize="sm" htmlFor="my-rc-calendar">Date Range :</MyLabel>
                <MyInput
                  id="my-rc-calendar"
                  readOnly
                  inputProps={{
                    style: { pointerEvents: 'none' }, // 禁用input框的事件 (防止日期弹框跟@material-ui的label起冲突)
                  }}
                  value={isValidRange(value) ? `${format(value[0])} - ${format(value[1])}` : ''}
                />
              </FormControl>
            )
            : (
              <MyTextField
                label="Date Range :"
                inputProps={{
                  style: { pointerEvents: 'none' }, // 禁用input框的事件
                }}
                value={isValidRange(value) ? `${format(value[0])} - ${format(value[1])}` : ''}
              />
            )
        )
      }
    </Picker>
  );
};

DateRange.propTypes = {
  onChange: PropTypes.func.isRequired,
  is: PropTypes.bool,
};

DateRange.defaultProps = {
  is: false,
};

export default DateRange;
