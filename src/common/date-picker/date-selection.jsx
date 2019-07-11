import React, { useState } from 'react';
import PropTypes from 'prop-types';
import Picker from 'rc-calendar/lib/Picker';
import enUS from 'rc-calendar/lib/locale/en_US';
import moment from 'moment';
import Calendar from 'rc-calendar';
import FormControl from '@material-ui/core/FormControl';
import FormHelperText from '@material-ui/core/FormHelperText';
import 'moment/locale/en-gb';

import MyInput from '../material-ui-compoents/input';
import MyLabel from '../material-ui-compoents/input-label';
import DateClose from './date-close';
import { getTime } from '../../asstes/js/utils-methods';
import '../../asstes/style/rc-calendar.css';

// 转换 日期的 语言
moment.locale('en-gb');

// 时间限制区
function disabledDate(current) {
  return current > moment().subtract(1, 'days');
}

const DateSelection = (props) => {
  const { defaultValue, form } = props;
  const [date, setDate] = useState(defaultValue ? moment(defaultValue) : null);

  const handleChange = (value) => {
    setDate(value);
  };

  const { getFieldProps } = form;

  const calendar = (
    <Calendar
      locale={enUS}
      disabledDate={disabledDate}
      showToday={false}
      clearIcon={<DateClose />}
    />
  );

  return (
    <Picker
      onChange={handleChange}
      animation="slide-up"
      calendar={calendar}
      value={date}
    >
      {
        ({ value }) => (
          <FormControl
            fullWidth
            margin="normal"
            {...getFieldProps('dateOfBirth', {
              initialValue: getTime(date),
            })}
          >
            <MyLabel fontSize="sm" htmlFor="my-rc-calendar">Date of birth</MyLabel>
            <MyInput
              id="my-rc-calendar"
              readOnly
              inputProps={{
                // 禁用input框的事件 (防止日期弹框跟@material-ui的label起冲突)
                style: { pointerEvents: 'none' },
              }}
              value={value ? value.format('YYYY-MM-DD') : ''}
            />
            <FormHelperText>
              We might send you a Birthday Surprise on your birthday month.
            </FormHelperText>
          </FormControl>
        )
      }
    </Picker>
  );
};

DateSelection.propTypes = {
  form: PropTypes.objectOf(PropTypes.object).isRequired,
  defaultValue: PropTypes.number,
};

DateSelection.defaultProps = {
  defaultValue: null,
};

export default DateSelection;
