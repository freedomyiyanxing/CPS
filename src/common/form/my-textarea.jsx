import React from 'react';
import PropTypes from 'prop-types';
import FormControl from '@material-ui/core/FormControl';
import FormHelperText from '@material-ui/core/FormHelperText';

import MyInput from '../material-ui-component/input';
import MyLabel from '../material-ui-component/input-label';
import { formPrompt } from '../../asstes/data/prompt-text';

const MyTextarea = (props) => {
  const {
    form, value, noRequire, name, fontSize, outputName,
  } = props;

  const { getFieldProps, getFieldError } = form;
  const errors = getFieldError(outputName);
  return (
    <FormControl
      fullWidth
      error={errors}
      margin="normal"
    >
      <MyLabel fontSize={fontSize} htmlFor={`my-${name}`}>{name}</MyLabel>
      <MyInput
        multiline
        id={`my-${name}`}
        type="text"
        {...getFieldProps(outputName, {
          validateFirst: true,
          initialValue: value,
          rules: [
            {
              required: noRequire,
              message: formPrompt.textareaRequired,
            },
            {
              pattern: /^([A-Za-z0-9\s.\\,+()!?`={}'"<>/:#@$%&*-]{2,200})$/,
              message: formPrompt.textareaFormat,
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


MyTextarea.propTypes = {
  form: PropTypes.objectOf(PropTypes.object).isRequired,
  name: PropTypes.string,
  value: PropTypes.string,
  noRequire: PropTypes.bool,
  outputName: PropTypes.string,
  fontSize: PropTypes.string,
};

MyTextarea.defaultProps = {
  value: '',
  name: 'Discription of Your Website *',
  noRequire: true,
  fontSize: 'md',
  outputName: 'websiteDesc',
};


export default MyTextarea;
