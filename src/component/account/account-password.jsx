import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';

import { passwordStyle } from './style';

@withStyles(passwordStyle)
class AccountPassword extends React.Component {
  render() {
    const { classes } = this.props;
    return (
      <div className={classes.root}>我是修改密码页面</div>
    );
  }
}

AccountPassword.propTypes = {
  classes: PropTypes.objectOf(PropTypes.object).isRequired,
};

export default AccountPassword;
