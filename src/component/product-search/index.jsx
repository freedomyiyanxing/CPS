import React, { useEffect } from 'react';
import { makeStyles } from '@material-ui/core/styles';

import MainContainer from '../../common/box-container/main-container';
import Search from './utils/search';
import View from './utils/view';

import { promotions } from '../../../data/data';
import { get } from '../../asstes/http/index';

import { indexStyle } from './style';

const useStyle = makeStyles(indexStyle);

const ProductSearch = () => {
  const classes = useStyle();

  useEffect(() => {
    console.log(1);
    get('/api/promotions/all', {
      page: 1,
      size: 10,
    })
      .then((response) => {
        console.log(response);
      })
      .catch((err) => {
        console.log(err);
      });
  });

  return (
    <MainContainer className={classes.root}>
      <Search />
      <View data={promotions} />
    </MainContainer>
  );
};

export default ProductSearch;
