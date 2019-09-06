import React from 'react';
import InputContainer from '../box-container/form-container';
import MainContainer from '../box-container/main-container';
import { SkeletonHtml } from './index';

export const NotCodeLoading = () => (
  <InputContainer title="">
    <SkeletonHtml rows={3} />
  </InputContainer>
);

export const CodeLoading = () => (
  <MainContainer margin={30}>
    <SkeletonHtml />
  </MainContainer>
);
