import React from 'react';
import PropTypes from 'prop-types';
import { createForm, formShape } from 'rc-form';
import { withStyles } from '@material-ui/core/styles';
import FormControl from '@material-ui/core/FormControl';

import { basicSettingStyle } from '../style';

import Emails from '../../../common/form/email';
import Name from '../../../common/form/name';
import SubmitButton from '../../../common/form/submit-button';
import IntlTelInput from '../../../common/react-intl-tel-input/intlTelInput';

@withStyles(basicSettingStyle)
@createForm()
class BasicSetting extends React.Component {
  constructor(props) {
    super(props);
    this.phoneNumber = '';
    this.state = {
      isValid: true,
    };
  }

  /**
   * 提交事件
   * @returns {*} 验证正确的情况下返回一个 promise对象
   */
  handleSubmit = () => {
    // eslint-disable-next-line no-unused-vars
    const { form } = this.props;
    const { isValid } = this.state;
    let ayc = null;
    form.validateFields((error, value) => {
      // 判断必须 填写了 电话号码 且 isValid 必须为真,
      // (只有电话为空时 跟 电话号码正确时为真 isValid 就为真)
      if (this.phoneNumber && isValid) {
        if (!error) {
          ayc = new Promise((resolve) => {
            setTimeout(() => {
              console.log({ ...value, phone: this.phoneNumber });
              // history.push('/yes/index');
              resolve(true);
            }, 1000);
          });
        } else {
          ayc = null;
        }
      } else {
        this.setState({
          isValid: false,
        });
      }
    });
    return ayc;
  };

  // 电话验证函数
  onPhoneNumberChange = (isValid, newNumber, currentObj, fullNumber) => {
    console.log(isValid, newNumber, currentObj, fullNumber);
    this.phoneNumber = newNumber;
    this.setState({
      isValid,
    });
  };

  render() {
    const { classes, form } = this.props;
    const { isValid } = this.state;
    return (
      <>
        <Name name="First Name" form={form} />
        <Name name="Last Name" form={form} />
        <Emails form={form} />
        <FormControl
          className={classes.root}
          fullWidth
          required
          error={!isValid}
          margin="normal"
        >
          <span className={isValid ? classes.labelSuccess : classes.labelError}>
            Phone *
          </span>
          <IntlTelInput
            onPhoneNumberChange={this.onPhoneNumberChange}
          />
        </FormControl>
        <p className={classes.prompt}>
          By registering, you agree with our Terms & Condition and Privacy Policy
        </p>
        <SubmitButton
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
