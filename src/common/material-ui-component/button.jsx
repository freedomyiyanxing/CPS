import React from 'react';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import CircularProgress from '@material-ui/core/CircularProgress';

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
  const {
    className, loading, children, loadingSize,
  } = props;
  const classes = useStyle();
  return (
    <Button
      {...props}
      className={`${classes.root} ${className} ${loading ? classes.loading : ''}`}
    >
      {
        loading
          ? <CircularProgress size={loadingSize} />
          : children
      }
    </Button>
  );
};

MyButton.propTypes = {
  className: PropTypes.string,
  loading: PropTypes.bool,
  children: PropTypes.node.isRequired,
  loadingSize: PropTypes.number,
};

MyButton.defaultProps = {
  className: '',
  loading: false,
  loadingSize: 24,
};

export default MyButton;
