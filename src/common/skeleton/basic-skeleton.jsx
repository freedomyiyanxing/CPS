import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { basicSkeleton } from './style';

const useStyle = makeStyles(basicSkeleton);

const BasicSkeleton = () => {
  const classes = useStyle();
  return (
    <div className={classes.center}>
      {
        Array.from({ length: 7 }, (v, k) => k).map(() => (
          <span className={`${classes.items} show-loading-animation`} />
        ))
      }
    </div>
  );
};

export default BasicSkeleton;
