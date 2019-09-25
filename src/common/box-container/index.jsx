import React from 'react';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/core/styles';

const useStyle = makeStyles({
  container: {
    flex: 1,
    width: '100%',
    display: 'flex',
  },
  marginTop: {
    marginTop: 80,
  },
});

const BoxContainer = (props) => {
  const { children, isMarginTop } = props;
  const classes = useStyle();
  return (
    <div className={`${classes.container} ${isMarginTop ? classes.marginTop : ''}`}>
      {children}
    </div>
  );
};

BoxContainer.propTypes = {
  children: PropTypes.node.isRequired,
  isMarginTop: PropTypes.bool,
};

BoxContainer.defaultProps = {
  isMarginTop: true,
};

export default BoxContainer;
