/* eslint-disable */
import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import FormControl from '@material-ui/core/FormControl';
import MenuItem from '@material-ui/core/MenuItem';
import FormHelperText from '@material-ui/core/FormHelperText';
import MySelects from '../material-ui-compoents/select';
import MyLabel from '../material-ui-compoents/input-label';

import dateArr, { getDefault, MonthText, getDateFormat } from './get-date';
import datePickerStyle from './style';

@withStyles(datePickerStyle)
class DatePicker extends React.Component {
  constructor(props) {
    super(props);
    const { defaultValue } = this.props;
    this.defaultDate = getDefault(defaultValue);
    this.isSubmit = true;
    this.current = {};
    this.state = {
      _month: defaultValue ? this.defaultDate.month : '',
      _date: defaultValue ? this.defaultDate.date : '',
      _year: defaultValue ? this.defaultDate.year : '',
      errors: false,
    };
  }

  // 选中时触发
  handleChange = (e) => {
    const { errors } = this.state;
    this.setState({
      [e.target.name]: e.target.value,
      // eslint-disable-next-line consistent-return
    }, () => {
      this.current[e.target.name] = e.target.value;
      const { _date, _month, _year } = this.state;
      if (_month && _date) {
        console.log(_date);
        if (_month === 2 && _date >= 30) { // 选择 2 月份的
          this.setState({
            errors: ['无效的日期, 在判断2月不可能 有30天 时 报错'],
          });
          return false;
        }
        if ((_month === 4 || _month === 6 || _month === 9 || _month === 11) && _date >= 31) {
          this.setState({
            errors: ['无效的日期, 在判断大小月份时 报错'],
          });
          return false;
        }
      }

      if (_month && _date && _year) {
        this.isSubmit = true;
        const currentTime = new Date().getTime();
        // 当前选择的时间 在天数上选择 加上一天, 确保不会选择当前日期的情况下 报错
        const selectTime = new Date(getDateFormat(_year, _month, _date + 1)).getTime();
        if (selectTime > currentTime) {
          this.setState({
            errors: ['无效的日期 , 出生日期 不可能在今天 或者 以后'],
          });
          return false;
        }
        // 判断是否为闰年:(1)年份能被4整除，但不能被100整除；(2)年份能被400整除。
        // 平年2月28天，闰年2月29天
        if (!((_year % 4 === 0 && _year % 100 !== 0) || (_year % 400 === 0))) {
          if (_month === 2 && _date >= 29) {
            this.setState({
              errors: ['无效的日期 在判断闰年时报错'],
            });
            return false;
          }
        }
      }

      if (errors && this.isSubmit) {
        this.setState({
          errors: false,
        });
      }
    });
    return null;
  };

  // 提交按钮点击时触发
  handleDateSubmit = () => {
    const {
      _month, _date, _year, errors,
    } = this.state;
    this.isSubmit = false;
    // 报错的情况下 禁止提交
    if (errors) return null;
    if (_month && _date && _year) {
      console.log('你的出生日期是 :', getDateFormat(_year, _month, _date));
      return new Date(getDateFormat(_year, _month, _date)).getTime();
    }
    // this.setState({
    //   errors: ['出生日期为必填'],
    // });
    return null;
  };

  render() {
    const { classes } = this.props;
    const {
      _month, _date, _year, errors,
    } = this.state;
    const { month, date, year } = dateArr;
    return (
      <FormControl
        fullWidth
        margin="normal"
        error={errors}
      >
        <MyLabel fontSize="sm" shrink>Date of birth</MyLabel>
        <div className={classes.wrapper}>
          <MySelects
            displayEmpty
            name="_month"
            value={_month}
            onChange={this.handleChange}
            className={classes.selectItem}
          >
            <MenuItem value="" disabled>{MonthText[this.defaultDate.month] || this.defaultDate.month}</MenuItem>
            {
              month.map(val => (
                <MenuItem key={val} value={val + 1}>{ MonthText[val] }</MenuItem>
              ))
            }
          </MySelects>
          <MySelects
            displayEmpty
            name="_date"
            value={_date}
            onChange={this.handleChange}
            className={classes.selectItem}
          >
            <MenuItem value="" disabled>{this.defaultDate.date}</MenuItem>
            {
              date.map(val => (
                <MenuItem key={val} value={val + 1}>{val + 1}</MenuItem>
              ))
            }
          </MySelects>
          <MySelects
            displayEmpty
            name="_year"
            value={_year}
            onChange={this.handleChange}
            className={classes.selectItem}
          >
            <MenuItem value="" disabled>{this.defaultDate.year}</MenuItem>
            {
              year.map(val => (
                <MenuItem key={val} value={val}>{val}</MenuItem>
              ))
            }
          </MySelects>
        </div>
        {
          errors
            ? <FormHelperText>{errors.join(',')}</FormHelperText>
            : null
        }
        <p className={classes.text}>
          We might send you a Birthday Surprise on your birthday month.
        </p>
      </FormControl>
    );
  }
}

DatePicker.propTypes = {
  classes: PropTypes.objectOf(PropTypes.object).isRequired,
  defaultValue: PropTypes.number,
};

DatePicker.defaultProps = {
  defaultValue: null,
};

export default DatePicker;
