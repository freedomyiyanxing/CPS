import React from 'react';
import { createForm, formShape } from 'rc-form';

import Password from './password';
import ConfirmPassword from './password-confirm';
import { formPrompt } from '../../asstes/data/prompt-text';

@createForm()
class MergePassword extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      confirmDirty: false,
    };
  }

  handleBlur = () => {
    this.setState({
      confirmDirty: true,
    });
  };

  // 第一次输入密码的
  validateToNextPassword = (rule, value, callback) => {
    const { form } = this.props;
    const { confirmDirty } = this.state;
    if (value && confirmDirty) {
      form.validateFields(['confirmPassword'], { force: true });
    }
    callback();
  };

  // 确认密码的
  compareToFirstPassword = (rule, value, callback) => {
    const { form } = this.props;
    if (value && value !== form.getFieldValue('password')) {
      callback(formPrompt.passwordValidator);
    } else {
      callback();
    }
  };

  render() {
    const { form } = this.props;
    return (
      <>
        <Password
          form={form}
          name="New Password"
          onBlur={this.handleBlur}
          validateToNextPassword={this.validateToNextPassword}
        />
        <ConfirmPassword
          form={form}
          compareToFirstPassword={this.compareToFirstPassword}
        />
      </>
    );
  }
}

MergePassword.propTypes = {
  form: formShape.isRequired,
};

export default MergePassword;
