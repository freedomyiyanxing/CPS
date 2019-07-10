import React from 'react';
import PropTypes from 'prop-types';
import { createForm, formShape } from 'rc-form';
import { withStyles } from '@material-ui/core/styles';
import FormControl from '@material-ui/core/FormControl';
import FormHelperText from '@material-ui/core/FormHelperText';

import InputContainer from '../../common/box-container/form-container';
import Emails from '../../common/form/email';
import Name from '../../common/form/name';
import MergePassword from '../../common/form/password-merge';
import SubmitButton from '../../common/form/submit-button';
import MyTextarea from '../../common/form/my-textarea';
import MyUrl from '../../common/form/my-url';
import MySelect from '../../common/form/my-select';
import MyButton from '../../common/material-ui-compoents/button';
import IntlTelInput from '../../common/react-intl-tel-input/intlTelInput';
import MyLabel from '../../common/material-ui-compoents/input-label';

import { openNotifications } from '../../common/prompt-box/prompt-box';
import { postRequestBody, get, SUCCESS } from '../../asstes/http/index';
import { webSiteCategory, monthlyVisitors } from '../../asstes/data/default-data';
import { registerInfoPrompt, formPrompt } from '../../asstes/data/prompt-text';

import { registerInfoStyle } from './style';

@withStyles(registerInfoStyle)
@createForm()
class RegisterInfo extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      firstName: '',
      lastName: '',
      email: '',
      isError: false, // 标致 获取用户是否成功
      loading: true,
      errorPhone: null,
    };

    this.phone = null;
  }

  componentDidMount() {
    const { location } = this.props;
    const { search } = location;
    this._unmount = true;
    if (search) {
      // 获取注册用户的信息 (name && email)
      get(`/api/auth/signup/info${search}`)
        .then((response) => {
          const { firstName, lastName, email } = response;
          if (this._unmount) {
            this.setState({
              firstName,
              lastName,
              email,
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
    const {
      firstName, lastName, email, errorPhone,
    } = this.state;
    let ayc = null;
    form.validateFields((error, value) => {
      // 判断必须填写了电话号码
      if (!this.phone) {
        this.setState({
          errorPhone: [formPrompt.phoneRequired],
        });
        return false;
      }

      // (errorPhone如果为真 则表示有电话号码错误)
      if (!error && !errorPhone) {
        ayc = new Promise((resolve) => {
          const obj = {
            firstName, lastName, email, ...value,
          };
          postRequestBody('/api/auth/signup/complete', obj)
            .then((response) => {
              if (response.message === SUCCESS) {
                openNotifications.open({
                  message: registerInfoPrompt.successText,
                  variant: 'success',
                  duration: 5,
                });
                resolve(true);
                // to 登录页面
                history.push('/s/signin');
              }
            })
            .catch((err) => {
              console.log(err, 'err');
              openNotifications.open({
                message: err.data.message || registerInfoPrompt.errorText,
                variant: 'error',
                duration: 5,
              });
              resolve(true);
            });
        });
      }
    });
    return ayc;
  };

  // 电话验证函数 (onchange)
  onPhoneNumberChange = (isValid, newNumber, countryData, fullNumber) => {
    console.log('电话验证函数onchange: ->', isValid, fullNumber);
    let errors = null;
    if (!fullNumber) {
      errors = [formPrompt.phoneRequired];
    }
    if (!isValid && !errors) {
      errors = [formPrompt.phoneFormat];
    }
    this.setState({
      errorPhone: errors,
    });
    this.phone = fullNumber;
  };

  // 电话验证函数 (切换国家)
  onSelectFlag = (isValid, newNumber, countryData, fullNumber) => {
    console.log('切换国家0: ->', isValid, fullNumber);
    if (!fullNumber) {
      return false;
    }
    this.setState({
      errorPhone: isValid ? null : [formPrompt.phoneFormat],
    });
    this.phone = fullNumber;
  };

  render() {
    const { classes, form, history } = this.props;
    const {
      firstName, lastName, email, isError, loading, errorPhone,
    } = this.state;
    return (
      <InputContainer title={(!loading && !isError) ? 'SIGN UP' : ''}>
        {
          // eslint-disable-next-line no-nested-ternary
          loading
            ? <div>loading 0000</div>
            : (
              isError
                ? (
                  <div className={classes.errorWrapper}>
                    <h2 className={classes.errorTitle}>当前token错误</h2>
                    <p className={classes.errorText}>建议你点击下面按钮重新注册一此, 如果多次出现错误, 请联系管理员</p>
                    <MyButton
                      variant="contained"
                      color="inherit"
                      onClick={() => { history.push('/s/signup'); }}
                    >
                      回到注册页面
                    </MyButton>
                  </div>
                )
                : (
                  <>
                    <div className={classes.firstTitle}>
                      <h4 className={classes.title}>ACCOUNT INFORMATION</h4>
                    </div>
                    <Name name="First Name" value={firstName} outputName="firstName" form={form} disabled />
                    <Name name="Last Name" value={lastName} outputName="lastName" form={form} disabled />
                    <Emails form={form} value={email} disabled />
                    <FormControl
                      fullWidth
                      required
                      margin="normal"
                      error={errorPhone}
                    >
                      <MyLabel fontSize="sm" shrink>Phone *</MyLabel>
                      <IntlTelInput
                        // defaultValue="+244 923 123 456"
                        onPhoneNumberChange={this.onPhoneNumberChange}
                        onSelectFlag={this.onSelectFlag}
                      />
                      {
                        errorPhone
                          ? <FormHelperText>{errorPhone.join(',')}</FormHelperText>
                          : null
                      }
                    </FormControl>
                    <MergePassword form={form} />
                    <div className={classes.lastTitle}>
                      <h4 className={classes.title}>WEBSITE INFORMATION</h4>
                    </div>
                    <Name name="Website Name" outputName="websiteName" form={form} />
                    <MyUrl form={form} />
                    <MySelect
                      form={form}
                      name="Category"
                      outputName="websiteCategory"
                      selectArr={webSiteCategory}
                    />
                    <MySelect
                      form={form}
                      name="Current Monthly Unique Visitores"
                      outputName="monthlyVisits"
                      selectArr={monthlyVisitors}
                    />
                    <MyTextarea form={form} />
                    <SubmitButton
                      name="Submit"
                      handleSubmit={this.handleSubmit}
                    />
                  </>
                )
            )
        }
      </InputContainer>
    );
  }
}

RegisterInfo.propTypes = {
  history: PropTypes.objectOf(PropTypes.object).isRequired,
  location: PropTypes.objectOf(PropTypes.object).isRequired,
  classes: PropTypes.objectOf(PropTypes.object).isRequired,
  form: formShape.isRequired,
};

export default RegisterInfo;
