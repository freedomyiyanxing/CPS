import React from 'react';
import PropTypes from 'prop-types';
import FormControl from '@material-ui/core/FormControl';
import FormHelperText from '@material-ui/core/FormHelperText';

import MyInput from '../material-ui-component/input';
import MyLabel from '../material-ui-component/input-label';
import { formPrompt } from '../../asstes/data/prompt-text';

const Name = (props) => {
  const {
    value, form, name, disabled, noRequire, fontSize, outputName,
  } = props;
  const { getFieldProps, getFieldError } = form;
  const errors = getFieldError(outputName);
  return (
    <FormControl
      fullWidth
      required={noRequire && !disabled} // 如果是必填 则是否是 disabled 状态
      disabled={disabled}
      error={errors}
      margin="normal"
    >
      <MyLabel fontSize={fontSize} htmlFor={`my-${name}`}>{name}</MyLabel>
      <MyInput
        id={`my-${name}`}
        type="text"
        {...getFieldProps(outputName, {
          validateFirst: true,
          hidden: disabled, // 是否忽略当前字段的验证
          initialValue: value, // 设置默认值 (保证在有默认值的情况 验证会通过)
          rules: [
            {
              required: noRequire,
              message: formPrompt.nameRequired,
            },
            {
              pattern: /^([A-Za-z\s.-]{2,30})$/,
              message: formPrompt.nameRequired,
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

Name.propTypes = {
  form: PropTypes.objectOf(PropTypes.object).isRequired,
  name: PropTypes.string.isRequired, // label名称 以及输出字段名称
  value: PropTypes.string, // 默认值
  disabled: PropTypes.bool, // 是的禁用
  noRequire: PropTypes.bool, // 是否必填
  fontSize: PropTypes.string, // 控制label文字
  outputName: PropTypes.string, // 输出key值
};

Name.defaultProps = {
  value: '',
  disabled: false, // 默认不禁用
  noRequire: true, // 默认必填
  fontSize: 'md',
  outputName: 'name', // 输出key值
};

export default Name;
