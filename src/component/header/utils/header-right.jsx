import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/core/styles';
import { inject, observer } from 'mobx-react';
import MenuItem from '@material-ui/core/MenuItem';
import MenuList from '@material-ui/core/MenuList';
import Collapse from '@material-ui/core/Collapse';

import MyButton from '../../../common/material-ui-component/button';
import PartitionLine from '../../../common/partition-line/partition-line';
import Avatars from '../../../common/material-ui-component/avatar';
import DialogIndex from '../../../common/dialog/dialog-index';
import DialogHeader from '../../../common/dialog/dialog-header';
import DialogFooter from '../../../common/dialog/dialog-footer';
import { myHeader } from '../../../assets/data/default-data';
import { ErrorOutline } from '../../../common/material-ui-component/svg-icon';
import { openNotifications } from '../../../common/prompt-box/prompt-box';
import { patchRequestBody, SUCCESS } from '../../../assets/http/index';
import { logoutPrompt } from '../../../assets/data/prompt-text';

import { rightStyle } from '../style';

const useStyles = makeStyles(rightStyle);

const HeaderRight = (props) => {
  const { history, userStore } = props;
  const [showMessage, setShowMessage] = useState(false);
  const [dialogOpen, setDialogOpen] = useState(false);
  const [btnLoading, setBtnLoading] = useState(false);

  const classes = useStyles();

  // 退出登录
  const handleOutClick = () => {
    setBtnLoading(true);
    patchRequestBody('/api/profile/logout')
      .then((response) => {
        const { message } = response;
        if (message === SUCCESS) {
          // 修改userStore中的登录状态 清除userStore中的登录信息
          userStore.setLoginInfo(false);
          userStore.loginUseInfo(null);
          // to 到登录页面
          history.push('/s/signin');
          openNotifications.open({
            message: logoutPrompt.successText,
            variant: 'success',
          });
        }
        setBtnLoading(false);
      })
      .catch((err) => {
        openNotifications.open({
          message: err.data.message || logoutPrompt.errorText,
          variant: 'error',
        });
        setBtnLoading(false);
      });
  };

  // 打开弹出框
  const openDialog = () => {
    setDialogOpen(true);
  };

  // 点击个人账户下拉列表 事件
  const handleAccount = (links) => {
    history.push(`/my/${links}`);
  };

  return (
    <>
      <div className={classes.right}>
        <div
          role="button"
          tabIndex={0}
          className={classes.rightInfo}
          onClick={() => {
            setShowMessage(true);
          }}
          onMouseLeave={() => {
            setShowMessage(false);
          }}
        >
          <Avatars
            photo={userStore.userPhoto}
            classes={{
              icon: classes.defaultAvatar,
            }}
          />
          <span className={classes.name}>
            {userStore.userName}
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
                    onClick={() => {
                      handleAccount(v.links);
                    }}
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
          onClick={openDialog}
        >
          Logout
        </MyButton>
      </div>
      <DialogIndex
        open={dialogOpen}
        onClose={() => {
          setDialogOpen(false);
        }}
        header={<DialogHeader title="Logout" />}
        footer={(
          <DialogFooter
            loading={btnLoading}
            handleChange={handleOutClick}
            handleDelete={() => {
              setDialogOpen(false);
            }}
            title={{
              ok: 'Confirm',
              delete: 'Cancel',
            }}
          />
        )}
      >
        <div className={classes.main}>
          <ErrorOutline className={classes.dialogIcon} />
          <p className={classes.dialogText}>Are you sure you want to sign out?</p>
        </div>
      </DialogIndex>
    </>
  );
};

HeaderRight.propTypes = {
  userStore: PropTypes.objectOf(PropTypes.object).isRequired,
  history: PropTypes.objectOf(PropTypes.object).isRequired,
};


export default inject('userStore')(observer(HeaderRight));
