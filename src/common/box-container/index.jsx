import React from 'react';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/core/styles';

// eslint-disable-next-line no-unused-vars
const useStyle = makeStyles(theme => ({
  container: {
    flex: 1,
    width: '100%',
    display: 'flex',
    // background: theme.palette.primary[100],
  },
  // root: {
  //   maxWidth: 1370,
  //   minWidth: 1100,
  //   margin: [[0, 'auto']],
  // },
}));

const BoxContainer = (props) => {
  const { children } = props;
  const classes = useStyle();
  return (
    <div className={classes.container}>
      {children}
    </div>
  );
};

BoxContainer.propTypes = {
  children: PropTypes.node.isRequired,
};

export default BoxContainer;
