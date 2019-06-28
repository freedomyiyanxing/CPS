import React, { useState } from 'react';
import PropTypes from 'prop-types';
import FormControl from '@material-ui/core/FormControl';
import FormHelperText from '@material-ui/core/FormHelperText';
import MenuItem from '@material-ui/core/MenuItem';

import MySelects from '../material-ui-compoents/select';
import MyLabel from '../material-ui-compoents/input-label';

const MySelect = (props) => {
  const {
    form, selectArr, name, outputName, value, noRequire, fontSize,
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
      <MyLabel fontSize={fontSize} htmlFor="my-url">{name}</MyLabel>
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
  fontSize: PropTypes.string, // 控制label文字
};


MySelect.defaultProps = {
  value: '',
  noRequire: true,
  fontSize: 'md',
};

export default MySelect;
