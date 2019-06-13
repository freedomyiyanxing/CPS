import React from 'react';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';

const styles = () => ({
  root: {
    textTransform: 'capitalize',
    boxShadow: 'none',
  },
});

const useStyle = makeStyles(styles);

const MyButton = (props) => {
  const { className } = props;
  const classes = useStyle();
  return (
    <Button {...props} className={`${classes.root} ${className}`} />
  );
};

MyButton.propTypes = {
  className: PropTypes.string,
};

MyButton.defaultProps = {
  className: '',
};

export default MyButton;
