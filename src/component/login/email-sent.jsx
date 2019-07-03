import React from 'react';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/core/styles';

import InputContainer from '../../common/box-container/form-container';
import SubmitButton from '../../common/form/submit-button';

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
  const { location, history } = props;
  const classes = useStyle();
  // 如果为真 则表示是注册页面进来的
  const isRegister = location.state.link === 'register';

  /**
   * 再次点击发送邮件
   * @returns {Promise<any>} 返回promise对象
   */
  const handleSubmit = () => new Promise((resolve) => {
    const links = isRegister ? '/s/signup/confirm' : '/s/password/reset';
    setTimeout(() => {
      history.push(links);
      resolve(true);
    }, 1000);
  });

  return (
    <InputContainer title="EMAIL SENT">
      <p className={classes.prompt}>
        An email has been sent to
        <b>{location.state.email}</b>
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
  history: PropTypes.objectOf(PropTypes.object).isRequired,
  location: PropTypes.objectOf(PropTypes.object).isRequired,
};

export default EmailSentPage;
