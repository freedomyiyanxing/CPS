import React from 'react';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/core/styles';

import { containerStyle } from './style';

const useStyles = makeStyles(containerStyle);

const HeaderContainer = (props) => {
  const { children } = props;
  const classes = useStyles();
  return (
    <div className={classes.root}>
      <div className={classes.wrapper}>
        {children}
      </div>
    </div>
  );
};

HeaderContainer.propTypes = {
  children: PropTypes.node.isRequired,
};

export default HeaderContainer;
