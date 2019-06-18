import React from 'react';
import PropTypes from 'prop-types';
import { createForm, formShape } from 'rc-form';
import { withStyles } from '@material-ui/core/styles/index';

import InputContainer from '../../../common/box-container/form-container';
import Password from '../../../common/form/password';
import SubmitButton from '../../../common/form/submit-button';
import MergePassword from '../../../common/form/password-merge';

import passwordStyle from './style';

@withStyles(passwordStyle)
@createForm()
class AccountPassword extends React.Component {
  /**
   * 提交事件
   * @returns {*} 验证正确的情况下返回一个 promise对象
   */
  handleSubmit = () => {
    const { form } = this.props;
    let ayc = null;
    form.validateFields((error, value) => {
      if (!error) {
        ayc = new Promise((resolve) => {
          setTimeout(() => {
            console.log({ ...value });
            resolve(true);
          }, 1000);
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
      <InputContainer title="Set Password">
        <div className={classes.root}>
          <Password form={form} name="Password" />
          <MergePassword form={form} />
          <SubmitButton
            name="Submit"
            handleSubmit={this.handleSubmit}
          />
        </div>
      </InputContainer>
    );
  }
}

AccountPassword.propTypes = {
  classes: PropTypes.objectOf(PropTypes.object).isRequired,
  form: formShape.isRequired,
};

export default AccountPassword;
