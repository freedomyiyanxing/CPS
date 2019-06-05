import React, { useState } from 'react';
import PropTypes from 'prop-types';
import FormControl from '@material-ui/core/FormControl';
import InputLabel from '@material-ui/core/InputLabel';
import FormHelperText from '@material-ui/core/FormHelperText';

import StyleInput from './my-input';

const Emails = (props) => {
  const { value, form } = props;
  const [email, setEmail] = useState(value);

  const handleChange = (e) => {
    setEmail(e.target.value);
  };

  const { getFieldProps, getFieldError } = form;
  const errors = getFieldError('email');
  return (
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
            message: '邮箱格式错误',
          },
        ],
      })}
    >
      <InputLabel htmlFor="my-email">Email</InputLabel>
      <StyleInput
        id="my-email"
        type="email"
        aria-describedby="my-helper-text"
        value={email}
        autocomplete="off"
        onChange={handleChange}
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
};

Emails.defaultProps = {
  value: '',
};

export default Emails;
