import React from 'react';
// import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/core/styles';
import MyButton from '../../common/button/button';

import { homeStyle } from './style';

const useStyles = makeStyles(homeStyle);

const Home = () => {
  const classes = useStyles();
  return (
    <div className={classes.root}>
      <div className={classes.wrapper}>登陆的首页1</div>
      <div>
        <MyButton variant="contained" color="primary">text</MyButton>
      </div>
    </div>
  );
};

export default Home;
