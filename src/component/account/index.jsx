/* eslint-disable */
import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import ListItemIcon from '@material-ui/core/ListItemIcon';

import MainContainer from '../../common/box-container/main-container';

import { accountIndex } from '../../asstes/data/default-data';
import { get } from '../../asstes/http/index';
import { indexStyle } from './style';

@withStyles(indexStyle)
class AccountIndex extends React.Component{
  componentDidMount() {
    get('/api/profile/info')
      .then((response) => {
        console.log(response)
      })
      .catch((err) => {
        console.log(err);
      })
  }

  handleClick = (links) => {
    const { history } = props;
    console.log(links);
    history.push(`/my/${links}`);
  };

  render() {
    const { classes } = this.props;

    return (
      <MainContainer>
        <div className={classes.root}>
          <List component="nav" className={classes.list}>
            {
              accountIndex.map(items => (
                <ListItem
                  button
                  key={items.id}
                  className={classes.listItem}
                  onClick={() => { handleClick(items.links); }}
                >
                  <ListItemIcon className={classes.listAvatar}>
                    <span className={items.icon} />
                  </ListItemIcon>
                  <ListItemText
                    className={classes.listText}
                    primary={items.title}
                    secondary={items.text}
                    classes={{
                      primary: classes.title,
                    }}
                  />
                </ListItem>
              ))
            }
          </List>
        </div>
      </MainContainer>
    );
  };
}

AccountIndex.propTypes = {
  classes: PropTypes.objectOf(PropTypes.object).isRequired,
  history: PropTypes.objectOf(PropTypes.object).isRequired,
};

export default AccountIndex;
