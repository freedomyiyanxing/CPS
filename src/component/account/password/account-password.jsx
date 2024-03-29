import React from 'react';
import PropTypes from 'prop-types';
import { createForm, formShape } from 'rc-form';

import Password from '../../../common/form/password';
import SubmitButton from '../../../common/form/submit-button';
import MainContainer from '../../../common/box-container/main-container';
import Container from '../utils/container';
import MergePassword from '../../../common/form/password-merge';

import { openNotifications } from '../../../common/prompt-box/prompt-box';
import { patchRequestBody, SUCCESS } from '../../../assets/http/index';
import { userSetPassword } from '../../../assets/data/prompt-text';

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
        ayc = patchRequestBody('/api/profile/password', value).then((response) => {
          const { message } = response;
          if (message === SUCCESS) {
            openNotifications.open({
              message: userSetPassword.successText,
              variant: 'success',
              duration: 10,
            });
          }
        });
      }
    });
    return ayc;
  };

  render() {
    const { form, history } = this.props;
    return (
      <MainContainer>
        <Container title="Change Password">
          <Password
            form={form}
            name="Password"
            outputName="oldPassword"
          />
          <MergePassword
            form={form}
            outputName="newPassword"
          />
          <SubmitButton
            bank
            width={180}
            name="Submit"
            history={history}
            handleSubmit={this.handleSubmit}
          />
        </Container>
      </MainContainer>
    );
  }
}

AccountPassword.propTypes = {
  history: PropTypes.objectOf(PropTypes.object).isRequired,
  form: formShape.isRequired,
};

export default AccountPassword;
