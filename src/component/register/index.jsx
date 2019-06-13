import React from 'react';
import PropTypes from 'prop-types';
import { createForm, formShape } from 'rc-form';
import { withStyles } from '@material-ui/core/styles';

import { indexStyle } from './style';

import InputContainer from '../../common/box-container/form-container';
import Emails from '../../common/form/email';
import Name from '../../common/form/name';
import SubmitButton from '../../common/form/submit-button';

@withStyles(indexStyle)
@createForm()
class Register extends React.Component {
  /**
   * 提交事件
   * @returns {*} 验证正确的情况下返回一个 promise对象
   */
  handleSubmit = () => {
    const { form, history } = this.props;
    let ayc = null;
    form.validateFields((error, value) => {
      if (!error) {
        ayc = new Promise((resolve) => {
          setTimeout(() => {
            console.log({ ...value });
            history.push('/not/email-sent', { email: value.email, link: 'register' });
            resolve(true);
          }, 3000);
        });
      } else {
        ayc = null;
      }
    });
    return ayc;
  };

  /**
   * 点击跳转到忘记密码页面
   */
  handleLink = () => {
    const { history } = this.props;
    history.push('/not/forget-password');
  };

  render() {
    const { classes, form } = this.props;
    return (
      <InputContainer title="SIGN UP">
        <Name name="First Name" form={form} />
        <Name name="Last Name" form={form} />
        <Emails form={form} />
        <p className={classes.prompt}>
          By registering,
          you agree with our
          <span> Terms & Condition </span>
          and
          <span> Privacy Policy </span>
        </p>
        <SubmitButton
          name="Next"
          handleSubmit={this.handleSubmit}
        />
      </InputContainer>
    );
  }
}

Register.propTypes = {
  history: PropTypes.objectOf(PropTypes.object).isRequired,
  classes: PropTypes.objectOf(PropTypes.object).isRequired,
  form: formShape.isRequired,
};

export default Register;
