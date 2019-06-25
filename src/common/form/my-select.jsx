import React, { useState } from 'react';
import PropTypes from 'prop-types';
import FormControl from '@material-ui/core/FormControl';
import InputLabel from '@material-ui/core/InputLabel';
import FormHelperText from '@material-ui/core/FormHelperText';
import MenuItem from '@material-ui/core/MenuItem';

import MySelects from '../material-ui-compoents/select';

const MySelect = (props) => {
  const {
    form, selectArr, name, outputName, value, noRequire,
  } = props;
  const [names, setNames] = useState(value);

  const handleChange = (e) => {
    setNames(e.target.value);
  };

  const { getFieldProps, getFieldError } = form;
  const errors = getFieldError(outputName);
  return (
    <FormControl
      fullWidth
      required={noRequire}
      error={errors}
      margin="normal"
    >
      <InputLabel htmlFor="my-url">{name}</InputLabel>
      <MySelects
        value={names}
        onChange={handleChange}
        name="value"
        {...getFieldProps(outputName, {
          validateFirst: true,
          initialValue: value,
          rules: [
            {
              required: noRequire,
              message: '我们需要 你选择类别',
            },
          ],
        })}
      >
        {
          !noRequire // 非必填时 给一个空选项
            ? <MenuItem value="">None</MenuItem>
            : null
        }
        {
          selectArr.map(v => (
            <MenuItem key={v} value={v}>{v}</MenuItem>
          ))
        }
      </MySelects>
      {
        errors
          ? <FormHelperText>{errors.join(',')}</FormHelperText>
          : null
      }
    </FormControl>
  );
};

MySelect.propTypes = {
  form: PropTypes.objectOf(PropTypes.object).isRequired,
  selectArr: PropTypes.objectOf(PropTypes.array).isRequired,
  name: PropTypes.string.isRequired, // label名称
  outputName: PropTypes.string.isRequired, // 输出字段名称
  value: PropTypes.string, // 默认值
  noRequire: PropTypes.bool, // 是否必填
};


MySelect.defaultProps = {
  value: '',
  noRequire: true,
};

export default MySelect;