import React, { useState } from 'react';
import PropTypes from 'prop-types';
import FormControl from '@material-ui/core/FormControl';
import InputLabel from '@material-ui/core/InputLabel';
import FormHelperText from '@material-ui/core/FormHelperText';

import PsdVisibility from './psd-visibility';
import MyInput from '../material-ui-component/input';
import { formPrompt } from '../../assets/data/prompt-text';
import { patterns } from '../../assets/data/pattern';

const Password = (props) => {
  const {
    form, name, value, validateToNextPassword, outputName,
  } = props;
  const [showPassword, setShowPassword] = useState(false);

  const handleClickShowPassword = () => {
    setShowPassword(!showPassword);
  };

  const { getFieldProps, getFieldError } = form;
  const errors = getFieldError(outputName);
  return (
    <FormControl
      fullWidth
      required
      error={errors}
      margin="normal"
    >
      <InputLabel htmlFor={`my-${name}`}>{name}</InputLabel>
      <MyInput
        id={`my-${name}`}
        type={showPassword ? 'text' : 'password'}
        {...getFieldProps(outputName, {
          validateFirst: true,
          force: true,
          initialValue: value, // 设置默认值 (保证在有默认值的情况 验证会通过)
          rules: [
            {
              required: true,
              message: formPrompt.passwordRequired,
            },
            {
              pattern: patterns.password,
              message: formPrompt.passwordFormat,
            },
            {
              validator: validateToNextPassword,
            },
          ],
        })}
        endAdornment={<PsdVisibility handleClick={handleClickShowPassword} />}
      />
      {
        errors
          ? <FormHelperText>{errors.join(',')}</FormHelperText>
          : null
      }
    </FormControl>
  );
};

Password.propTypes = {
  form: PropTypes.objectOf(PropTypes.object).isRequired,
  validateToNextPassword: PropTypes.func,
  value: PropTypes.string,
  onBlur: PropTypes.func,
  name: PropTypes.string.isRequired,
  outputName: PropTypes.string, // 输出key值
};

Password.defaultProps = {
  validateToNextPassword: null,
  onBlur: null,
  value: '',
  outputName: 'password',
};

export default Password;
