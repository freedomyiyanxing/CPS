import React from 'react';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/core/styles';

const useStyle = makeStyles({
  container: props => ({
    flex: 1,
    width: '100%',
    display: 'flex',
    marginTop: props.marginTop,
  }),
});

const BoxContainer = (props) => {
  const { children, marginTop } = props;
  const styles = {
    marginTop,
  };
  const classes = useStyle(styles);
  return (
    <div className={classes.container}>
      {children}
    </div>
  );
};

BoxContainer.propTypes = {
  children: PropTypes.node.isRequired,
  marginTop: PropTypes.number.isRequired,
};

export default BoxContainer;
