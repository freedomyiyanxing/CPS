import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/core/styles';
import InputAdornment from '@material-ui/core/InputAdornment';
import IconButton from '@material-ui/core/IconButton';

import {
  MySvgIconVisibility,
  MySvgIconVisibilityOff,
} from '../material-ui-component/svg-icon';
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
            ? <MySvgIconVisibility className={classes.icon} />
            : <MySvgIconVisibilityOff className={classes.icon} />
        }
      </IconButton>
    </InputAdornment>
  );
};

PsdVisibility.propTypes = {
  handleClick: PropTypes.func.isRequired,
};

export default PsdVisibility;
