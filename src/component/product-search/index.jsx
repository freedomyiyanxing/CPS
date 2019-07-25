import React, { useRef } from 'react';
import { makeStyles } from '@material-ui/core/styles';

import MainContainer from '../../common/box-container/main-container';
import Search from '../../common/product/search';
import View from './utils/view';

import { indexStyle } from './style';

const useStyle = makeStyles(indexStyle);

const ProductSearch = () => {
  const classes = useStyle();
  const viewRef = useRef();

  return (
    <MainContainer className={classes.root}>
      <Search viewRef={viewRef} />
      <View ref={viewRef} />
    </MainContainer>
  );
};

export default ProductSearch;
