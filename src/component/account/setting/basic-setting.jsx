import React, { createRef } from 'react';
import { createForm, formShape } from 'rc-form';

import Emails from '../../../common/form/email';
import Name from '../../../common/form/name';
import SubmitButton from '../../../common/form/submit-button';
import IntlTelInput from '../../../common/react-intl-tel-input/intlTelInput';
import MyRadio from '../../../common/form/my-radio';
import DatePicker from '../../../common/date-picker/date-picker';

@createForm()
class BasicSetting extends React.Component {
  constructor(props) {
    super(props);
    this.pickerRef = createRef();
  }

  /**
   * 提交事件
   * @returns {*} 验证正确的情况下返回一个 promise对象
   */
  handleSubmit = () => {
    const { form } = this.props;
    let ayc = null;
    const date = this.pickerRef.current.handleDateSubmit();
    form.validateFields((error, value) => {
      // 判断必须 填写了 电话号码 且 isValid 必须为真,
      // (只有电话为空时 跟 电话号码正确时为真 isValid 就为真)
      if (!error && !this.isValid) {
        ayc = new Promise((resolve) => {
          setTimeout(() => {
            console.log({ ...value, date });
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

  render() {
    const { form } = this.props;
    // eslint-disable-next-line no-unused-vars
    const dirb = new Date('1993/02/23').getTime();
    return (
      <>
        <Name
          form={form}
          name="First Name"
          value="freedom"
        />
        <Name
          form={form}
          name="Last Name"
          value="yi"
        />
        <Emails
          form={form}
          value="851989962@qq.com"
        />
        <IntlTelInput
          defaultValue="+244 923 123 456"
          form={form}
          onPhoneNumberChange={this.onPhoneNumberChange}
        />
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
