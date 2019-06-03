import React from 'react';
// import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';

import { homeStyle } from './style';

const useStyles = makeStyles(homeStyle);

const Home = () => {
  const classes = useStyles();
  return (
    <div className={classes.root}>
      <div className={classes.wrapper}>登陆的首页1</div>
      <div>
        <Button variant="contained" color="primary">text</Button>
      </div>
    </div>
  );
};

export default Home;
