import React from 'react';
// import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/core/styles';

import MainContainer from '../../common/box-container/main-container';
import MyButton from '../../common/material-ui-component/button';

import { notHomeStyle } from './style';

const useStyles = makeStyles(notHomeStyle);

const NotHome = () => {
  const classes = useStyles();
  return (
    <MainContainer margin={[]}>
      <div className={classes.root}>
        <div className={classes.wrapper}>未登陆</div>
        <div>
          <MyButton variant="contained" color="primary">text</MyButton>
        </div>
      </div>
    </MainContainer>
  );
};

export default NotHome;
