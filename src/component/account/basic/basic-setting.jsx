import React, { createRef } from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import { createForm, formShape } from 'rc-form';

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
import { postRequestBody, get, SUCCESS } from '../../../asstes/http/index';
import { userInfoPrompt } from '../../../asstes/data/prompt-text';
import { wibstieStyle } from '../style';

@createForm()
@withStyles(wibstieStyle)
class BasicSetting extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      data: null,
    };
    this.phoneRef = createRef();
  }

  componentDidMount() {
    this._unmount = true;
    // 查询个人信息
    setTimeout(() => {
      get('/api/profile/info')
        .then((response) => {
          if (this._unmount) {
            this.setState({
              data: response,
            });
          }
          console.log(response, 'response');
        })
        .catch((err) => {
          console.log(err);
        });
    }, 500);
  }

  componentWillUnmount() {
    this._unmount = false;
  }

  /**
   * 修改个人信息
   * @returns {*} 验证正确的情况下返回一个 promise对象
   */
  handleSubmit = () => {
    const { form } = this.props;
    const { data } = this.state;
    let ayc = null;
    form.validateFields((error, value) => {
      const mobile = this.phoneRef.current.handleChange();
      if (!error && mobile) {
        const obj = Object.assign(data, { ...value, mobile });
        ayc = new Promise((resolve) => {
          postRequestBody('/api/profile/update', obj)
            .then((response) => {
              if (response.message === SUCCESS) {
                openNotifications.open({
                  message: userInfoPrompt.successText,
                  variant: 'info',
                  duration: null, // null 表示永远不移除
                });
              }
              resolve(true);
            })
            .catch((err) => {
              openNotifications.open({
                message: err.data.message || userInfoPrompt.errorText,
                variant: 'error',
                duration: 10, // null 表示永远不移除
              });
              resolve(true);
            });
        });
      }
    });
    return ayc;
  };

  render() {
    // eslint-disable-next-line no-unused-vars
    const { form, classes } = this.props;
    const { data } = this.state;
    return (
      <MainContainer>
        {
          data
            ? (
              <Container
                title="Basic Sitting"
                component={<MyCropper />}
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
                />
                <TelIndex ref={this.phoneRef} value={data.mobile} />
                <DateSelection
                  form={form}
                  defaultValue={data.dateOfBirth}
                />
                <MyRadio
                  form={form}
                  value={data.gender}
                />
                <SubmitButton
                  width="200px"
                  name="Submit"
                  handleSubmit={this.handleSubmit}
                />
              </Container>
            )
            : <div>loading....</div>
        }
      </MainContainer>
    );
  }
}

BasicSetting.propTypes = {
  classes: PropTypes.objectOf(PropTypes.object).isRequired,
  form: formShape.isRequired,
};

export default BasicSetting;
