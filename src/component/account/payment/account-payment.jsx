import React from 'react';
import { makeStyles } from '@material-ui/core/styles';

import MainContainer from '../../../common/box-container/main-container';
import Container from '../utils/container';

import { paymentStyle } from '../style';

const useStyle = makeStyles(paymentStyle);

const Payment = () => {
  const classes = useStyle();
  console.log('Payment');
  return (
    <MainContainer>
      <Container title="Basic Payment">
        <div className={classes.root}>Payment</div>
      </Container>
    </MainContainer>
  );
};

export default Payment;
