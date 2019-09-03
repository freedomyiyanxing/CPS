import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import FormControl from '@material-ui/core/FormControl';
import FormHelperText from '@material-ui/core/FormHelperText';

import IntlTelInput from './intlTelInput';
import { formPrompt } from '../../assets/data/prompt-text';

@withStyles(theme => ({
  root: {
    top: 0,
    left: 0,
    position: 'absolute',
    transform: 'translate(0, 1.5px) scale(0.75)',
    color: theme.palette.text.secondary,
    fontSize: theme.typography.fontSize,
  },
}))
class TelIndex extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      errorPhone: null,
    };
    this.phone = null;
  }

  // 电话验证函数 (onchange)
  onPhoneNumberChange = (isValid, newNumber, countryData, fullNumber) => {
    let errors = null;
    this.handlePhones(isValid, fullNumber);

    if (!fullNumber) {
      errors = [formPrompt.phoneRequired];
    }
    if (!isValid && !errors) {
      errors = [formPrompt.phoneFormat];
    }
    this.setState({
      errorPhone: errors,
    });
    this.phone = fullNumber;
  };

  // 电话验证函数 (切换国家)
  onSelectFlag = (isValid, newNumber, countryData, fullNumber) => {
    this.handlePhones(isValid, fullNumber);

    if (!fullNumber) {
      return false;
    }
    this.setState({
      errorPhone: isValid ? null : [formPrompt.phoneFormat],
    });
    this.phone = fullNumber;
  };

  handleChange = () => {
    // 电话号码为空
    const { errorPhone } = this.state;
    if (!this.phone) {
      this.setState({
        errorPhone: [formPrompt.phoneRequired],
      });
      return false;
    }
    // 如果有错误的情况
    if (errorPhone) {
      return false;
    }
    return this.phone;
  };

  // 检测是否修改了 电话号码
  handlePhones = (isValid, fullNumber) => {
    const { handlePhone, value } = this.props;
    if (typeof handlePhone === 'function') {
      handlePhone(!isValid || fullNumber === value);
    }
  };

  render() {
    const { value, classes } = this.props;
    const { errorPhone } = this.state;
    return (
      <FormControl
        fullWidth
        required
        margin="normal"
        error={errorPhone}
      >
        <span className={classes.root}>Phone *</span>
        <IntlTelInput
          defaultValue={value}
          onPhoneNumberChange={this.onPhoneNumberChange}
          onSelectFlag={this.onSelectFlag}
        />
        {
          errorPhone
            ? <FormHelperText>{errorPhone.join(',')}</FormHelperText>
            : null
        }
      </FormControl>
    );
  }
}

TelIndex.propTypes = {
  classes: PropTypes.objectOf(PropTypes.object).isRequired,
  value: PropTypes.string,
  handlePhone: PropTypes.func,
};

TelIndex.defaultProps = {
  value: '',
  handlePhone: null,
};

export default TelIndex;
