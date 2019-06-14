import React from 'react';
import PropTypes from 'prop-types';
import { createForm, formShape } from 'rc-form';
import { withStyles } from '@material-ui/core/styles';

import { basicSettingStyle } from '../style';

import Emails from '../../../common/form/email';
import Name from '../../../common/form/name';
import SubmitButton from '../../../common/form/submit-button';
import IntlTelInput from '../../../common/react-intl-tel-input/intlTelInput';
import MyRadio from '../../../common/form/my-radio';

@withStyles(basicSettingStyle)
@createForm()
class BasicSetting extends React.Component {
  constructor(props) {
    super(props);
    this.genderValue = null;
  }

  /**
   * 提交事件
   * @returns {*} 验证正确的情况下返回一个 promise对象
   */
  handleSubmit = () => {
    const { form } = this.props;
    let ayc = null;
    form.validateFields((error, value) => {
      // 判断必须 填写了 电话号码 且 isValid 必须为真,
      // (只有电话为空时 跟 电话号码正确时为真 isValid 就为真)
      if (!error && !this.isValid) {
        ayc = new Promise((resolve) => {
          setTimeout(() => {
            console.log({ ...value, gender: this.genderValue });
            // history.push('/yes/index');
            resolve(true);
          }, 1000);
        });
      } else {
        ayc = null;
      }
    });
    return ayc;
  };

  // 电话验证函数
  onPhoneNumberChange = (isValid) => {
    this.isValid = isValid;
  };

  // 获取 Gender 值
  getGender = (value) => {
    this.genderValue = value;
  };

  render() {
    const { classes, form } = this.props;
    return (
      <>
        <Name value="freedom" name="First Name" form={form} />
        <Name value="yi" name="Last Name" form={form} />
        <Emails value="851989962@qq.com" form={form} />
        <IntlTelInput
          defaultValue="+244 923 123 456"
          form={form}
          onPhoneNumberChange={this.onPhoneNumberChange}
        />
        { /* MyRadio 的默认只有 只有 Male || Female 其他无效 */ }
        <MyRadio value="Male" getGender={this.getGender} />
        <p className={classes.prompt}>
          By registering, you agree with our Terms & Condition and Privacy Policy
        </p>
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
  classes: PropTypes.objectOf(PropTypes.object).isRequired,
  form: formShape.isRequired,
};

export default BasicSetting;
