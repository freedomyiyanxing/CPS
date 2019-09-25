import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { myProductSkeleton } from './style';

const useStyle = makeStyles(myProductSkeleton);

const MyProductSkeleton = () => {
  const classes = useStyle();
  return (
    <div className={classes.container}>
      <div className={classes.header}>
        <span className="show-loading-animation" />
        <span className="show-loading-animation" />
      </div>
      <div className={classes.content}>
        {
          Array.from({ length: 4 }, (v, k) => k).map(() => (
            <span className="show-loading-animation">
              <span className={`${classes.icon} show-loading-animation`} />
              <span className={`${classes.item} show-loading-animation`}>
                <span />
              </span>
            </span>
          ))
        }
      </div>
    </div>
  );
};

export default MyProductSkeleton;
