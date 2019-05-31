import React from 'react';
// import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';

import { style1 } from './style';

const useStyles = makeStyles(style1);

const Home = () => {
  const classes = useStyles();
  return (
    <div className={classes.root}>
      <div className={classes.wrapper}>哈哈啊</div>
      <div>
        <Button variant="contained" color="primary">text</Button>
      </div>
    </div>
  );
};

export default Home;
