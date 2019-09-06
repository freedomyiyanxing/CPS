import React from 'react';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/core/styles';

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

const Skeleton = (props) => {
  const {
    rows, loading, children,
  } = props;
  return (
    loading
      ? <SkeletonHtml rows={rows} />
      : children
  );
};

Skeleton.propTypes = {
  children: PropTypes.node.isRequired,
  loading: PropTypes.bool.isRequired,
  rows: PropTypes.number,
};

Skeleton.defaultProps = {
  rows: 8,
};

export default Skeleton;
