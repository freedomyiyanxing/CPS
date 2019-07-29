import React from 'react';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/core/styles';
import MyButton from '../../common/material-ui-component/button';
import HeaderNotLogin from '../header/header-not-login';
import MainContainer from '../../common/box-container/main-container';

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
    fontSize: theme.typography.fontSizeMd,
  },
  btn: {
    padding: [[12, 15]],
    fontSize: theme.typography.fontSizeMd,
    '&:first-child': {
      marginRight: 20,
    },
  },
}));

const text = 'Oops! Looks like the page you\'re trying to reach is temporarily unavailable or the page might have been moved, deleted or no longer exist.';

const Not404 = (props) => {
  const { location, history } = props;
  const classes = useStyles();
  const isLogin = location.pathname.split('/').length <= 2;
  return (
    <>
      {
        isLogin ? <HeaderNotLogin history={history} /> : null
      }
      <MainContainer>
        <div
          className={classes.root}
        >
          <h2 className={classes.h2}>THIS PAGE CANNOT BE FOUND</h2>
          <p className={classes.text}>{text}</p>
          <div>
            <MyButton
              variant="contained"
              color="primary"
              className={classes.btn}
              onClick={() => history.push(isLogin ? '/s/index' : '/my/index')}
            >
              Return Home
            </MyButton>
            <MyButton
              variant="contained"
              color="primary"
              className={classes.btn}
              onClick={() => history.goBack()}
            >
              Return Home
            </MyButton>
          </div>
        </div>
      </MainContainer>
    </>
  );
};

Not404.propTypes = {
  history: PropTypes.objectOf(PropTypes.object).isRequired,
  location: PropTypes.objectOf(PropTypes.object).isRequired,
};

export default Not404;
