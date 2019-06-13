import React, { useState } from 'react';
import PropTypes from 'prop-types';
import FormControl from '@material-ui/core/FormControl';
import InputLabel from '@material-ui/core/InputLabel';
import FormHelperText from '@material-ui/core/FormHelperText';

import PsdVisibility from './psd-visibility';
import StyleInput from './my-input';

const Password = (props) => {
  const {
    form, name, validateToNextPassword, onBlur,
  } = props;
  const [psd, setPsd] = useState('');
  const [showPassword, setShowPassword] = useState(false);

  const outputName = name.replace(/\s/g, '');

  const handleChange = (e) => {
    setPsd(e.target.value);
  };

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
      {...getFieldProps(outputName, {
        validateFirst: true,
        force: true,
        rules: [
          {
            required: true,
            message: '密码是必填的',
          },
          {
            pattern: /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d~^$@$!%*#?&\-_]{6,20}$/,
            message: '密码格式错误',
          },
          {
            validator: validateToNextPassword,
          },
        ],
      })}
    >
      <InputLabel htmlFor="my-password">{name}</InputLabel>
      <StyleInput
        id="my-password"
        type={showPassword ? 'text' : 'password'}
        aria-describedby="my-helper-text"
        value={psd}
        onChange={handleChange}
        onBlur={onBlur}
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
  onBlur: PropTypes.func,
  name: PropTypes.string.isRequired,
};

Password.defaultProps = {
  validateToNextPassword: null,
  onBlur: null,
};

export default Password;
