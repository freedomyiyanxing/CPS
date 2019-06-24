import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Picker from 'rc-calendar/lib/Picker';
import RangeCalendar from 'rc-calendar/lib/RangeCalendar';
import enUS from 'rc-calendar/lib/locale/en_US';
import moment from 'moment';
import Close from '@material-ui/icons/Close';
import FormControl from '@material-ui/core/FormControl';
import InputLabel from '@material-ui/core/InputLabel';
import 'moment/locale/en-gb';
import 'rc-calendar/assets/index.css';

import MyInput from '../material-ui-compoents/input';
import MyTextField from '../material-ui-compoents/text-field-input';

import { rcCalendarStyle } from './style';

// 转换 日期的 语言
moment.locale('en-gb');

// 将日期格式转换为 YYYY-MM-DD
function format(v) {
  return v ? v.format('YYYY-MM-DD') : '';
}

// 将日期 转换为 毫秒数
function valueOf(v) {
  return v ? v.valueOf() : '';
}

// 验证选择的日期
function isValidRange(v) {
  return v && v[0] && v[1];
}

// 计算一天的毫秒数
const day = 24 * 60 * 60 * 1000;
// 当前时间
const now = new Date().getTime() + day;
// 计算得到从今天往前走90天的毫秒数
const result = now - (90 * day);

// 时间限制区
function disabledDate(current) {
  return current < moment(result) || current > moment(now);
}

@withStyles(rcCalendarStyle)
class DateRange extends React.Component {
  state = {
    value: [],
  };

  onChange = (value) => {
    const { getDate } = this.props;
    this.setState({ value });
    getDate({
      start: valueOf(value[0]),
      end: valueOf(value[1]),
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
                  <InputLabel htmlFor="my-rc-calendar">Date Range :</InputLabel>
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
