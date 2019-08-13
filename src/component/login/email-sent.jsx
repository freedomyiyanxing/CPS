import React from 'react';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/core/styles';

import InputContainer from '../../common/box-container/form-container';
import SubmitButton from '../../common/form/submit-button';
import { get, SUCCESS } from '../../assets/http/index';
import { openNotifications } from '../../common/prompt-box/prompt-box';
import { emailSentPrompt } from '../../assets/data/prompt-text';
import { emailSentText } from '../../assets/data/default-data';

import { emailSentPageStyle } from './style';

const useStyle = makeStyles(emailSentPageStyle);

const EmailSentPage = (props) => {
  const { location } = props;
  const classes = useStyle();
  const { link, email } = location.state;

  // 如果为真 则表示是注册页面进来的
  const isRegister = link === 'register';

  const url = isRegister
    ? `/api/auth/signup/resend/${email}` // 注册重新发送邮件
    : `/api/password/resend/${email}`; // 忘记密码重新发送邮件

  /**
   * 再次点击发送邮件
   * @returns {Promise<any>} 返回promise对象
   */
  const handleSubmit = () => get(url).then((response) => {
    const { message } = response;
    if (message === SUCCESS) {
      openNotifications.open({
        message: emailSentPrompt.successText,
        variant: 'success',
        duration: 5,
      });
    }
  });

  return (
    <InputContainer title="EMAIL SENT">
      <p className={classes.prompt}>
        An email has been sent to
        <b>{email}</b>
        {emailSentText(isRegister)}
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
