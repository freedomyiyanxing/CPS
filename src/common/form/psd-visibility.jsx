import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/core/styles';
import Visibility from '@material-ui/icons/Visibility';
import VisibilityOff from '@material-ui/icons/VisibilityOff';
import InputAdornment from '@material-ui/core/InputAdornment';
import IconButton from '@material-ui/core/IconButton';

import { psdVisibilityStyle } from './style';

const useStyle = makeStyles(psdVisibilityStyle);

const PsdVisibility = (props) => {
  const { handleClick } = props;
  const [showPassword, setShowPassword] = useState(false);

  const classes = useStyle();

  const handleClickShowPassword = () => {
    setShowPassword(!showPassword);
    handleClick(!showPassword);
  };

  return (
    <InputAdornment
      position="end"
    >
      <IconButton
        aria-label="Toggle password visibility"
        onClick={handleClickShowPassword}
      >
        {
          showPassword
            ? <Visibility className={classes.icon} />
            : <VisibilityOff className={classes.icon} />
        }
      </IconButton>
    </InputAdornment>
  );
};

PsdVisibility.propTypes = {
  handleClick: PropTypes.func.isRequired,
};

export default PsdVisibility;
