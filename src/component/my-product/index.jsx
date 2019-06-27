import React from 'react';
import { makeStyles } from '@material-ui/core/styles';

import MainContainer from '../../common/box-container/main-container';
import Search from './utils/search';
import View from './utils/view';

import { myPromotions } from '../../../data/data';

import { indexStyle } from './style';

const useStyle = makeStyles(indexStyle);

const MyProducts = () => {
  const classes = useStyle();
  return (
    <MainContainer className={classes.root}>
      <Search />
      <View data={myPromotions} />
    </MainContainer>
  );
};

export default MyProducts;
