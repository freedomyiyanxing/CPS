import React, { useState } from 'react';
import PropTypes from 'prop-types';
import FormControl from '@material-ui/core/FormControl';
import FormHelperText from '@material-ui/core/FormHelperText';

import MyInput from '../material-ui-compoents/input';
import MyLabel from '../material-ui-compoents/input-label';


const MyTextarea = (props) => {
  const {
    form, value, noRequire, name, fontSize,
  } = props;
  const [names, setNames] = useState(value);

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
      {...getFieldProps('textarea', {
        validateFirst: true,
        initialValue: value,
        rules: [
          {
            required: noRequire,
            message: '我们需要 你网站的详细信息',
          },
          {
            pattern: /^([A-Za-z0-9\s.\\,+()!?`={}'"<>/:#@$%&*-]{2,200})$/,
            message: '我们需要有效的字符(A-Z a-z) 字数(2 - 200) 之间',
          },
        ],
      })}
    >
      <MyLabel fontSize={fontSize} htmlFor={`my-${name}`}>{name}</MyLabel>
      <MyInput
        multiline
        id={`my-${name}`}
        type="text"
        value={names}
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


MyTextarea.propTypes = {
  form: PropTypes.objectOf(PropTypes.object).isRequired,
  name: PropTypes.string,
  value: PropTypes.string,
  noRequire: PropTypes.bool,
  fontSize: PropTypes.string,
};

MyTextarea.defaultProps = {
  value: '',
  name: 'Discription of Your Website *',
  noRequire: true,
  fontSize: 'md',
};


export default MyTextarea;
