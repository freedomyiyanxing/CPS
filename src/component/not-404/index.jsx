/* eslint-disable */
import React from 'react';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/core/styles';
import { Link as RouterLink } from 'react-router-dom';

import MyButton from '../../common/material-ui-component/button';
import NotLoginHeaders from '../header/not-login-header/header';
import MainContainer from '../../common/box-container/main-container';
import BoxContainer from '../../common/box-container/index';

const useStyles = makeStyles(theme => ({
  root: {
    minHeight: 500,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-evenly',
    flexDirection: 'column',
    background: theme.palette.primary[50],
    border: `1px solid ${theme.palette.border.borderEf}`,
    borderTop: `6px solid ${theme.palette.primary.A400}`,
    color: theme.palette.text.primary,
  },
  h2: {
    fontSize: theme.typography.h2.fontSize,
  },
  text: {
    fontSize: theme.typography.body2.fontSize,
  },
  btn: {
    padding: [[14, 25]],
    fontSize: theme.typography.body2.fontSize,
  },
}));

const text = 'Oops! Looks like the page you\'re trying to reach is temporarily unavailable or the page might have been moved, deleted or no longer exist.';

const Content = () => {
  const classes = useStyles();
  return (
    <MainContainer>
      <div
        className={classes.root}
      >
        <h2 className={classes.h2}>THIS PAGE CANNOT BE FOUND</h2>
        <p className={classes.text}>{text}</p>
        <MyButton
          variant="contained"
          color="primary"
          className={classes.btn}
          component={RouterLink}
          to="/i/index"
        >
          Return Home
        </MyButton>
      </div>
    </MainContainer>
  );
};

export const Not404 = () => {
  return (
    <Content />
  );
};


const Lost = () => {
  return (
    <>
      <NotLoginHeaders />
      <BoxContainer>
        <Content />
      </BoxContainer>
    </>
  );
};

Lost.propTypes = {
  history: PropTypes.objectOf(PropTypes.object).isRequired,
};

export default Lost;
