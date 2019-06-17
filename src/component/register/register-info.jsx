import React from 'react';
import PropTypes from 'prop-types';
import { createForm, formShape } from 'rc-form';
import { withStyles } from '@material-ui/core/styles';

import InputContainer from '../../common/box-container/form-container';
import Emails from '../../common/form/email';
import Name from '../../common/form/name';
import MergePassword from '../../common/form/password-merge';
import SubmitButton from '../../common/form/submit-button';
import MyTextarea from '../../common/form/my-textarea';
import MyUrl from '../../common/form/my-url';
import MySelect from '../../common/form/my-select';

import IntlTelInput from '../../common/react-intl-tel-input/intlTelInput';

import { registerInfoStyle } from './style';

import { webSiteCagegory, monthlyVisitors } from '../../asstes/data/default-data';


@withStyles(registerInfoStyle)
@createForm()
class RegisterInfo extends React.Component {
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
            console.log({ ...value });
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
    const { classes, form } = this.props;
    return (
      <InputContainer title="Submit">
        <div className={classes.firstTitle}>
          <h4 className={classes.title}>ACCOUNT INFORMATION</h4>
        </div>
        <Name name="First Name" value="Alex" form={form} disabled />
        <Name name="Last Name" value="Huang" form={form} disabled />
        <Emails form={form} value="85189962@qq.com" disabled />
        <IntlTelInput
          // defaultValue="+244 923 123 456"
          form={form}
          onPhoneNumberChange={this.onPhoneNumberChange}
        />
        <MergePassword form={form} />
        <div className={classes.lastTitle}>
          <h4 className={classes.title}>WEBSITE INFORMATION</h4>
        </div>
        <Name name="Website Name" form={form} />
        <MyUrl form={form} />
        <MySelect
          form={form}
          name="Category"
          outputName="category"
          selectArr={webSiteCagegory}
        />
        <MySelect
          form={form}
          name="Current Monthly Unique Visitores"
          outputName="monthlyVisitors"
          selectArr={monthlyVisitors}
        />
        <MyTextarea form={form} />
        <SubmitButton
          name="Next"
          handleSubmit={this.handleSubmit}
        />
      </InputContainer>
    );
  }
}

RegisterInfo.propTypes = {
  classes: PropTypes.objectOf(PropTypes.object).isRequired,
  form: formShape.isRequired,
};

export default RegisterInfo;
