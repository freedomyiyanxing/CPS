import React from 'react';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/core/styles';

const useStyle = makeStyles(() => ({
  container: {
    flex: 1,
    width: '100%',
    display: 'flex',
  },
}));

const BoxContainer = (props) => {
  const { children, marginTop } = props;
  const classes = useStyle();
  return (
    <div className={classes.container} style={{ marginTop }}>
      {children}
    </div>
  );
};

BoxContainer.propTypes = {
  children: PropTypes.node.isRequired,
  marginTop: PropTypes.number.isRequired,
};

export default BoxContainer;
