/* eslint-disable */
import React from 'react';
import PropTypes from 'prop-types';
import { createForm, formShape } from 'rc-form';
import { withStyles } from '@material-ui/core/styles';
import FormControlLabel from '@material-ui/core/FormControlLabel';

import MyCheckbox from '../../common/material-ui-compoents/checkbox';
import InputContainer from '../../common/box-container/form-container';
import Emails from '../../common/form/email';
import Password from '../../common/form/password';
import SubmitButton from '../../common/form/submit-button';
import { openNotifications } from '../../common/prompt-box/prompt-box';
import { Consumer } from '../../context/index';
import { psdBase64, storage } from '../../asstes/js/utils-methods';
import { postRequestBody } from '../../asstes/http/index';

import { loginStyle } from './style';

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

  /**
   * 提交事件
   * @returns {*} 验证正确的情况下返回一个 promise对象
   */
  handleSubmit = (context) => {
    // eslint-disable-next-line no-unused-vars
    const { form, history, location } = this.props;
    const { check } = this.state;
    let ayc = null;
    form.validateFields((error, value) => {
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
              console.log(response);
              // 修改登录状态
              context.setLogin(true);
              // 跳转至登录首页
              // eslint-disable-next-line max-len
              // const { pathname } = location.state ? location.state.from : { pathname: '/yes/index' };
              // history.push(pathname);
              resolve(true);
              openNotifications.clean('error');
            })
            .catch((err) => {
              resolve(err);
              console.log('loginerror: ', err.data.message);
              openNotifications.open({
                message: err.data.message,
                variant: 'error',
                duration: null, // null 表示永远不移除
                key: 'error', // 方便删除 相当于当前提示框的唯一标识
              });
            });
        });
      } else {
        ayc = null;
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
      <Consumer>
        {
          context => (
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
                handleSubmit={() => this.handleSubmit(context)}
              />
            </InputContainer>
          )
        }
      </Consumer>
    );
  }
}

Login.propTypes = {
  history: PropTypes.objectOf(PropTypes.object).isRequired,
  location: PropTypes.objectOf(PropTypes.object).isRequired,
  classes: PropTypes.objectOf(PropTypes.object).isRequired,
  form: formShape.isRequired,
};

export default Login;
