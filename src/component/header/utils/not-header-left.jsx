import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { Link as RouterLink } from 'react-router-dom';
import List from '@material-ui/core/List';
import Link from '@material-ui/core/Link';

import { notLoginLeftHeaderLinks } from '../../../assets/data/default-data';

const useStyles = makeStyles(theme => ({
  nav: {
    display: 'flex',
  },
  links: {
    display: 'block',
    marginLeft: 68,
    fontSize: theme.typography.h4.fontSize,
  },
}));

export const LinkRouter = prs => <Link {...prs} component={RouterLink} />;

const NotLeft = () => {
  const classes = useStyles();

  return (
    <List component="nav" disablePadding className={classes.nav}>
      {
        notLoginLeftHeaderLinks.map(v => (
          <LinkRouter
            key={v.id}
            to={v.link}
            color="inherit"
            underline="none"
            className={classes.links}
          >
            {v.text}
          </LinkRouter>
        ))
      }
    </List>
  );
};

export default NotLeft;
