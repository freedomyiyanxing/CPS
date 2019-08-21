import React from 'react';
import PropTypes from 'prop-types';
import { createForm, formShape } from 'rc-form';
import { withStyles } from '@material-ui/core/styles';
import { inject } from 'mobx-react';

import InputContainer from '../../common/box-container/form-container';
import Emails from '../../common/form/email';
import Password from '../../common/form/password';
import SubmitButton from '../../common/form/submit-button';
import MyFormControlLabel from '../../common/material-ui-component/form-control-label';

import { openNotifications } from '../../common/prompt-box/prompt-box';
import { psdBase64, storage } from '../../assets/js/utils-methods';
import { postRequestBody } from '../../assets/http/index';

import { loginStyle } from './style';

@inject(store => ({
  userStore: store.userStore,
}))
@withStyles(loginStyle)
@createForm()
class Login extends React.Component {
  // render前 获取存储的数据
  componentWillMount() {
    const result = storage.getStorage('login');
    this.emails = result ? result.emails : '';
    this.psd = result ? psdBase64.decrypt(result.psd) : '';
  }

  componentWillUnmount() {
    // 清除登录的报错提示
    openNotifications.clean('error');
  }

  /**
   * 提交事件
   * @returns {*} 验证正确的情况下返回一个 promise对象
   */
  handleSubmit = () => {
    const {
      form, history, location, userStore,
    } = this.props;
    let ayc = null;
    form.validateFields((error, value) => {
      if (!error) {
        ayc = postRequestBody('/api/auth/signin', { ...value }).then((response) => {
          const {
            token, photo, firstName, lastName, email,
          } = response;
          // 只有当服务器返回正确 且 点击了存储密码邮箱的check
          if (this.check) {
            storage.setStorage('login', {
              emails: value.email,
              psd: psdBase64.encryption(value.password),
            });
          }
          // 登录完成把token、登录标志、用户信息写入userStore
          userStore.setLoginInfo(
            true,
            {
              token, photo, firstName, lastName,
            },
          );
          userStore.loginUseInfo({ firstName, lastName, email });
          // 登录完成时 -> 跳转至登录首页 或者上次停留的页面
          const { pathname } = location.state ? location.state.from : { pathname: '/my/index' };
          history.push(pathname);
        });
      }
    });
    return ayc;
  };

  // 点击check 记住邮箱 密码
  handleChange = (check) => {
    this.check = check;
  };

  /**
   * 点击跳转到忘记密码页面
   */
  handleLink = () => {
    const { history } = this.props;
    history.push('/s/password/forgot');
  };

  render() {
    const { classes, form } = this.props;
    return (
      <InputContainer title="SIGN IN">
        <Emails form={form} value={this.emails} />
        <Password form={form} value={this.psd} name="Password" />
        <div className={classes.main}>
          <MyFormControlLabel
            label="Keep me logged ins"
            onChange={this.handleChange}
          />
          <span
            role="button"
            tabIndex={0}
            className={classes.text}
            onClick={this.handleLink}
          >
            Forgot your password?
          </span>
        </div>
        <SubmitButton
          name="Log in"
          handleSubmit={this.handleSubmit}
        />
      </InputContainer>
    );
  }
}

Login.propTypes = {
  history: PropTypes.objectOf(PropTypes.object).isRequired,
  location: PropTypes.objectOf(PropTypes.object).isRequired,
  classes: PropTypes.objectOf(PropTypes.object).isRequired,
  userStore: PropTypes.objectOf(PropTypes.object).isRequired,
  form: formShape.isRequired,
};

export default Login;
