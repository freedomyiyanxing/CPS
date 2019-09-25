import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import {
  MySvgIconClose,
} from '../material-ui-component/svg-icon';

const useStyle = makeStyles(theme => ({
  root: {
    position: 'absolute',
    right: 10,
    top: 10,
    zIndex: 10,
    cursor: 'pointer',
    color: theme.palette.text.secondary,
  },
  close: {
    fontSize: theme.typography.caption.fontSize,
  },
}));

const DateClose = () => {
  const classes = useStyle();
  return (
    <span className={classes.root}>
      <MySvgIconClose className={classes.close} />
    </span>
  );
};

export const promise = new Promise((resolve) => {
  Promise.all([
    import('rc-calendar'),
    import('rc-calendar/lib/Picker'),
    import('rc-calendar/lib/locale/en_US'),
  ]).then((data) => {
    resolve([data[0].default, data[1].default, data[2].default]);
  });
});

export default DateClose;
