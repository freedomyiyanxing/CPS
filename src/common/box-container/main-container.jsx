import React from 'react';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/core/styles';

const useStyle = makeStyles(theme => ({
  main: {
    width: '100%',
    background: theme.palette.primary[100],
  },
  root: {
    maxWidth: 1370,
    minWidth: 1100,
    margin: [[0, 'auto']],
  },
  // wrapper: {
  //   background: theme.palette.primary[50],
  // },
}));

const MainContainer = (props) => {
  const { children, margin } = props;
  const classes = useStyle();
  const styles = {
    margin: `${margin.join('px ')}px`,
  };
  return (
    <div className={classes.main}>
      <div className={classes.root}>
        <div style={styles}>
          {children}
        </div>
      </div>
    </div>
  );
};

MainContainer.propTypes = {
  children: PropTypes.node.isRequired,
  margin: PropTypes.objectOf(PropTypes.array),
};

MainContainer.defaultProps = {
  margin: [30, 0],
};

export default MainContainer;
