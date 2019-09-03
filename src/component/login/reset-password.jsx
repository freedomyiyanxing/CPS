import React from 'react';
import PropTypes from 'prop-types';
import { createForm, formShape } from 'rc-form';
import { withStyles } from '@material-ui/core/styles';

import InputContainer from '../../common/box-container/form-container';
import MergePassword from '../../common/form/password-merge';
import SubmitButton from '../../common/form/submit-button';
import TokenError from '../../common/token-error/index';

import { openNotifications } from '../../common/prompt-box/prompt-box';
import { get, patchRequestBody, SUCCESS } from '../../assets/http';
import { resetPasswordPrompt } from '../../assets/data/prompt-text';

import { resetPasswordStyle } from './style';

@withStyles(resetPasswordStyle)
@createForm()
class ResetPassword extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      email: '',
      isError: false, // 标致 获取用户是否成功
    };
  }

  componentDidMount() {
    const { location } = this.props;
    const { search } = location;
    this._unmount = true;
    if (search) {
      // 获取注册用户的信息 (name && email)
      get(`/api/password/info${search}`)
        .then((response) => {
          const { email } = response;
          if (this._unmount) {
            this.setState({
              email,
            });
          }
        })
        .catch((err) => {
          console.log(err, 'error');
          this.setState({
            isError: true,
          });
        });
    }
  }

  componentWillUnmount() {
    this._unmount = false;
  }

  /**
   * 提交事件
   * @returns {*} 验证正确的情况下返回一个 promise对象
   */
  handleSubmit = () => {
    const { form, history } = this.props;
    const { email } = this.state;
    let ayc = null;
    form.validateFields((error, value) => {
      if (!error) {
        ayc = patchRequestBody('/api/password/reset', {
          email,
          newPassword: value.password,
        }).then((response) => {
          const { message } = response;
          if (message === SUCCESS) {
            openNotifications.open({
              message: resetPasswordPrompt.successText,
              variant: 'success',
              duration: 5,
            });
          }
          // 密码修改完成 回到登录页面
          history.push('/s/signin');
        });
      }
    });
    return ayc;
  };

  render() {
    const { classes, form, history } = this.props;
    const {
      email, isError,
    } = this.state;
    return (
      <InputContainer title={isError ? '' : 'REST PASSWORD'}>
        <TokenError
          error={isError}
          history={history}
        >
          <p className={classes.prompt}>
            Dear
            <b>{email || ''}</b>
            To reset your password, simply enter a new password below
          </p>
          <MergePassword form={form} />
          <SubmitButton
            name="Rest Password"
            handleSubmit={this.handleSubmit}
          />
        </TokenError>
      </InputContainer>
    );
  }
}

ResetPassword.propTypes = {
  history: PropTypes.objectOf(PropTypes.object).isRequired,
  location: PropTypes.objectOf(PropTypes.object).isRequired,
  classes: PropTypes.objectOf(PropTypes.object).isRequired,
  form: formShape.isRequired,
};

export default ResetPassword;
