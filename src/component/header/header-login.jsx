import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/core/styles';
import { inject } from 'mobx-react';
import ErrorOutline from '@material-ui/icons/ErrorOutline';

import DialogIndex from '../../common/dialog/dialog-index';
import DialogHeader from '../../common/dialog/dialog-header';
import DialogFooter from '../../common/dialog/dialog-footer';
import HeaderContainer from './header-container';
import HeaderLeft from './utils/header-left';
import HeaderRight from './utils/header-right';

import { openNotifications } from '../../common/prompt-box/prompt-box';
import { patchRequestBody, SUCCESS } from '../../assets/http/index';
import { session } from '../../assets/js/utils-methods';
import { logoutPrompt } from '../../assets/data/prompt-text';

const useStyle = makeStyles(theme => ({
  dialogIcon: {
    fontSize: theme.typography.h1.fontSize,
  },
  dialogText: {
    fontSize: theme.typography.fontSizeMd,
  },
  main: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'space-between',
    minHeight: 80,
  },
}));

const HeaderLogin = (props) => {
  const { history, userStore } = props;
  const [dialogOpen, setDialogOpen] = useState(false);
  const [btnLoading, setBtnLoading] = useState(false);

  const classes = useStyle();

  // 退出登录
  const handleOutClick = () => {
    setBtnLoading(true);
    setTimeout(() => {
      patchRequestBody('/api/profile/logout')
        .then((response) => {
          const { message } = response;
          if (message === SUCCESS) {
            // 清除 sessionStore 中的 登录信息 以及用户信息
            session.remove('loginInfo');
            session.remove('userName');
            session.remove('userPhoto');
            // 修改context中的登录状态 清除store中的登录信息
            userStore.setLogin(false);
            // to 到登录页面
            history.push('/s/signin');

            openNotifications.open({
              message: logoutPrompt.successText,
              variant: 'success',
              duration: 5,
            });
          }
          setBtnLoading(false);
        })
        .catch((err) => {
          openNotifications.open({
            message: err.data.message || logoutPrompt.errorText,
            variant: 'error',
            duration: 5,
          });
          setBtnLoading(false);
        });
    }, 500);
  };

  // 打开弹出框
  const openDialog = () => {
    setDialogOpen(true);
  };

  return (
    <>
      <HeaderContainer>
        <HeaderLeft history={history} />
        <HeaderRight
          history={history}
          toggleDialog={openDialog}
        />
      </HeaderContainer>
      <DialogIndex
        open={dialogOpen}
        onClose={() => { setDialogOpen(false); }}
        header={<DialogHeader title="Logout" />}
        footer={(
          <DialogFooter
            loading={btnLoading}
            handleChange={handleOutClick}
            handleDelete={() => { setDialogOpen(false); }}
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

HeaderLogin.propTypes = {
  history: PropTypes.objectOf(PropTypes.object).isRequired,
  userStore: PropTypes.objectOf(PropTypes.object).isRequired,
};


export default inject('userStore')(HeaderLogin);
