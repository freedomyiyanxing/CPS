import React from 'react';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/core/styles';

import { emailSentPageStyle } from './style';

import InputContainer from '../../common/form/container';
import SubmitButton from '../../common/form/submit-button';

const useStyle = makeStyles(emailSentPageStyle);

const EmailSentPage = (props) => {
  const { location, history } = props;
  const classes = useStyle();

  /**
   * 再次点击发送邮件
   * @returns {Promise<any>} 返回promise对象
   */
  const handleSubmit = () => new Promise((resolve) => {
    setTimeout(() => {
      history.push('/not/reset-password');
      resolve(true);
    }, 3000);
  });

  return (
    <InputContainer title="EMAIL SENT">
      <p className={classes.prompt}>
        An email has been sent to
        <b>
          {location.state.email}
        </b>
        with a link to reset your
        password,Please click here
        tologin to your mail box,
        The email might take a couple
        of minutes to reach your account,
        Please check your lunk mail to
        ensure you receive it.
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
