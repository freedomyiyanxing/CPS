import React from 'react';
// import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';

import { notHomeStyle } from './style';

const useStyles = makeStyles(notHomeStyle);

const NotHome = () => {
  const classes = useStyles();
  return (
    <div className={classes.root}>
      <div className={classes.wrapper}>未登陆</div>
      <div>
        <Button variant="contained" color="primary">text</Button>
      </div>
    </div>
  );
};

export default NotHome;
