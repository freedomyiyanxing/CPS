import React from 'react';
import PropTypes from 'prop-types';
import { createForm, formShape } from 'rc-form';
import { inject } from 'mobx-react';

import InputContainer from '../../common/box-container/form-container';
import Emails from '../../common/form/email';
import Name from '../../common/form/name';
import MySelect from '../../common/form/my-select';
import MyTextarea from '../../common/form/my-textarea';
import SubmitButton from '../../common/form/submit-button';
import { contactUsSelect } from '../../assets/data/default-data';
import { getSelectValue } from '../../assets/js/utils-methods';
import { postRequestBody, SUCCESS } from '../../assets/http';
import { openNotifications } from '../../common/prompt-box/prompt-box';
import { contactUsPrompt } from '../../assets/data/prompt-text';

@inject(store => ({
  userStore: store.userStore,
}))
@createForm()
class ContactUs extends React.Component {
  /**
   * 提交事件
   * @returns {*} 验证正确的情况下返回一个 promise对象
   */
  handleSubmit = () => {
    const { form } = this.props;
    let ayc = null;
    form.validateFields((error, value) => {
      if (!error) {
        const obj = { ...value, issueType: getSelectValue(contactUsSelect, value.issueType, true) };
        ayc = postRequestBody('/api/common/contact', obj).then((response) => {
          const { message } = response;
          console.log(response);
          if (message === SUCCESS) {
            openNotifications.open({
              message: contactUsPrompt.success,
              variant: 'success',
            });
          }
        });
      }
    });
    return ayc;
  };

  render() {
    const { form, userStore, history } = this.props;
    const { userInfo } = userStore;
    return (
      <InputContainer title="CONTACT US">
        <Name
          form={form}
          name="First Name"
          outputName="firstName"
          value={userInfo ? userInfo.firstName : ''}
        />
        <Name
          form={form}
          name="Last Name"
          outputName="lastName"
          value={userInfo ? userInfo.lastName : ''}
        />
        <Emails
          form={form}
          value={userInfo ? userInfo.email : ''}
        />
        <MySelect
          form={form}
          name="Issue Type"
          outputName="issueType"
          selectArr={contactUsSelect}
        />
        <MyTextarea
          form={form}
          outputName="content"
        />
        <SubmitButton
          bank
          width="180"
          name="Send E-mail"
          history={history}
          handleSubmit={this.handleSubmit}
        />
      </InputContainer>
    );
  }
}

ContactUs.propTypes = {
  history: PropTypes.objectOf(PropTypes.object).isRequired,
  userStore: PropTypes.objectOf(PropTypes.object),
  form: formShape.isRequired,
};

ContactUs.defaultProps = {
  userStore: null,
};

export default ContactUs;
