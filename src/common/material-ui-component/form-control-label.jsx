import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/core/styles';
import FormControlLabel from '@material-ui/core/FormControlLabel';

import MyCheckbox from './checkbox';

const useStyle = makeStyles(theme => ({
  label: {
    color: theme.palette.text.secondary,
    fontSize: theme.typography.fontSizeSm,
    fontFamily: theme.typography.fontFamily,
    letterSpacing: 0,
  },
  labelRoot: {
    marginLeft: -7,
  },
}));

const MyFormControlLabel = (props) => {
  const { onChange } = props;
  const [check, setCheck] = useState(false);
  const classes = useStyle();

  const handleChange = () => {
    setCheck(!check);
    onChange(!check);
  };

  return (
    <FormControlLabel
      {...props}
      classes={{ root: classes.labelRoot, label: classes.label }}
      control={<MyCheckbox checked={check} onChange={handleChange} />}
    />
  );
};

MyFormControlLabel.propTypes = {
  onChange: PropTypes.func.isRequired,
};

export default MyFormControlLabel;
