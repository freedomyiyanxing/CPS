/* eslint-disable */
import React from 'react';
import PropTypes from 'prop-types';
import { createForm, formShape } from 'rc-form';
import { withStyles } from '@material-ui/core/styles';


import InputContainer from '../../common/box-container/form-container';
import Emails from '../../common/form/email';
import Name from '../../common/form/name';
import SubmitButton from '../../common/form/submit-button';

// eslint-disable-next-line no-unused-vars
import { debounce } from '../../asstes/js/utils-methods';
import { postRequestBody, get } from '../../asstes/http/index';
import { indexStyle } from './style';

@withStyles(indexStyle)
@createForm()
class Register extends React.Component {
  constructor(props) {
    super(props);
  }

  /**
   * 邮箱验证
   * @type {Function}
   */
  handleChange = debounce((emails, callback) => {
    if (emails) {
      get(`/api/auth/emailExist/${emails}`)
        .then((data) => {
          if (data.existed) {
            callback('邮箱已经存在');
          } else {
            callback()
          }
        }).catch((err) => {
          console.log(err);
        });
    }
  });

  /**
   * 提交事件
   * @returns {*} 验证正确的情况下返回一个 promise对象
   */
  handleSubmit = () => {
    // eslint-disable-next-line no-unused-vars
    const { form, history } = this.props;
    let ayc = null;
    form.validateFields((error, value) => {
      if (!error) {
        ayc = new Promise((resolve) => {
          console.log({ ...value });
          postRequestBody('/api/auth/signup', { ...value });
          // history.push('/not/email-sent', { email: value.email, link: 'register' });
          resolve(true);
        });
      } else {
        ayc = null;
      }
    });
    return ayc;
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
    return (
      <InputContainer title="SIGN UP">
        <Name name="First Name" outputName="firstName" form={form} />
        <Name name="Last Name" outputName="lastName" form={form} />
        <Emails
          form={form}
          onChange={this.handleChange}
          compareToEndEmail={this.compareToEndEmail}
        />
        <p className={classes.prompt}>
          By registering,
          you agree with our
          <span> Terms & Condition </span>
          and
          <span> Privacy Policy </span>
        </p>
        <SubmitButton
          name="Next"
          handleSubmit={this.handleSubmit}
        />
      </InputContainer>
    );
  }
}

Register.propTypes = {
  history: PropTypes.objectOf(PropTypes.object).isRequired,
  classes: PropTypes.objectOf(PropTypes.object).isRequired,
  form: formShape.isRequired,
};

export default Register;
