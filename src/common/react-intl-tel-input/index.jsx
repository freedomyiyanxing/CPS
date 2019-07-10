import React from 'react';
import PropTypes from 'prop-types';
import FormControl from '@material-ui/core/FormControl';
import FormHelperText from '@material-ui/core/FormHelperText';

import MyLabel from '../material-ui-compoents/input-label';
import IntlTelInput from './intlTelInput';

class TelIndex extends React.Component {
  state = {
    isValid: false,
  };

  // 电话验证函数 (onchange)
  onPhoneNumberChange = (isValid, newNumber, countryData, fullNumber) => {
    this.setState({
      isValid,
    });
    console.log(isValid, newNumber, countryData, fullNumber);
    this.onGetPhone(fullNumber);
  };

  // 电话验证函数 (切换国家)
  onSelectFlag = (isValid, newNumber, countryData, fullNumber) => {
    this.setState({
      isValid,
    });
    console.log(isValid, newNumber, countryData, fullNumber);
    this.onGetPhone(fullNumber);
  };

  selectFlag = (rule, value, callback) => {
    const { isValid } = this.state;
    if (isValid) {
      callback();
    } else {
      // eslint-disable-next-line standard/no-callback-literal
      callback('电话号码错误');
    }
    console.log('this.isValid', isValid);
  };

  onGetPhone = (number) => {
    const { onChangePhone } = this.props;
    onChangePhone(number);
  };

  render() {
    const { form } = this.props;

    const { getFieldProps, getFieldError } = form;
    const errors = getFieldError('phone');
    return (
      <FormControl
        fullWidth
        required
        error={errors}
        margin="normal"
        {...getFieldProps('phone', {
          validateFirst: true,
          // initialValue: value, // 设置默认值 (保证在有默认值的情况 验证会通过)
          rules: [
            {
              required: true,
              message: '电话号码必填',
            },
            {
              validator: this.selectFlag,
            },
            // {
            //   validator: this.phoneNumber,
            // },
          ],
        })}
      >
        <MyLabel fontSize="sm" shrink>Phone *</MyLabel>
        <IntlTelInput
          // defaultValue="+1 201-555-1234"
          onPhoneNumberChange={this.onPhoneNumberChange}
          onSelectFlag={this.onSelectFlag}
        />
        {
          errors
            ? <FormHelperText>{errors.join(',')}</FormHelperText>
            : null
        }
      </FormControl>
    );
  }
}

TelIndex.propTypes = {
  form: PropTypes.objectOf(PropTypes.object).isRequired,
  onChangePhone: PropTypes.func.isRequired,
};

export default TelIndex;
