import React, { useRef } from 'react';
import { makeStyles } from '@material-ui/core/styles/index';

import MainContainer from '../../../common/box-container/main-container';
import SearchLeft from './search-left';
import ViewRight from './view-right';

import { balanceStyle } from './style';

const useStyle = makeStyles(balanceStyle);

const AccountBalance = () => {
  const classes = useStyle();
  const viewRef = useRef();

  return (
    <MainContainer className={classes.root}>
      <SearchLeft viewRef={viewRef} />
      <ViewRight ref={viewRef} />
    </MainContainer>
  );
};

export default AccountBalance;
