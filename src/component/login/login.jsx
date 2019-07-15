import React from 'react';
import PropTypes from 'prop-types';
import { createForm, formShape } from 'rc-form';
import { withStyles } from '@material-ui/core/styles';
import { inject } from 'mobx-react';
import FormControlLabel from '@material-ui/core/FormControlLabel';

import MyCheckbox from '../../common/material-ui-compoents/checkbox';
import InputContainer from '../../common/box-container/form-container';
import Emails from '../../common/form/email';
import Password from '../../common/form/password';
import SubmitButton from '../../common/form/submit-button';
import { openNotifications } from '../../common/prompt-box/prompt-box';
import { psdBase64, storage, session } from '../../asstes/js/utils-methods';
import { postRequestBody } from '../../asstes/http/index';
import { loginPrompt } from '../../asstes/data/prompt-text';

import { loginStyle } from './style';

@inject(store => ({
  userStore: store.userStore,
}))
@withStyles(loginStyle)
@createForm()
class Login extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      check: false,
    };
  }

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
    const { check } = this.state;
    let ayc = null;
    // rc-form验证
    form.validateFields((error, value) => {
      // 如果没有错误信息 说明 验证通过
      if (!error) {
        ayc = new Promise((resolve) => {
          postRequestBody('/api/auth/signin', { ...value })
            .then((response) => {
              // 只有当服务器返回正确 且 点击了存储密码邮箱的check
              if (check) {
                storage.setStorage('login', {
                  emails: value.email,
                  psd: psdBase64.encryption(value.password),
                });
              }
              // 登录完成后 把token 和 登录标志 写入 sessionStorage
              session.setSession('loginInfo', {
                token: response.token,
                isLogin: true,
              });
              // 修改全局登录状态 (确保路由不在拦截)
              userStore.setLogin(true);
              // 登录完成时 -> 跳转至登录首页 或者上次停留的页面
              const { pathname } = location.state ? location.state.from : { pathname: '/my/index' };
              history.push(pathname);
              // 结束按钮的loading效果
              resolve(true);
            })
            .catch((err) => {
              resolve(err);
              openNotifications.open({
                message: err.data.message || loginPrompt.errorText,
                variant: 'error',
                duration: null, // null 表示永远不移除
                key: 'error', // 方便删除 相当于当前提示框的唯一标识
              });
            });
        });
      }
    });
    return ayc;
  };

  // 点击check 记住邮箱 密码
  handleChange = () => {
    const { check } = this.state;
    this.setState({
      check: !check,
    });
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
    const { check } = this.state;
    return (
      <InputContainer title="SIGN IN">
        <Emails form={form} value={this.emails} />
        <Password form={form} value={this.psd} name="Password" />
        <div className={classes.main}>
          <FormControlLabel
            label="Keep me logged in"
            classes={{ root: classes.labelRoot, label: classes.label }}
            control={<MyCheckbox checked={check} onChange={this.handleChange} />}
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
