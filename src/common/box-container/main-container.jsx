import React from 'react';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/core/styles';

const useStyle = makeStyles(theme => ({
  main: {
    width: '100%',
    background: theme.palette.primary[100],
  },
  root: props => ({
    maxWidth: 1370,
    minWidth: 1100,
    margin: [[0, 'auto']],
    padding: [[props.margin, 0]],
  }),
}));

const MainContainer = (props) => {
  const { children, margin, className } = props;
  const styles = {
    margin,
  };
  const classes = useStyle(styles);
  return (
    <div className={classes.main}>
      <div className={`${classes.root} ${className || ''}`}>
        {children}
      </div>
    </div>
  );
};

MainContainer.propTypes = {
  children: PropTypes.node.isRequired,
  margin: PropTypes.number,
  className: PropTypes.string,
};

MainContainer.defaultProps = {
  margin: 30,
  className: null,
};

export default MainContainer;
