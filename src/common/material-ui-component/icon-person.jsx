import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Person from '@material-ui/icons/Person';

@withStyles(theme => ({
  icon: {
    fontSize: theme.typography.h2.fontSize,
    color: theme.palette.primary.contrastText,
  },
}))
class MyPerson extends React.Component {
  render() {
    const { classes } = this.props;
    return <Person {...this.props} className={classes.icon} />;
  }
}

MyPerson.propTypes = {
  classes: PropTypes.objectOf(PropTypes.object).isRequired,
};

export default MyPerson;
