import React from 'react';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/core/styles';

const PartitionLine = (props) => {
  const { color, margin, width } = props;
  const useStyle = makeStyles(theme => ({
    root: {
      display: 'block',
      width,
      height: 12,
      margin,
      background: theme.palette.border[color],
    },
  }));
  const classes = useStyle();
  return <span className={classes.root} />;
};

PartitionLine.propTypes = {
  margin: PropTypes.objectOf(PropTypes.array),
  width: PropTypes.number,
  color: PropTypes.string,
};

PartitionLine.defaultProps = {
  margin: [[0, 20]],
  width: 2,
  color: 'border66',
};

export default PartitionLine;
