import React from 'react';
import { makeStyles } from '@material-ui/core/styles';

import MainContainer from '../../common/box-container/main-container';

const useStyle = makeStyles(() => ({
  root: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 100,
  },
}));

const WaitIndex = () => {
  const classes = useStyle();
  return (
    <MainContainer margin={[0]}>
      <div className={classes.root}>
        <img
          src="https://cdn.influmonsters.com/fit-in/1370x750/filters:fill(fff)/upload/image/platform/desktop/2019/03/13/7ecc48ee-6335-463f-b63b-ad21e243685e.jpg"
          alt="influmonsters"
        />
      </div>
    </MainContainer>
  );
};

export default WaitIndex;
