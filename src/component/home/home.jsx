import React from 'react';

import MainContainer from '../../common/box-container/main-container';
import HomeHeader from './home-utils/home-header';
import HomeCurve from './home-utils/home-curve';
import HomeDetail from './home-utils/home-detail';

import {
  accountData, statisticsTbs, daily, details,
} from '../../../data/data';

const Home = () => (
  <MainContainer margin={[44, 0, 40]}>
    <HomeHeader data={accountData} />
    <HomeCurve data={[statisticsTbs, daily]} />
    <HomeDetail data={details} />
  </MainContainer>
);

export default Home;
