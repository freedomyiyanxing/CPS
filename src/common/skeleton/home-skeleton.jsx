import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { homeSkeletonStyle } from './style';

const useStyle = makeStyles(homeSkeletonStyle);

const HomeSkeleton = () => {
  const classes = useStyle();
  return (
    <>
      <div className={classes.header}>
        <span className={`${classes.headerIcon} show-loading-animation`} />
        <span className={`${classes.headerItems} show-loading-animation`} />
        <span className={`${classes.headerItems} show-loading-animation`} />
        <span className={`${classes.headerItems} show-loading-animation`} />
      </div>
      <div className={classes.center}>
        <div className={classes.centerHeader}>
          <span className={`${classes.centerItemData} show-loading-animation`} />
        </div>
        <div className={classes.centerTab}>
          {
            Array.from({ length: 6 }, (v, k) => k).map(() => (
              <span className={`${classes.centerTabItem} show-loading-animation`} />
            ))
          }
        </div>
        <div className={classes.centerGraphics}>
          {
            Array.from({ length: 21 }, (v, k) => k).map((v, i, arr) => (
              <span
                className="show-loading-animation"
                data-da={i}
                style={{ height: `${i < 10 ? (i * 22) : ((arr.length - i - 1) * 22)}px` }}
              />
            ))
          }
        </div>
      </div>
      <div className={classes.center}>
        <div className={classes.centerHeader}>
          <span className={`${classes.centerItemData} show-loading-animation`} />
        </div>
        <div className={classes.form}>
          {
            Array.from({ length: 6 }, (v, k) => k).map(() => (
              <span className={`${classes.items} show-loading-animation`} />
            ))
          }
        </div>
      </div>
    </>
  );
};

export default HomeSkeleton;
