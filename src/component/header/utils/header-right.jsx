import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/core/styles';
import { inject, observer } from 'mobx-react';
import MenuItem from '@material-ui/core/MenuItem';
import MenuList from '@material-ui/core/MenuList';
import Collapse from '@material-ui/core/Collapse';
import Avatar from '@material-ui/core/Avatar';

import MyButton from '../../../common/material-ui-component/button';
import PartitionLine from '../../../common/partition-line/partition-line';
import MyPerson from '../../../common/material-ui-component/icon-person';
import { myHeader } from '../../../asstes/data/default-data';

import { rightStyle } from '../style';

const useStyles = makeStyles(rightStyle);

const HeaderRight = (props) => {
  const { history, toggleDialog, userStore } = props;
  const [showMessage, setShowMessage] = useState(false);

  const classes = useStyles();

  // 点击个人账户下拉列表 事件
  const handleAccount = (links) => {
    history.push(`/my/${links}`);
  };

  return (
    <div className={classes.right}>
      <div
        role="button"
        tabIndex={0}
        className={classes.rightInfo}
        onClick={() => { setShowMessage(true); }}
        onMouseLeave={() => { setShowMessage(false); }}
      >
        {
          userStore.userInfo && userStore.userInfo.userPhoto
            ? (
              <Avatar
                src={userStore.userInfo.userPhoto}
                alt="iNFLUMONSTER logo"
                className={classes.bigAvatar}
              />
            )
            : (
              <Avatar className={classes.defaultAvatar}>
                <MyPerson />
              </Avatar>
            )
        }
        <span className={classes.name}>
          {
            userStore.userInfo
              ? userStore.userInfo.userName
              : '默认名称有没有'
          }
        </span>
        <span className="triangle-right" />
        <Collapse
          in={showMessage}
          classes={{
            container: classes.accountCollapse,
            wrapperInner: classes.accountWrapperInner,
          }}
        >
          <span className={classes.accountArrow} />
          <MenuList className={classes.accountList}>
            {
              myHeader.account.map(v => (
                <MenuItem
                  key={v.id}
                  onClick={() => { handleAccount(v.links); }}
                  classes={{
                    root: classes.items,
                  }}
                >
                  {v.text}
                </MenuItem>
              ))
            }
          </MenuList>
        </Collapse>
      </div>
      <PartitionLine margin={[[0, 4, 0, 30]]} />
      <MyButton
        className={classes.rightBtn}
        onClick={toggleDialog}
      >
        Logout
      </MyButton>
    </div>
  );
};

HeaderRight.propTypes = {
  userStore: PropTypes.objectOf(PropTypes.object).isRequired,
  history: PropTypes.objectOf(PropTypes.object).isRequired,
  toggleDialog: PropTypes.func.isRequired,
};


export default inject('userStore')(observer(HeaderRight));
