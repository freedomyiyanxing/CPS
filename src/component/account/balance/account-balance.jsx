import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles/index';

import MainContainer from '../../../common/box-container/main-container';
import SearchLeft from './search-left';
import ViewRight from './view-right';

import { balanceStyle } from './style';

@withStyles(balanceStyle)
class AccountBalance extends React.Component {
  render() {
    const { classes } = this.props;
    return (
      <MainContainer margin={[30, 0, 70]}>
        <div className={classes.root}>
          <SearchLeft />
          <ViewRight />
        </div>
      </MainContainer>
    );
  }
}

AccountBalance.propTypes = {
  classes: PropTypes.objectOf(PropTypes.object).isRequired,
};

export default AccountBalance;
