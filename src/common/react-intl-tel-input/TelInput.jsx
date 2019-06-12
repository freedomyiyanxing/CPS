/* eslint-disable */

import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Input from '@material-ui/core/Input';
import { withStyles } from '@material-ui/core/styles';

import { telInputStyle } from './style';

@withStyles(telInputStyle)
class TelInput extends Component {
  static propTypes = {
    value: PropTypes.string,
    placeholder: PropTypes.string,
    handleInputChange: PropTypes.func,
    inputProps: PropTypes.object,
    classes: PropTypes.objectOf(PropTypes.object).isRequired,
  };

  render() {
    const { classes, value } = this.props;
    return (
      <Input
        {...this.props.inputProps}
        id="my-phone"
        type="tel"
        className={classes.root}
        value={value}
        placeholder={this.props.placeholder}
        onChange={this.props.handleInputChange}
        onBlur={this.props.onBlur}
      />
    );
  }
}

export default TelInput;
