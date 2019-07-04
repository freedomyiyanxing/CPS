/* eslint-disable */
import React from 'react';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/core/styles';

import InputContainer from '../../common/box-container/form-container';
import SubmitButton from '../../common/form/submit-button';
import { get, SUCCESS } from '../../asstes/http/index';
import { openNotifications } from '../../common/prompt-box/prompt-box';

import { emailSentPageStyle } from './style';

const useStyle = makeStyles(emailSentPageStyle);

const textFun = (is) => {
  let s = null;
  if (is) {
    s = 'Please click the link in the email to confirm your email address';
  } else {
    s = 'with a link to reset your password,Please click here tologin to your mail box, The email might take a couple of minutes to reach your account, Please check your lunk mail to ensure you receive it.';
  }
  return s;
};

const EmailSentPage = (props) => {
  const { location } = props;
  const classes = useStyle();
  const { link, email } = location.state;
  console.log(location.state.link);
  // 如果为真 则表示是注册页面进来的
  const isRegister = link === 'register';

  const url = isRegister
    ? `/api/auth/signup/resend/${email}` // 注册重新发送邮件
    : `/api/password/resend/${email}`; // 忘记密码重新发送邮件

  /**
   * 再次点击发送邮件
   * @returns {Promise<any>} 返回promise对象
   */
  const handleSubmit = () => new Promise((resolve) => {
    get(url)
      .then((response) => {
        if (response.message === SUCCESS) {
          openNotifications.open({
            message: '邮件发送成功, 请打开邮箱点击进入重置密码页面',
            variant: 'success',
            duration: 5,
          });
          resolve(true);
          console.log(response);
        }
      })
      .catch((err) => {
        console.log(err);
      });
  });

  return (
    <InputContainer title="EMAIL SENT">
      <p className={classes.prompt}>
        An email has been sent to
        <b>{email}</b>
        {textFun(isRegister)}
      </p>
      <SubmitButton
        name="Didn't recive email? Resend"
        handleSubmit={handleSubmit}
      />
    </InputContainer>
  );
};

EmailSentPage.propTypes = {
  location: PropTypes.objectOf(PropTypes.object).isRequired,
};

export default EmailSentPage;
