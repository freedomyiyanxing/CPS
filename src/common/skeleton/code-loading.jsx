import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import InputContainer from '../box-container/form-container';
import MainContainer from '../box-container/main-container';

const useStyle = makeStyles(() => ({
  root: {
    minHeight: 300,
  },
}));

export const NotCodeLoading = () => {
  const classes = useStyle();
  return (
    <InputContainer title="">
      <div className={classes.root} />
    </InputContainer>
  );
};

export const CodeLoading = () => {
  const classes = useStyle();
  return (
    <MainContainer margin={[40, 0]}>
      <div className={classes.root} />
    </MainContainer>
  );
};
