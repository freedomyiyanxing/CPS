import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import ListItemIcon from '@material-ui/core/ListItemIcon';

import MainContainer from '../../common/box-container/main-container';

import { accountIndex } from '../../asstes/data/default-data';
import { indexStyle } from './style';

@withStyles(indexStyle)
class AccountIndex extends React.Component {
  handleClick = (links) => {
    const { history } = this.props;
    history.push(`/my/${links}`);
  };

  render() {
    const { classes } = this.props;
    return (
      <MainContainer>
        <div className={classes.root}>
          <List component="nav" className={classes.list}>
            {
              accountIndex.map((items) => {
                const Icon = items.icon;
                return (
                  <ListItem
                    button
                    key={items.id}
                    className={classes.listItem}
                    onClick={() => { this.handleClick(items.links); }}
                  >
                    <ListItemIcon className={classes.listAvatar}>
                      <Icon />
                    </ListItemIcon>
                    <ListItemText
                      primary={items.title}
                      secondary={items.text}
                      classes={{
                        primary: classes.title,
                      }}
                    />
                  </ListItem>
                );
              })
            }
          </List>
        </div>
      </MainContainer>
    );
  }
}

AccountIndex.propTypes = {
  classes: PropTypes.objectOf(PropTypes.object).isRequired,
  history: PropTypes.objectOf(PropTypes.object).isRequired,
};

export default AccountIndex;
