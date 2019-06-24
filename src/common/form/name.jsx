import React, { useState } from 'react';
import PropTypes from 'prop-types';
import FormControl from '@material-ui/core/FormControl';
import InputLabel from '@material-ui/core/InputLabel';
import FormHelperText from '@material-ui/core/FormHelperText';

import MyInput from '../material-ui-compoents/input';

const Name = (props) => {
  const {
    value, form, name, disabled, noRequire,
  } = props;
  const [names, setNames] = useState(value);

  const outputName = name.replace(/\s/g, '');

  const handleChange = (e) => {
    setNames(e.target.value);
  };

  const { getFieldProps, getFieldError } = form;
  const errors = getFieldError(outputName);
  return (
    <FormControl
      fullWidth
      required={noRequire && !disabled} // 如果是必填 则是否是 disabled 状态
      disabled={disabled}
      error={errors}
      margin="normal"
      {...getFieldProps(outputName, {
        validateFirst: true,
        hidden: disabled, // 是否忽略当前字段的验证
        initialValue: names, // 设置默认值 (保证在有默认值的情况 验证会通过)
        rules: [
          {
            required: noRequire,
            message: '我们需要你的名字',
          },
          {
            pattern: /^([A-Za-z\s.-]{2,30})$/,
            message: '我们需要有效的字符(A-Z a-z) 特殊字符只限(. -) 字数(2 - 30) 之间',
          },
        ],
      })}
    >
      <InputLabel htmlFor={`my-${name}`}>{name}</InputLabel>
      <MyInput
        id={`my-${name}`}
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

Name.propTypes = {
  form: PropTypes.objectOf(PropTypes.object).isRequired,
  name: PropTypes.string.isRequired, // label名称 以及输出字段名称
  value: PropTypes.string, // 默认值
  disabled: PropTypes.bool, // 是的禁用
  noRequire: PropTypes.bool, // 是否必填
};

Name.defaultProps = {
  value: '',
  disabled: false, // 默认不禁用
  noRequire: true, // 默认必填
};

export default Name;
