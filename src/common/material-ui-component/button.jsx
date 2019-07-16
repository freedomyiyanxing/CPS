import React from 'react';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';

const styles = theme => ({
  root: {
    textTransform: 'capitalize',
    boxShadow: 'none',
  },
  loading: {
    backgroundColor: `${theme.palette.background.disabled} !important`,
  },
});

const useStyle = makeStyles(styles);

const MyButton = (props) => {
  const { className, loading } = props;
  const classes = useStyle();
  return (
    <Button
      {...props}
      className={`${classes.root} ${className} ${loading ? classes.loading : ''}`}
    />
  );
};

MyButton.propTypes = {
  className: PropTypes.string,
  loading: PropTypes.bool,
};

MyButton.defaultProps = {
  className: '',
  loading: false,
};

export default MyButton;
