/* eslint-disable */
import React from 'react';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/core/styles';

import HomeSkeleton from './home-skeleton';
import ProductSkeleton from './product-skeleton';
import MyProductSkeleton from './my-product-skeleton';
import BalanceSkeleton from './balance-skeleton';
import BasicSkeleton from './basic-skeleton'


const useStyle = makeStyles(() => ({
  root: {
    width: '100%',
    display: 'flex',
    flexDirection: 'column',
  },
  items: {
    width: '100%',
    marginTop: 20,
    height: 50,
    background: '#dadada', // theme.palette.primary[50],
  },
}));

export const SkeletonHtml = ({ rows }) => {
  const classes = useStyle();
  return (
    <div className={classes.root}>
      {
        Array.from({ length: rows }, (v, k) => k).map(v => (
          <span
            key={v}
            className={`${classes.items} show-loading-animation`}
          />
        ))
      }
    </div>
  );
};

SkeletonHtml.propTypes = {
  rows: PropTypes.number,
};

SkeletonHtml.defaultProps = {
  rows: 8,
};

const obj = {
  'home': HomeSkeleton,
  'product': ProductSkeleton,
  'myproduct': MyProductSkeleton,
  'balance': BalanceSkeleton,
  'basic': BasicSkeleton,
};

const Skeleton = (props) => {
  const {
    loading, children, variant,
  } = props;
  const Comp = obj[variant];
  return (
    loading
      ? children
      : <Comp />
  );
};

Skeleton.propTypes = {
  children: PropTypes.node.isRequired,
  loading: PropTypes.bool.isRequired,
  variant: PropTypes.oneOf(['home', 'product', 'myproduct', 'balance', 'basic']).isRequired,
};

export default Skeleton;
