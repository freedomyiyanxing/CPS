import React from 'react';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/core/styles';

import {
  MySvgIconErrorIcon,
  MySvgIconWarningIcon,
  MySvgIconInfoIcon,
  MySvgIconSuccessIcon,
  MySvgIconClose,
} from '../material-ui-component/svg-icon';

const useStyles = makeStyles(theme => ({
  wrapper: {
    display: 'flex',
    alignItems: 'center',
    minHeight: 60,
    maxHeight: 300,
    padding: [[15, 45, 15, 15]],
    color: theme.palette.text.primary,
    backgroundColor: theme.palette.primary.contrastText,
  },
  success: {
    color: '#43a047',
  },
  error: {
    color: '#d32f2f',
  },
  info: {
    color: '#1976d2',
  },
  warning: {
    color: '#ffa000',
  },
  icon: {
    marginRight: theme.spacing(2),
  },
  message: {
    width: '100%',
    overflow: 'hidden',
    fontSize: theme.typography.h5.fontSize,
    lineHeight: 1.4,
  },
}));

const variantIcon = {
  success: MySvgIconSuccessIcon,
  warning: MySvgIconWarningIcon,
  error: MySvgIconErrorIcon,
  info: MySvgIconInfoIcon,
};


export function MySnackbarContentWrapper(props) {
  const classes = useStyles();
  const { message, variant } = props;
  const IconSvg = variantIcon[variant];
  return (
    <div className={classes.wrapper}>
      <IconSvg variant={variant} className={`${classes.icon} ${classes[variant]}`} />
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
    padding: 14,
    cursor: 'pointer',
    color: theme.palette.text.secondary,
  },
  icon: {
    fontSize: theme.typography.button.fontSize,
  },
}));

export const IconButtons = () => {
  const classes = useStyle1();
  return (
    <div className={classes.root}>
      <MySvgIconClose className={classes.icon} />
    </div>
  );
};
