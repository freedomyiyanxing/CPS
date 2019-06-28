import React from 'react';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/core/styles';
import CheckCircleIcon from '@material-ui/icons/CheckCircle';
import ErrorIcon from '@material-ui/icons/Error';
import InfoIcon from '@material-ui/icons/Info';
import SnackbarContent from '@material-ui/core/SnackbarContent';
import WarningIcon from '@material-ui/icons/Warning';

const variantIcon = {
  success: CheckCircleIcon,
  warning: WarningIcon,
  error: ErrorIcon,
  info: InfoIcon,
};

const useStyles = makeStyles(theme => ({
  wrapper: {
    padding: [[8, 46, 8, 16]],
  },
  success: {
    backgroundColor: '#43a047',
  },
  error: {
    backgroundColor: '#d32f2f',
  },
  info: {
    backgroundColor: '#1976d2',
  },
  warning: {
    backgroundColor: '#ffa000',
  },
  icon: {
    fontSize: 20,
  },
  iconVariant: {
    opacity: 0.9,
    marginRight: theme.spacing(2),
  },
  msgWrapper: {
    display: 'flex',
    alignItems: 'center',
  },
  message: {
    fontSize: 16,
    lineHeight: 1.4,
  },
}));

function MySnackbarContentWrapper(props) {
  const classes = useStyles();
  const { className, message, variant } = props;
  const Icon = variantIcon[variant];

  return (
    <SnackbarContent
      className={`${classes[variant]} ${className} ${classes.wrapper}`}
      aria-describedby="client-snackbar"
      classes={{
        message: classes.msgWrapper,
      }}
      message={(
        <>
          <Icon className={`${classes.icon} ${classes.iconVariant}`} />
          <span className={classes.message}>
            {message}
          </span>
        </>
      )}
    />
  );
}

MySnackbarContentWrapper.propTypes = {
  className: PropTypes.string,
  message: PropTypes.node.isRequired,
  variant: PropTypes.oneOf(['success', 'warning', 'error', 'info']).isRequired,
};

MySnackbarContentWrapper.defaultProps = {
  className: '',
};

export default MySnackbarContentWrapper;
