import React from 'react';
// import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/core/styles';
import MyButton from '../../common/material-ui-compoents/button';

import MainContainer from '../../common/box-container/main-container';
import HomeHeader from './home-utils/home-header';
import HomeCurve from './home-utils/home-curve';

// eslint-disable-next-line no-unused-vars
import { accountData, statisticsTbs, daily } from '../../../data/data';
import { homeStyle } from './style';

const useStyles = makeStyles(homeStyle);


const Home = () => {
  const classes = useStyles();
  return (
    <MainContainer margin={[44, 0, 40]}>
      <HomeHeader data={accountData} />
      <HomeCurve data={[statisticsTbs, daily]} />
      <div className={classes.root}>
        <div className={classes.wrapper}>登陆的首页1</div>
        <div>
          <MyButton>text</MyButton>
        </div>
      </div>
    </MainContainer>
  );
};

export default Home;
