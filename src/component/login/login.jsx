import React from 'react';
import PropTypes from 'prop-types';
import { createForm, formShape } from 'rc-form';
import { withStyles } from '@material-ui/core/styles';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import CheckBox from '@material-ui/icons/CheckBox';
import CheckBoxOutlineBlank from '@material-ui/icons/CheckBoxOutlineBlank';

import InputContainer from '../../common/box-container/form-container';
import Emails from '../../common/form/email';
import Password from '../../common/form/password';
import SubmitButton from '../../common/form/submit-button';
import { Consumer } from '../../context/index';

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
          setTimeout(() => {
            const { pathname } = location.state ? location.state.from : { pathname: '/yes/index' };
            console.log({ ...value, check }, pathname);
            // 修改登录状态
            context.setLogin(true);
            // 跳转至登录首页
            history.push(pathname);
            resolve(true);
          }, 1000);
        });
      } else {
        ayc = null;
      }
    });
    return ayc;
  };

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
    history.push('/not/forget-password');
  };

  render() {
    const { classes, form } = this.props;
    const { check } = this.state;
    return (
      <Consumer>
        {
          context => (
            <InputContainer title="SIGN IN">
              <Emails form={form} />
              <Password form={form} name="Password" />
              <div className={classes.main}>
                <FormControlLabel
                  control={(
                    <Checkbox
                      value="checkedC"
                      checked={check}
                      onChange={this.handleChange}
                      icon={<CheckBoxOutlineBlank className={classes.icon} />}
                      color="primary"
                      checkedIcon={<CheckBox className={classes.icon} />}
                      classes={{
                        root: classes.checkRoot,
                      }}
                    />
                  )}
                  label="Keep me logged in"
                  classes={{
                    label: classes.label,
                  }}
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
