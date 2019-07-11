import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Close from '@material-ui/icons/Close';

const useStyle = makeStyles(theme => ({
  root: {
    position: 'absolute',
    right: 6,
    top: 6,
    zIndex: 10,
    width: 18,
    height: 18,
    cursor: 'pointer',
    color: theme.palette.text.secondary,
  },
  close: {
    fontSize: theme.typography.fontSizeLg,
  },
}));

const DateClose = () => {
  const classes = useStyle();
  return (
    <span className={classes.root}>
      <Close className={classes.close} />
    </span>
  );
};

export default DateClose;
