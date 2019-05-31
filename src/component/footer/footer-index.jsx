import React from 'react';
import { makeStyles } from '@material-ui/core/styles';

import footerStyle from './style';

const useStyles = makeStyles(footerStyle);

const FooterIndex = () => {
  const classes = useStyles();
  return (
    <div className={classes.root}>
      <div>我是尾部</div>
    </div>
  );
};

export default FooterIndex;
