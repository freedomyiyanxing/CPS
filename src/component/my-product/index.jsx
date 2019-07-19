import React, { useRef } from 'react';
import { makeStyles } from '@material-ui/core/styles';

import MainContainer from '../../common/box-container/main-container';
import Search from '../../common/product/search';
import View from './utils/view';
import { myProductStatus } from '../../asstes/data/default-data';

import { indexStyle } from './style';

const useStyle = makeStyles(indexStyle);

const MyProducts = () => {
  const classes = useStyle();
  const viewRef = useRef();
  return (
    <MainContainer className={classes.root}>
      <Search viewRef={viewRef} statusArr={myProductStatus} />
      <View ref={viewRef} />
    </MainContainer>
  );
};

export default MyProducts;
