import React from 'react';
import { makeStyles } from '@material-ui/core/styles';

import HeaderContainer from '../utils/header-container';
import NotLeft, { LinkRouter } from '../utils/not-header-left';
import PartitionLine from '../../../common/partition-line/partition-line';

const useStyles = makeStyles(theme => ({
  wrapper: {},
  links: {
    display: 'block',
    fontSize: theme.typography.h6.fontSize,
  },
}));

const NotLoginHeaders = () => {
  const classes = useStyles();

  return (
    <HeaderContainer
      isLogin={false}
      leftComponent={<NotLeft />}
      rightComponent={(
        <>
          <LinkRouter
            to="/s/signup"
            color="inherit"
            underline="none"
            className={classes.links}
          >
            Join Now
          </LinkRouter>
          <PartitionLine margin={[[0, 20]]} />
          <LinkRouter
            to="/s/signin"
            color="inherit"
            underline="none"
            className={classes.links}
          >
            Login
          </LinkRouter>
        </>
      )}
    />
  );
};


export default NotLoginHeaders;
