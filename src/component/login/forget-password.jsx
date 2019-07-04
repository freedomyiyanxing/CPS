import React from 'react';
import PropTypes from 'prop-types';
import { createForm, formShape } from 'rc-form';
import { withStyles } from '@material-ui/core/styles';

import { forgetPasswordStyle } from './style';

import InputContainer from '../../common/box-container/form-container';
import Emails from '../../common/form/email';
import SubmitButton from '../../common/form/submit-button';
import { get, SUCCESS } from '../../asstes/http/index';
import { openNotifications } from '../../common/prompt-box/prompt-box';

const promptText = 'Type in your email address below and well send you an email with Instructions on how to reset your password. Due to Security reasons,theink will be valid for 2 hours, after 2 hours you will need to submit anotherrequestgaln.';

@withStyles(forgetPasswordStyle)
@createForm()
class ForgetPassword extends React.Component {
  handleSubmit = () => {
    const { form, history } = this.props;
    let ayc = null;
    form.validateFields((error, value) => {
      if (!error) {
        ayc = new Promise((resolve) => {
          setTimeout(() => {
            get(`/api/password/send?email=${value.email}`)
              .then((response) => {
                if (response.message === SUCCESS) {
                  openNotifications.open({
                    message: '邮件发送成功, 请打开邮箱点击进入重置密码页面',
                    variant: 'success',
                    duration: 5,
                  });
                  history.push('/s/email-sent', { email: value.email, link: 'login' });
                }
                resolve(true);
              })
              .catch((err) => {
                openNotifications.open({
                  message: err.data.message || '服务器错误',
                  variant: 'error',
                  duration: 5, // null 表示永远不移除
                });
                resolve(true);
              });
          }, 1000);
        });
      }
    });
    return ayc;
  };

  render() {
    const { classes, form } = this.props;
    return (
      <InputContainer title="FORGOT PASSWORD?">
        <p className={classes.prompt}>{promptText}</p>
        <div className={classes.wrapper}>
          <Emails form={form} />
        </div>
        <SubmitButton
          name="Submit"
          handleSubmit={this.handleSubmit}
        />
      </InputContainer>
    );
  }
}

ForgetPassword.propTypes = {
  history: PropTypes.objectOf(PropTypes.object).isRequired,
  classes: PropTypes.objectOf(PropTypes.object).isRequired,
  form: formShape.isRequired,
};

export default ForgetPassword;
