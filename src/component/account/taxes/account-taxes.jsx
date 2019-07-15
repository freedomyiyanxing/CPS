import React from 'react';
import { makeStyles } from '@material-ui/core/styles';

import MainContainer from '../../../common/box-container/main-container';
import Container from '../utils/container';

import { taxesStyle } from '../style';

const useStyle = makeStyles(taxesStyle);

const Taxes = () => {
  const classes = useStyle();
  console.log('Taxes');
  return (
    <MainContainer>
      <Container title="Basic Taxes">
        <div className={classes.root}>Taxes</div>
      </Container>
    </MainContainer>
  );
};

export default Taxes;
