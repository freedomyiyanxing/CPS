import React from 'react';
// import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/core/styles';
import MyButton from '../../common/button/button';

import { notHomeStyle } from './style';

const useStyles = makeStyles(notHomeStyle);

const NotHome = () => {
  const classes = useStyles();
  return (
    <div className={classes.root}>
      <div className={classes.wrapper}>未登陆</div>
      <div>
        <MyButton variant="contained" color="primary">text</MyButton>
      </div>
    </div>
  );
};

export default NotHome;
