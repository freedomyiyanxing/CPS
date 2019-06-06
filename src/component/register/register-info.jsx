import React from 'react';
import PropTypes from 'prop-types';
import { createForm, formShape } from 'rc-form';
import { withStyles } from '@material-ui/core/styles';

import { registerInfoStyle } from './style';

import InputContainer from '../../common/form/container';
import Emails from '../../common/form/email';
import Name from '../../common/form/name';
import MergePassword from '../../common/form/password-merge';
import SubmitButton from '../../common/form/submit-button';

@withStyles(registerInfoStyle)
@createForm()
class RegisterInfo extends React.Component {
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
      <InputContainer title="Submit">
        <h4 className={classes.title}>ACCOUNT INFORMATION</h4>
        <Name name="First Name" value="Alex" form={form} disabled />
        <Name name="Last Name" value="Huang" form={form} disabled />
        <Emails form={form} value="85189962@qq.com" disabled />
        <MergePassword form={form} />
        <SubmitButton
          name="Next"
          handleSubmit={this.handleSubmit}
        />
      </InputContainer>
    );
  }
}

RegisterInfo.propTypes = {
  history: PropTypes.objectOf(PropTypes.object).isRequired,
  classes: PropTypes.objectOf(PropTypes.object).isRequired,
  form: formShape.isRequired,
};

export default RegisterInfo;
