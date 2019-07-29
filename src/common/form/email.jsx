import React from 'react';
import PropTypes from 'prop-types';
import FormControl from '@material-ui/core/FormControl';
import InputLabel from '@material-ui/core/InputLabel';
import FormHelperText from '@material-ui/core/FormHelperText';
import MyInput from '../material-ui-component/input';
import { formPrompt } from '../../assets/data/prompt-text';

const Emails = (props) => {
  const {
    value, form, disabled, onChange,
  } = props;

  const { getFieldProps, getFieldError } = form;
  const errors = getFieldError('email');
  return (
    <FormControl
      fullWidth
      required={!disabled}
      disabled={disabled}
      error={errors}
      margin="normal"
    >
      <InputLabel htmlFor="my-email">Email</InputLabel>
      <MyInput
        id="my-email"
        type="email"
        {...getFieldProps('email', {
          validateFirst: true,
          hidden: disabled, // 是否忽略当前字段的验证
          initialValue: value, // 设置默认值 (保证在有默认值的情况 验证会通过)
          rules: [
            {
              required: true,
              message: formPrompt.emailRequired,
            },
            {
              type: 'email',
              message: formPrompt.emailFormat,
            },
            {
              // 异步验证
              // eslint-disable-next-line no-shadow
              validator(rule, value, callback) {
                // 如果需要异步验证邮箱 就传一个异步验证的方法 (onChange) 否则就直接忽略
                if (typeof onChange === 'function') {
                  onChange(value, callback);
                } else {
                  callback();
                }
              },
            },
          ],
        })}
      />
      {
        errors
          ? <FormHelperText>{errors.join(',')}</FormHelperText>
          : null
      }
    </FormControl>
  );
};

Emails.propTypes = {
  form: PropTypes.objectOf(PropTypes.object).isRequired,
  value: PropTypes.string,
  disabled: PropTypes.bool,
  onChange: PropTypes.func,
};

Emails.defaultProps = {
  value: '',
  disabled: false,
  onChange: null,
};

export default Emails;
