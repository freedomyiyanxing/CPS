import React from 'react';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/core/styles';
import FormControl from '@material-ui/core/FormControl';
import MenuItem from '@material-ui/core/MenuItem';
import Select from '@material-ui/core/Select';

import MyLabel from '../material-ui-component/input-label';

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

const ToggleSelect = (props) => {
  const {
    selectArr, name, value, handleChange, disabled,
  } = props;
  const classes = useStyle();

  const handleFun = (e) => {
    handleChange(e.target.value);
  };
  return (
    <FormControl
      fullWidth
      margin="normal"
    >
      <MyLabel fontSize="md">{name}</MyLabel>
      <Select
        disabled={disabled}
        value={value}
        className={classes.root}
        classes={{
          select: classes.select,
        }}
        onChange={handleFun}
      >
        {
          selectArr.map(v => (
            <MenuItem key={v} value={v}>{v}</MenuItem>
          ))
        }
      </Select>
    </FormControl>
  );
};

ToggleSelect.propTypes = {
  selectArr: PropTypes.objectOf(PropTypes.array).isRequired,
  handleChange: PropTypes.func.isRequired,
  name: PropTypes.string.isRequired, // label名称
  value: PropTypes.string, // 默认值
  disabled: PropTypes.bool,
};


ToggleSelect.defaultProps = {
  value: '',
  disabled: false,
};

export default ToggleSelect;
