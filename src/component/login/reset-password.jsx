import React from 'react';
import PropTypes from 'prop-types';
import { createForm, formShape } from 'rc-form';
import { withStyles } from '@material-ui/core/styles';

import { resetPasswordStyle } from './style';

import InputContainer from '../../common/form/container';
import Password from '../../common/form/password';
import ConfirmPassword from '../../common/form/password-confirm';
import SubmitButton from '../../common/form/submit-button';

@withStyles(resetPasswordStyle)
@createForm()
class ResetPassword extends React.Component {
  // 第一次输入密码的
  validateToNextPassword = (rule, value, callback) => {
    const { form } = this.props;
    if (value) {
      form.validateFields(['confirmPassword']);
    }
    callback();
  };

  // 确认密码的
  compareToFirstPassword = (rule, value, callback) => {
    const { form } = this.props;
    if (value && value !== form.getFieldValue('newPassword')) {
      // eslint-disable-next-line standard/no-callback-literal
      callback('Two passwords that you enter is inconsistent!');
    } else {
      callback();
    }
  };

  /**
   * 提交事件
   * @returns {*} 验证正确的情况下返回一个 promise对象
   */
  handleSubmit = () => {
    // eslint-disable-next-line no-unused-vars
    const { form, history } = this.props;
    let ayc = null;
    form.validateFields((error, value) => {
      if (!error) {
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

  render() {
    const { classes, form } = this.props;
    console.log(classes);
    return (
      <InputContainer title="REST PASSWORD">
        <p className={classes.prompt}>
          Dear
          <b>Alex Huang</b>
        </p>
        <p className={classes.prompt}>
          To reset your password, simply enter a new password below
        </p>
        <Password
          form={form}
          name="New Password"
          validateToNextPassword={this.validateToNextPassword}
        />
        <ConfirmPassword
          form={form}
          compareToFirstPassword={this.compareToFirstPassword}
        />
        <SubmitButton
          name="Log in"
          handleSubmit={this.handleSubmit}
        />
      </InputContainer>
    );
  }
}

ResetPassword.propTypes = {
  history: PropTypes.objectOf(PropTypes.object).isRequired,
  classes: PropTypes.objectOf(PropTypes.object).isRequired,
  form: formShape.isRequired,
};

export default ResetPassword;
