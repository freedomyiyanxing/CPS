import React, { createRef } from 'react';
import PropTypes from 'prop-types';
import { createForm, formShape } from 'rc-form';
import { inject } from 'mobx-react';

import MainContainer from '../../../common/box-container/main-container';
import Emails from '../../../common/form/email';
import Name from '../../../common/form/name';
import SubmitButton from '../../../common/form/submit-button';
import MyRadio from '../../../common/form/my-radio';
import DateSelection from '../../../common/date-picker/date-selection';
import Container from '../utils/container';
import MyCropper from '../utils/cropper';
import TelIndex from '../../../common/react-intl-tel-input/index';

import { openNotifications } from '../../../common/prompt-box/prompt-box';
import { postRequestBody, get, SUCCESS } from '../../../assets/http/index';
import { userInfoPrompt } from '../../../assets/data/prompt-text';
import { getIsForm } from '../../../assets/js/utils-methods';

let userDate = null;

@inject(store => ({
  userStore: store.userStore,
}))
@createForm()
class BasicSetting extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      data: userDate || null,
      datePhoneDisable: true,
    };
    this.phoneRef = createRef();
  }

  componentDidMount() {
    this._unmount = true;
    if (userDate) {
      return;
    }
    // 查询个人信息
    get('/api/profile/info')
      .then((response) => {
        if (this._unmount) {
          this.setState({
            data: userDate = response, // 缓存数据
          });
        }
      });
  }

  componentWillUnmount() {
    this._unmount = false;
  }

  /**
   * 修改个人信息
   * @returns {*} 验证正确的情况下返回一个 promise对象
   */
  handleSubmit = () => {
    const { form, userStore } = this.props;
    const { data } = this.state;
    const mobile = this.phoneRef.current.handleChange();
    let ayc = null;
    form.validateFields((error, value) => {
      if (!error && mobile) {
        const obj = Object.assign(data, { ...value, mobile });
        ayc = postRequestBody('/api/profile/update', obj).then((response) => {
          const { message } = response;
          if (message === SUCCESS) {
            userStore.selUserName(obj.firstName);
            openNotifications.open({
              message: userInfoPrompt.successText,
              variant: 'success',
              duration: 5,
            });
          }
          this.setState({
            datePhoneDisable: true,
          });
        });
      }
    });
    return ayc;
  };

  // 日期控制 表单提交
  handleDate = (is) => {
    this.setStates(is);
  };

  // 电话控制 表单提交
  handlePhone = (is) => {
    this.setStates(is);
  };

  setStates = (is) => {
    const { datePhoneDisable } = this.state;
    if (datePhoneDisable) {
      this.setState({
        datePhoneDisable: is,
      });
    }
  };

  render() {
    const { form, history } = this.props;
    const { data, datePhoneDisable } = this.state;
    const disabled = getIsForm(
      form,
      data,
      ['firstName', 'lastName', 'email', 'gender'],
    );
    return (
      <MainContainer>
        {
          data
            ? (
              <Container
                title="Basic Sitting"
                component={<MyCropper id={data.id} />}
              >
                <Name
                  form={form}
                  name="First Name"
                  value={data.firstName}
                  outputName="firstName"
                />
                <Name
                  form={form}
                  name="Last Name"
                  value={data.lastName}
                  outputName="lastName"
                />
                <Emails
                  form={form}
                  value={data.email}
                  disabled
                />
                <TelIndex
                  ref={this.phoneRef}
                  value={data.mobile}
                  handlePhone={this.handlePhone}
                />
                <DateSelection
                  form={form}
                  defaultValue={data.dateOfBirth}
                  onChange={this.handleDate}
                />
                <MyRadio
                  form={form}
                  value={data.gender}
                />
                <SubmitButton
                  bank
                  width="180"
                  name="Submit"
                  disabled={disabled && datePhoneDisable}
                  history={history}
                  handleSubmit={this.handleSubmit}
                />
              </Container>
            )
            : null
        }
      </MainContainer>
    );
  }
}

BasicSetting.propTypes = {
  history: PropTypes.objectOf(PropTypes.object).isRequired,
  userStore: PropTypes.objectOf(PropTypes.object),
  form: formShape.isRequired,
};

BasicSetting.defaultProps = {
  userStore: null,
};

export default BasicSetting;
