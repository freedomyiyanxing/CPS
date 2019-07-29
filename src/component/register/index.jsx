import React from 'react';
import PropTypes from 'prop-types';
import { createForm, formShape } from 'rc-form';
import { withStyles } from '@material-ui/core/styles';

import InputContainer from '../../common/box-container/form-container';
import Emails from '../../common/form/email';
import Name from '../../common/form/name';
import SubmitButton from '../../common/form/submit-button';

import { openNotifications } from '../../common/prompt-box/prompt-box';
import { debounce } from '../../assets/js/utils-methods';
import { postRequestBody, get, SUCCESS } from '../../assets/http/index';
import { registerIndexPrompt, formPrompt } from '../../assets/data/prompt-text';

import { indexStyle } from './style';

@withStyles(indexStyle)
@createForm()
class Register extends React.Component {
  /**
   * 邮箱验证
   * @type {Function}
   */
  handleChange = debounce((emails, callback) => {
    if (emails) {
      get(`/api/auth/emailExist/${emails}`)
        .then((data) => {
          if (data.existed) {
            callback(formPrompt.emailValidator);
          } else {
            callback();
          }
        }).catch((err) => {
          console.log(err);
        });
    }
  });

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
          postRequestBody('/api/auth/signup', { ...value })
            .then((data) => {
              if (data.message === SUCCESS) {
                openNotifications.open({
                  message: registerIndexPrompt.successText,
                  variant: 'success',
                  duration: 5,
                });
                resolve(true);
                // to 到发送邮件页面
                history.push('/s/email-sent', { email: value.email, link: 'register' });
              }
            })
            .catch((err) => {
              console.log(err);
              openNotifications.open({
                message: err.data.message || registerIndexPrompt.errorText,
                variant: 'error',
                duration: 5,
              });
              resolve(true);
            });
        });
      }
    });
    return ayc;
  };

  render() {
    const { classes, form } = this.props;
    return (
      <InputContainer title="SIGN UP">
        <Name name="First Name" outputName="firstName" form={form} />
        <Name name="Last Name" outputName="lastName" form={form} />
        <Emails form={form} onChange={this.handleChange} />
        <p className={classes.prompt}>
          By registering,
          you agree with our
          <span> Terms & Condition </span>
          and
          <span> Privacy Policy </span>
        </p>
        <SubmitButton name="Next" handleSubmit={this.handleSubmit} />
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
