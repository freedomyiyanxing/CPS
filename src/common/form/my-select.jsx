import React from 'react';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/core/styles';
import FormControl from '@material-ui/core/FormControl';
import FormHelperText from '@material-ui/core/FormHelperText';
import MenuItem from '@material-ui/core/MenuItem';
import Select from '@material-ui/core/Select';

import MyLabel from '../material-ui-component/input-label';
import { formPrompt } from '../../asstes/data/prompt-text';

const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 5;

const styles = theme => ({
  root: {
    '&:before': {
      borderBottomColor: theme.palette.text.colorDdd,
    },
  },
  select: {
    lineHeight: '19px',
    paddingTop: 6,
    paddingBottom: 6,
  },
});

const useStyle = makeStyles(styles);

const MySelect = (props) => {
  const {
    form, selectArr, name, outputName, value, noRequire, fontSize, liLen,
  } = props;

  const classes = useStyle();

  const { getFieldProps, getFieldError } = form;
  const errors = getFieldError(outputName);
  return (
    <FormControl
      fullWidth
      required={noRequire}
      error={errors}
      margin="normal"
    >
      <MyLabel fontSize={fontSize}>{name}</MyLabel>
      <Select
        value={value}
        className={classes.root}
        classes={{
          select: classes.select,
        }}
        MenuProps={{
          PaperProps: {
            style: {
              maxHeight: ITEM_HEIGHT * liLen + ITEM_PADDING_TOP,
              width: 250,
            },
          },
        }}
        {...getFieldProps(outputName, {
          initialValue: value,
          rules: [
            {
              required: noRequire,
              message: formPrompt.selectRequired,
            },
          ],
        })}
      >
        <MenuItem value="">None</MenuItem>
        {
          selectArr.map(v => (
            <MenuItem key={v} value={v}>{v}</MenuItem>
          ))
        }
      </Select>
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
  liLen: PropTypes.number, // 控制子元素显示个数
};


MySelect.defaultProps = {
  value: '',
  noRequire: true,
  fontSize: 'md',
  liLen: 5.5,
};

export default MySelect;
