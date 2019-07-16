import React from 'react';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles(theme => ({
  wrapper: {
    display: 'flex',
    alignItems: 'center',
    minHeight: 60,
    maxHeight: 300,
    overflow: 'hidden',
    padding: [[10, 46, 10, 16]],
    color: theme.palette.primary.contrastText,
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
    marginRight: theme.spacing(2),
  },
  message: {
    fontSize: 16,
    lineHeight: 1.4,
  },
}));

const CheckCircleIcon = () => (
  <>
    <path fill="none" d="M0 0h24v24H0z" />
    <path
      d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z"
    />
  </>
);

const ErrorIcon = () => (
  <>
    <path fill="none" d="M0 0h24v24H0z" />
    <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm1 15h-2v-2h2v2zm0-4h-2V7h2v6z" />
  </>
);

const WarningIcon = () => (
  <>
    <path fill="none" d="M0 0h24v24H0z" />
    <path d="M1 21h22L12 2 1 21zm12-3h-2v-2h2v2zm0-4h-2v-4h2v4z" />
  </>
);

const InfoIcon = () => (
  <>
    <path fill="none" d="M0 0h24v24H0z" />
    <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm1 15h-2v-6h2v6zm0-8h-2V7h2v2z" />
  </>
);

const variantIcon = {
  success: CheckCircleIcon,
  warning: WarningIcon,
  error: ErrorIcon,
  info: InfoIcon,
};

const IconSvg = (props) => {
  const { variant, className } = props;
  const Icon = variantIcon[variant];
  return (
    <svg
      className={`MuiSvgIcon-root ${className}`}
      focusable="false"
      viewBox="0 0 24 24"
      aria-hidden="true"
      role="presentation"
    >
      <Icon />
    </svg>
  );
};

IconSvg.propTypes = {
  className: PropTypes.string.isRequired,
  variant: PropTypes.oneOf(['success', 'warning', 'error', 'info']).isRequired,
};


function MySnackbarContentWrapper(props) {
  const classes = useStyles();
  const { message, variant } = props;
  return (
    <div
      className={`${classes[variant]} ${classes.wrapper}`}
    >
      <IconSvg variant={variant} className={classes.icon} />
      <p className={classes.message}>{message}</p>
    </div>
  );
}

MySnackbarContentWrapper.propTypes = {
  message: PropTypes.node.isRequired,
  variant: PropTypes.oneOf(['success', 'warning', 'error', 'info']).isRequired,
};

const useStyle1 = makeStyles(theme => ({
  root: {
    padding: 10,
    cursor: 'pointer',
    color: theme.palette.primary.contrastText,
    fontSize: 18,
  },
}));

export const IconButtons = () => {
  const classes = useStyle1();
  return (
    <div className={classes.root}>
      <svg
        className="MuiSvgIcon-root"
        focusable="false"
        viewBox="0 0 24 24"
        aria-hidden="true"
        role="presentation"
      >
        <path
          d="M19 6.41L17.59 5 12 10.59 6.41 5 5 6.41 10.59 12 5 17.59 6.41 19 12 13.41 17.59 19 19 17.59 13.41 12z"
        />
        <path
          fill="none"
          d="M0 0h24v24H0z"
        />
      </svg>
    </div>
  );
};

export default MySnackbarContentWrapper;
