import React from 'react';
import PropTypes from 'prop-types';
import { createForm, formShape } from 'rc-form';
import { withStyles } from '@material-ui/core/styles';

import { forgetPasswordStyle } from './style';

import InputContainer from '../../common/box-container/form-container';
import Emails from '../../common/form/email';
import SubmitButton from '../../common/form/submit-button';
import { get, SUCCESS } from '../../assets/http/index';
import { openNotifications } from '../../common/prompt-box/prompt-box';
import { forgetPasswordText } from '../../assets/data/default-data';
import { forgetPasswordPrompt } from '../../assets/data/prompt-text';

@withStyles(forgetPasswordStyle)
@createForm()
class ForgetPassword extends React.Component {
  handleSubmit = () => {
    const { form, history } = this.props;
    let ayc = null;
    form.validateFields((error, value) => {
      if (!error) {
        ayc = get(`/api/password/send?email=${value.email}`).then((response) => {
          const { message } = response;
          if (message === SUCCESS) {
            openNotifications.open({
              message: forgetPasswordPrompt.successText,
              variant: 'success',
              duration: 5,
            });
            history.push('/s/email-sent', { email: value.email, link: 'login' });
          }
        });
      }
    });
    return ayc;
  };

  render() {
    const { classes, form } = this.props;
    return (
      <InputContainer title="FORGOT PASSWORD?">
        <p className={classes.prompt}>{forgetPasswordText}</p>
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
