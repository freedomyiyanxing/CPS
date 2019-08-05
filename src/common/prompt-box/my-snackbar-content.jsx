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

const variantIcon = {
  success: MySvgIconSuccessIcon,
  warning: MySvgIconWarningIcon,
  error: MySvgIconErrorIcon,
  info: MySvgIconInfoIcon,
};


function MySnackbarContentWrapper(props) {
  const classes = useStyles();
  const { message, variant } = props;
  const IconSvg = variantIcon[variant];
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
      <MySvgIconClose />
    </div>
  );
};

export default MySnackbarContentWrapper;
