/* eslint-disable */

import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { createForm, formShape } from 'rc-form';
import { withStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import FormControl from '@material-ui/core/FormControl';
import InputLabel from '@material-ui/core/InputLabel';
import Input from '@material-ui/core/Input';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import FormHelperText from '@material-ui/core/FormHelperText';

import CheckBox from '@material-ui/icons/CheckBox';
import CheckBoxOutlineBlank from '@material-ui/icons/CheckBoxOutlineBlank';

import { loginStyle } from './style';

import InputContainer from '../../common/input/container';

//
const StyleInput = withStyles(theme => ({
  root: {
    lineHeight: 1,
    '&:before': {
      borderBottomColor: theme.palette.text.colorDdd,
    },
  },
}))(Input);

class Logins extends React.Component{
  constructor() {
    super();
    this.state = {
      check: false,
    }
  }

  // 提交按钮
  handleClick = () => {
    const { form } = this.props;
    const { check } = this.state;
    form.validateFields((error, value) => {
      console.log(error, value);
    });
    console.log('是否选中: ', check)
  };

  handleChange = () => {
    const { check } = this.state;
    this.setState({
      check: !check,
    })
  };

  render() {
    const { classes, form } = this.props;
    const { check } = this.state;
    const { getFieldProps, getFieldError } = form;
    const errors = getFieldError('email');
    console.log(errors);
    return (
      <InputContainer title="SIGN IN">
        <div className={classes.wrapper}>
          <form action="">
            <FormControl
              fullWidth
              required
              error={errors}
              margin="normal"
              {...getFieldProps('email', {
                validateFirst: true,
                rules: [
                  {
                    required: true,
                    message: '邮箱必填',
                  },
                  {
                    type: 'email',
                    message: '邮箱格式不对',
                  },
                ],
              })}
            >
              <InputLabel htmlFor="my-input">Email address</InputLabel>
              <StyleInput
                id="my-input"
                aria-describedby="my-helper-text"
              />
              {
                errors
                 ? (
                    <FormHelperText
                      classes={{
                        root: classes.errorText,
                      }}
                    >
                      {errors.join(',')}
                    </FormHelperText>
                  )
                  : null
              }
            </FormControl>
            <FormControl
              fullWidth
              required
              margin="normal"
            >
              <InputLabel htmlFor="my-input">Password</InputLabel>
              <StyleInput
                id="my-input"
                password
                select
                aria-describedby="my-helper-text"
              />
            </FormControl>
            <FormControl
              fullWidth
              required
              margin="normal"
            >
              <InputLabel htmlFor="my-input">Captcha</InputLabel>
              <StyleInput
                id="my-input"
                aria-describedby="my-helper-text"
              />
            </FormControl>
            <div className={classes.main}>
              <FormControlLabel
                control={
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
                }
                label="Keep me logged in"
                classes={{
                  label: classes.label,
                }}
              />
              <span className={classes.text}>Forgot your password?</span>
            </div>
            <Button
              variant="contained"
              fullWidth
              color="primary"
              classes={{
                root: classes.btn,
              }}
              onClick={this.handleClick}
            >
              Log in
            </Button>
          </form>
        </div>
      </InputContainer>
    )
  }
}

Logins.propTypes = {
  classes: PropTypes.object.isRequired,
  form: formShape,
};

const Login = withStyles(loginStyle)(createForm()(Logins));

export default Login;
