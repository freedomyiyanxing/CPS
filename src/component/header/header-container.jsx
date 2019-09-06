import React from 'react';
import PropTypes from 'prop-types';
import AppBar from '@material-ui/core/AppBar';
import { makeStyles } from '@material-ui/core/styles';

import { containerStyle } from './style';

const useStyles = makeStyles(containerStyle);

const HeaderContainer = (props) => {
  const { children } = props;
  const classes = useStyles();
  return (
    <AppBar className={classes.root}>
      <div className={classes.wrapper}>
        {children}
      </div>
    </AppBar>
  );
};

HeaderContainer.propTypes = {
  children: PropTypes.node.isRequired,
};

export default HeaderContainer;
