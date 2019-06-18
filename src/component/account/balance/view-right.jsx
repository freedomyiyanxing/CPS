import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles/index';

import { viewStyle } from './style';

@withStyles(viewStyle)
class ViewRight extends React.Component {
  render() {
    const { classes } = this.props;
    return (
      <div className={classes.root}>我是 right</div>
    );
  }
}

ViewRight.propTypes = {
  classes: PropTypes.objectOf(PropTypes.object).isRequired,
};

export default ViewRight;
