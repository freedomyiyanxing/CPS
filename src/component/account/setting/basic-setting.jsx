import React, { createRef } from 'react';
import { createForm, formShape } from 'rc-form';
import FormControl from '@material-ui/core/FormControl';
import FormHelperText from '@material-ui/core/FormHelperText';

import Emails from '../../../common/form/email';
import Name from '../../../common/form/name';
import SubmitButton from '../../../common/form/submit-button';
import IntlTelInput from '../../../common/react-intl-tel-input/intlTelInput';
import MyRadio from '../../../common/form/my-radio';
import DatePicker from '../../../common/date-picker/date-picker';
import MyLabel from '../../../common/material-ui-compoents/input-label';
import { formPrompt } from '../../../asstes/data/prompt-text';


@createForm()
class BasicSetting extends React.Component {
  constructor(props) {
    super(props);
    this.pickerRef = createRef();
    this.state = {
      errorPhone: null,
    };
    this.phone = null;
  }

  /**
   * 提交事件
   * @returns {*} 验证正确的情况下返回一个 promise对象
   */
  handleSubmit = () => {
    const { form } = this.props;
    const { errorPhone } = this.state;
    let ayc = null;
    const date = this.pickerRef.current.handleDateSubmit();
    form.validateFields((error, value) => {
      // 判断必须填写了电话号码
      if (!this.phone) {
        this.setState({
          errorPhone: [formPrompt.phoneRequired],
        });
        return false;
      }

      // (errorPhone如果为真 则表示有电话号码错误)
      if (!error && !errorPhone) {
        ayc = new Promise((resolve) => {
          setTimeout(() => {
            console.log({ ...value, date, phone: this.phone });
            // history.push('/my/index');
            resolve(true);
          }, 1000);
        });
      }
    });
    return ayc;
  };

  // 电话验证函数 (onchange)
  onPhoneNumberChange = (isValid, newNumber, countryData, fullNumber) => {
    console.log('电话验证函数onchange: ->', isValid, fullNumber);
    let errors = null;
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
    console.log('切换国家0: ->', isValid, fullNumber);
    if (!fullNumber) {
      return false;
    }
    this.setState({
      errorPhone: isValid ? null : [formPrompt.phoneFormat],
    });
    this.phone = fullNumber;
  };

  render() {
    const { form } = this.props;
    const { errorPhone } = this.state;
    return (
      <>
        <Name
          form={form}
          name="First Name"
          value="freedom"
          outputName="firstName"
        />
        <Name
          form={form}
          name="Last Name"
          value="yi"
          outputName="lastName"
        />
        <Emails
          form={form}
          value="851989962@qq.com"
        />
        <FormControl
          fullWidth
          required
          margin="normal"
          error={errorPhone}
        >
          <MyLabel fontSize="sm" shrink>Phone *</MyLabel>
          <IntlTelInput
            // defaultValue="+244 923 123 456"
            onPhoneNumberChange={this.onPhoneNumberChange}
            onSelectFlag={this.onSelectFlag}
          />
          {
            errorPhone
              ? <FormHelperText>{errorPhone.join(',')}</FormHelperText>
              : null
          }
        </FormControl>
        { /* MyRadio 的默认只有 只有 Male || Female 其他无效 */ }
        <MyRadio
          form={form}
          // value="Male"
        />
        <DatePicker
          // defaultValue={dirb} // 默认的时间戳
          ref={this.pickerRef}
        />
        <SubmitButton
          width="200px"
          name="Submit"
          handleSubmit={this.handleSubmit}
        />
      </>
    );
  }
}

BasicSetting.propTypes = {
  form: formShape.isRequired,
};

export default BasicSetting;
