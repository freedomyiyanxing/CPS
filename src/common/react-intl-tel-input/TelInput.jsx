import React from 'react';
import PropTypes from 'prop-types';
import Input from '@material-ui/core/Input';
import { makeStyles } from '@material-ui/core/styles';

import { telInputStyle } from './style';

const useStyle = makeStyles(telInputStyle);

const TelInput = (props) => {
  const {
    value, placeholder, handleInputChange,
  } = props;
  const classes = useStyle();

  return (
    <Input
      id="my-phone"
      type="tel"
      className={classes.root}
      value={value}
      placeholder={placeholder}
      onChange={handleInputChange}
    />
  );
};

TelInput.propTypes = {
  value: PropTypes.string.isRequired,
  placeholder: PropTypes.string.isRequired,
  handleInputChange: PropTypes.func.isRequired,
};


export default TelInput;