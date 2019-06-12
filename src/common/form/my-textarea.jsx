import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/core/styles';
import FormControl from '@material-ui/core/FormControl';
import TextField from '@material-ui/core/TextField';
import FormHelperText from '@material-ui/core/FormHelperText';

import { myTextareaStyle } from './style';

const useStyle = makeStyles(myTextareaStyle);

const MyTextarea = (props) => {
  const { form } = props;
  const [names, setNames] = useState('');
  const classes = useStyle();

  const handleChange = (e) => {
    setNames(e.target.value);
  };

  const { getFieldProps, getFieldError } = form;

  const errors = getFieldError('textarea');

  return (
    <FormControl
      fullWidth
      error={errors}
      margin="normal"
    >
      <TextField
        multiline
        label="Discription of Your Website"
        id="mui-theme-provider-standard-input"
        value={names}
        error={errors}
        InputProps={{
          className: classes.root,
        }}
        onChange={handleChange}
        {...getFieldProps('textarea', {
          validateFirst: true,
          rules: [
            {
              required: true,
              message: '我们需要 你网站的详细信息',
            },
            {
              pattern: /^([A-Za-z0-9\s.\\,+()!?`={}'"<>/:#@$%&*-]{2,200})$/,
              message: '我们需要有效的字符(A-Z a-z) 字数(2 - 200) 之间',
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
};

export default MyTextarea;
