import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { balanceSkeleton } from './style';

const useStyle = makeStyles(balanceSkeleton);

const BalanceSkeleton = () => {
  const classes = useStyle();
  return (
    <div className={classes.center}>
      <div className={classes.centerHeader}>
        <span className={`${classes.centerItemData} show-loading-animation`} />
      </div>
      <div className={classes.form}>
        {
          Array.from({ length: 10 }, (v, k) => k).map(() => (
            <span className={`${classes.items} show-loading-animation`} />
          ))
        }
      </div>
    </div>
  );
};

export default BalanceSkeleton;
