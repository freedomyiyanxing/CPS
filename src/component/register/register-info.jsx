import React, { createRef } from 'react';
import PropTypes from 'prop-types';
import { createForm, formShape } from 'rc-form';
import { withStyles } from '@material-ui/core/styles';

import InputContainer from '../../common/box-container/form-container';
import Emails from '../../common/form/email';
import Name from '../../common/form/name';
import MergePassword from '../../common/form/password-merge';
import SubmitButton from '../../common/form/submit-button';
import MyTextarea from '../../common/form/my-textarea';
import MyUrl from '../../common/form/my-url';
import MySelect from '../../common/form/my-select';
import TelIndex from '../../common/react-intl-tel-input/index';
import MyFormControlLabel from '../../common/material-ui-component/form-control-label';
import TokenError from '../../common/token-error/index';

import { openNotifications } from '../../common/prompt-box/prompt-box';
import { postRequestBody, get, SUCCESS } from '../../assets/http/index';
import { webSiteCategory, monthlyVisitors, agreement } from '../../assets/data/default-data';
import { registerInfoPrompt } from '../../assets/data/prompt-text';
import { getSelectValue } from '../../assets/js/utils-methods';

import { registerInfoStyle } from './style';


@withStyles(registerInfoStyle)
@createForm()
class RegisterInfo extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      data: null,
      isError: false, // 标致 获取用户是否成功
    };
    this.phoneRef = createRef();
  }

  componentDidMount() {
    const { location } = this.props;
    const { search } = location;
    this._unmount = true;
    if (search) {
      // 获取注册用户的信息 (name && email)
      get(`/api/auth/signup/info${search}`)
        .then((response) => {
          if (this._unmount) {
            this.setState({
              data: response,
            });
          }
        })
        .catch(() => {
          this.setState({
            isError: true,
          });
        });
    } else {
      this.setState({
        isError: true,
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
    const { data } = this.state;
    let ayc = null;
    form.validateFields((error, value) => {
      const mobile = this.phoneRef.current.handleChange();
      if (!error && mobile) {
        if (!this.check) { // 如果没有点同意用户协议
          openNotifications.open({
            message: registerInfoPrompt.agreement,
            variant: 'warning',
            duration: 5,
          });
          return;
        }

        const obj = Object.assign(data, value, {
          mobile,
          monthlyVisits: getSelectValue(monthlyVisitors, value.monthlyVisits, true),
          websiteCategory: getSelectValue(webSiteCategory, value.websiteCategory, true),
        });

        ayc = postRequestBody('/api/auth/signup/complete', obj).then((response) => {
          const { message } = response;
          if (message === SUCCESS) {
            openNotifications.open({
              message: registerInfoPrompt.successText,
              variant: 'success',
            });
            // to 注册完成 等待审批页面
            history.push('/s/signup/wait');
          }
        });
      }
    });
    return ayc;
  };

  handleCheckChange = (check) => {
    this.check = check;
  };

  render() {
    const { classes, form, history } = this.props;
    const { data, isError } = this.state;
    console.log(data);
    return (
      <InputContainer title={isError ? '' : 'SIGN UP'}>
        <TokenError
          error={isError}
          history={history}
        >
          <div className={classes.firstTitle}>
            <h4 className={classes.title}>ACCOUNT INFORMATION</h4>
          </div>
          <Name name="First Name1" value={data ? data.firstName : ''} outputName="firstName" form={form} disabled />
          <Name name="Last Name" value={data ? data.lastName : ''} outputName="lastName" form={form} disabled />
          <Emails form={form} value={data ? data.email : ''} disabled />
          <TelIndex ref={this.phoneRef} />
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
          <div className={classes.lastTitle}>
            <h4 className={classes.title}>AGREEMENT</h4>
          </div>
          <p className={classes.text}>{agreement}</p>
          <MyFormControlLabel
            label="I agree to the agreement."
            onChange={this.handleCheckChange}
          />
          <SubmitButton
            name="Submit"
            handleSubmit={this.handleSubmit}
          />
        </TokenError>
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
