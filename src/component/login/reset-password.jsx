import React from 'react';
import PropTypes from 'prop-types';
import { createForm, formShape } from 'rc-form';
import { withStyles } from '@material-ui/core/styles';

import InputContainer from '../../common/box-container/form-container';
import MergePassword from '../../common/form/password-merge';
import SubmitButton from '../../common/form/submit-button';
import MyButton from '../../common/material-ui-component/button';

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
      loading: true,
    };
  }

  componentDidMount() {
    const { location } = this.props;
    const { search } = location;
    this._unmount = true;
    if (search) {
      // 获取注册用户的信息 (name && email)
      setTimeout(() => {
        get(`/api/password/info${search}`)
          .then((response) => {
            if (this._unmount) {
              this.setState({
                email: response.email,
                loading: false,
              });
            }
          })
          .catch((err) => {
            console.log(err, 'error');
            this.setState({
              isError: true,
              loading: false,
            });
          });
      }, 1000);
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
        ayc = new Promise((resolve) => {
          setTimeout(() => {
            console.log({ ...value });
            patchRequestBody('/api/password/reset', {
              email,
              newPassword: value.password,
            })
              .then((response) => {
                if (response.message === SUCCESS) {
                  openNotifications.open({
                    message: resetPasswordPrompt.successText,
                    variant: 'success',
                    duration: 5,
                  });
                }
                resolve(true);
                // 密码修改完成 回到登录页面
                history.push('/s/signin');
              })
              .catch((err) => {
                console.log(err);
                resolve(true);
                openNotifications.open({
                  message: err.data.message || resetPasswordPrompt.errorText,
                  variant: 'error',
                  duration: 5, // null 表示永远不移除
                });
              });
          }, 1000);
        });
      }
    });
    return ayc;
  };

  render() {
    const { classes, form, history } = this.props;
    const {
      email, isError, loading,
    } = this.state;
    return (
      <InputContainer title={(!loading && !isError) ? 'REST PASSWORD' : ''}>
        {
          // eslint-disable-next-line no-nested-ternary
          loading
            ? <div>loading</div>
            : isError
              ? (
                <div className={classes.errorWrapper}>
                  <h2 className={classes.errorTitle}>当前token错误</h2>
                  <p className={classes.errorText}>建议你点击下面按钮重新注册一此, 如果多次出现错误, 请联系管理员</p>
                  <MyButton
                    variant="contained"
                    color="inherit"
                    onClick={() => { history.push('/s/password/forgot'); }}
                  >
                    回到找回密码页面
                  </MyButton>
                </div>
              )
              : (
                <>
                  <p className={classes.prompt}>
                    Dear
                    <b>{email}</b>
                  </p>
                  <p className={classes.prompt}>
                    To reset your password, simply enter a new password below
                  </p>
                  <MergePassword form={form} />
                  <SubmitButton
                    name="Log in"
                    handleSubmit={this.handleSubmit}
                  />
                </>
              )
        }
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
