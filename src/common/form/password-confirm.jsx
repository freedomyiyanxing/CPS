import React, { useState } from 'react';
import PropTypes from 'prop-types';
import InputLabel from '@material-ui/core/InputLabel';
import FormControl from '@material-ui/core/FormControl';
import FormHelperText from '@material-ui/core/FormHelperText';

import PsdVisibility from './psd-visibility';
import StyleInput from './my-input';

const ConfirmPassword = (props) => {
  const {
    form, compareToFirstPassword,
  } = props;
  const [psd, setPsd] = useState('');
  const [showPassword, setShowPassword] = useState(false);

  const handleChange = (e) => {
    setPsd(e.target.value);
  };

  const handleClickShowPassword = () => {
    setShowPassword(!showPassword);
  };

  const { getFieldProps, getFieldError } = form;
  const errors = getFieldError('confirmPassword');
  return (
    <FormControl
      fullWidth
      required
      error={errors}
      margin="normal"
      {...getFieldProps('confirmPassword', {
        validateFirst: true,
        rules: [
          {
            required: true,
            message: '密码是必填的',
          },
          {
            validator: compareToFirstPassword,
          },
        ],
      })}
    >
      <InputLabel htmlFor="my-confirm-password">Confirm Password</InputLabel>
      <StyleInput
        id="my-confirm-password"
        type={showPassword ? 'text' : 'password'}
        aria-describedby="my-confirm-password"
        value={psd}
        onChange={handleChange}
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

ConfirmPassword.propTypes = {
  form: PropTypes.objectOf(PropTypes.object).isRequired,
  compareToFirstPassword: PropTypes.func.isRequired,
};


export default ConfirmPassword;
