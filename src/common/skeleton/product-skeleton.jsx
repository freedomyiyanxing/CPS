import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { productSkeletonStyle } from './style';

const useStyle = makeStyles(productSkeletonStyle);

const ProductSkeleton = () => {
  const classes = useStyle();
  return (
    <>
      <div className={classes.content}>
        {
          Array.from({ length: 8 }, (v, k) => k).map(() => (
            <span className="show-loading-animation">
              <span>
                {
                  Array.from({ length: 4 }, (v, k) => k).map(() => (
                    <span />
                  ))
                }
              </span>
            </span>
          ))
        }
      </div>
    </>
  );
};

export default ProductSkeleton;
