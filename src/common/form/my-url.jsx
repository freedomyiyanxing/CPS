import React from 'react';
import PropTypes from 'prop-types';
import FormControl from '@material-ui/core/FormControl';
import InputLabel from '@material-ui/core/InputLabel';
import FormHelperText from '@material-ui/core/FormHelperText';

import MyInput from '../material-ui-compoents/input';

const MyUrl = (props) => {
  const { form, value } = props;

  const { getFieldProps, getFieldError } = form;
  const errors = getFieldError('websiteUrl');
  return (
    <FormControl
      fullWidth
      required
      error={errors}
      margin="normal"
    >
      <InputLabel htmlFor="my-url">Website URL</InputLabel>
      <MyInput
        id="my-url"
        type="url"
        {...getFieldProps('websiteUrl', {
          validateFirst: true,
          initialValue: value,
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
  value: PropTypes.string,
};

MyUrl.defaultProps = {
  value: '',
};

export default MyUrl;
