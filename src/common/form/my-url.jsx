import React from 'react';
import PropTypes from 'prop-types';
import FormControl from '@material-ui/core/FormControl';
import InputLabel from '@material-ui/core/InputLabel';
import FormHelperText from '@material-ui/core/FormHelperText';

import MyInput from '../material-ui-component/input';
import { formPrompt } from '../../assets/data/prompt-text';

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
              message: formPrompt.urlRequired,
            },
            {
              type: 'url',
              message: formPrompt.urlFormat,
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
