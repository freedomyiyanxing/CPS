import React from 'react';
import PropTypes from 'prop-types';
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
    const { form, outputName } = this.props;
    const oldPsd = form.getFieldValue('oldPassword');
    const newPsd = form.getFieldValue(outputName);
    // 说明有原生密码 则需要判断
    if (oldPsd) {
      if (value && (value !== newPsd || value === oldPsd)) {
        callback(
          value === oldPsd
            ? formPrompt.passwordOld
            : formPrompt.passwordValidator,
        );
      } else {
        callback();
      }
    } else if (value && value !== newPsd) {
      callback(formPrompt.passwordValidator);
    } else {
      callback();
    }
  };

  render() {
    const { form, outputName } = this.props;
    return (
      <>
        <Password
          form={form}
          name="New Password"
          onBlur={this.handleBlur}
          outputName={outputName}
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
  outputName: PropTypes.string, // 输出key值
};

MergePassword.defaultProps = {
  outputName: 'password',
};

export default MergePassword;
