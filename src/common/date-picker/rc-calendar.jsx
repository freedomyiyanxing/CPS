import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Picker from 'rc-calendar/lib/Picker';
import RangeCalendar from 'rc-calendar/lib/RangeCalendar';
import enUS from 'rc-calendar/lib/locale/en_US';
import moment from 'moment';
import Close from '@material-ui/icons/Close';
import FormControl from '@material-ui/core/FormControl';
import 'moment/locale/en-gb';
import 'rc-calendar/assets/index.css';

import MyInput from '../material-ui-compoents/input';
import MyTextField from '../material-ui-compoents/text-field-input';
import MyLabel from '../material-ui-compoents/input-label';
// eslint-disable-next-line no-unused-vars
import { timeInterval, dayTime } from '../../asstes/js/utils-methods';

import { rcCalendarStyle } from './style';

// 转换 日期的 语言
moment.locale('en-gb');

// 将日期格式转换为 YYYY-MM-DD
function format(v) {
  return v ? v.format('YYYY-MM-DD') : '';
}

// 将日期 转换为 毫秒数
// function valueOf(v) {
//   return v ? v.valueOf() : '';
// }

// 验证选择的日期
function isValidRange(v) {
  return v && v[0] && v[1];
}

// 时间限制区
const interval = timeInterval();
function disabledDate(current) {
  // +一分钟 是保证当前日期是在可选范围
  return current < moment(interval.resultTime) || current > moment(interval.currentTime + 60000);
}

@withStyles(rcCalendarStyle)
class DateRange extends React.Component {
  state = {
    value: [],
  };

  onChange = (value) => {
    const { getDate } = this.props;
    this.setState({ value });
    // 获取开始时间的 某一天的 0点0分0秒
    const start = moment(value[0].format('YYYY-MM-DD')).valueOf();
    // 获取结束时间的 某一天的 23点59分59秒
    const end = moment(value[1].format('YYYY-MM-DD')).valueOf() + dayTime - 1000;
    getDate({
      start,
      end,
    });
  };

  render() {
    const { classes, is } = this.props;
    const { value } = this.state;
    const calendar = (
      <RangeCalendar
        dateInputPlaceholder={['start', 'end']}
        disabledDate={disabledDate}
        locale={enUS}
        showClear
        clearIcon={(
          <span className={classes.root}>
            <Close className={classes.close} />
          </span>
        )}
      />
    );
    return (
      <Picker
        value={value}
        onChange={this.onChange}
        animation="slide-up"
        calendar={calendar}
      >
        {
          // eslint-disable-next-line no-shadow
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
  }
}

DateRange.propTypes = {
  classes: PropTypes.objectOf(PropTypes.object).isRequired,
  getDate: PropTypes.func.isRequired,
  is: PropTypes.bool,
};

DateRange.defaultProps = {
  is: false,
};

export default DateRange;
