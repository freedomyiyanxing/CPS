import React, { useState } from 'react';
import PropTypes from 'prop-types';
import FormControl from '@material-ui/core/FormControl';
import InputLabel from '@material-ui/core/InputLabel';
import FormHelperText from '@material-ui/core/FormHelperText';

import StyleInput from './my-input';

const MyUrl = (props) => {
  const { form } = props;
  const [names, setNames] = useState('');

  const handleChange = (e) => {
    setNames(e.target.value);
  };

  const { getFieldProps, getFieldError } = form;
  const errors = getFieldError('url');
  return (
    <FormControl
      fullWidth
      required
      error={errors}
      margin="normal"
      {...getFieldProps('url', {
        validateFirst: true,
        rules: [
          {
            required: true,
            message: '我们需要 你网站的 地址',
          },
          {
            type: 'url',
            message: '网址不正确 或者含有非法的字符',
          },
        ],
      })}
    >
      <InputLabel htmlFor="my-url">Website URL</InputLabel>
      <StyleInput
        id="my-url"
        type="email"
        aria-describedby="my-helper-text"
        value={names}
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

MyUrl.propTypes = {
  form: PropTypes.objectOf(PropTypes.object).isRequired,
};

export default MyUrl;
