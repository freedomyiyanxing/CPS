import React from 'react';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/core/styles';
import Checkbox from '@material-ui/core/Checkbox';

import { CheckBox, CheckBoxOutlineBlank } from './svg-icon';

const useStyle = makeStyles(theme => ({
  checkRoot: {
    padding: 7,
    color: theme.palette.border.borderDD,
  },
  icon: {
    fontSize: theme.typography.h6.fontSize,
  },
}));


const MyCheckbox = (props) => {
  const { onChange, checked } = props;
  const classes = useStyle();

  return (
    <Checkbox
      value="checked"
      checked={checked}
      onChange={onChange}
      icon={<CheckBoxOutlineBlank className={classes.icon} />}
      color="primary"
      checkedIcon={<CheckBox className={classes.icon} />}
      classes={{
        root: classes.checkRoot,
      }}
    />
  );
};

MyCheckbox.propTypes = {
  onChange: PropTypes.func.isRequired,
  checked: PropTypes.bool,
};

MyCheckbox.defaultProps = {
  checked: false,
};

export default MyCheckbox;
