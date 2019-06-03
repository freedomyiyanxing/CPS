import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Tabs from '@material-ui/core/Tabs';

import tabsStyle from './style';

const StyledTabs = (props) => {
  const { classes } = props;
  return (
    <Tabs
      {...props}
      TabIndicatorProps={{ children: <div /> }}
      classes={{
        root: classes.root,
        indicator: classes.indicator,
      }}
    />
  );
};

StyledTabs.propTypes = {
  classes: PropTypes.objectOf(PropTypes.object).isRequired,
};

const StyledTab = withStyles(tabsStyle)(StyledTabs);

export default StyledTab;
