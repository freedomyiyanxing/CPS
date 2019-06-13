import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';

import { balanceStyle } from './style';

@withStyles(balanceStyle)
class AccountBalance extends React.Component {
  render() {
    const { classes } = this.props;
    return (
      <div className={classes.root}>我是账单页面</div>
    );
  }
}

AccountBalance.propTypes = {
  classes: PropTypes.objectOf(PropTypes.object).isRequired,
};

export default AccountBalance;
