import React from 'react';
import PropTypes from 'prop-types';
import { createForm, formShape } from 'rc-form';
import { withStyles } from '@material-ui/core/styles';

import { forgetPasswordStyle } from './style';

import InputContainer from '../../common/form/container';
import Emails from '../../common/form/email';
import SubmitButton from '../../common/form/submit-button';

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
            console.log({ ...value });
            history.push('/not/email-sent', { email: value.email });
            resolve(true);
          }, 3000);
        });
      } else {
        ayc = null;
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
  classes: PropTypes.objectOf(PropTypes.object).isRequired,
  history: PropTypes.objectOf(PropTypes.object).isRequired,
  form: formShape.isRequired,
};

export default ForgetPassword;
