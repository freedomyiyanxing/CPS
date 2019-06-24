import React from 'react';
import { makeStyles } from '@material-ui/core/styles';

import MainContainer from '../../common/box-container/main-container';
import Search from './utils/search';

import { indexStyle } from './style';

const useStyle = makeStyles(indexStyle);

const ProductSearch = () => {
  const classes = useStyle();
  return (
    <MainContainer className={classes.root}>
      <Search />
      hahaha
    </MainContainer>
  );
};

export default ProductSearch;
