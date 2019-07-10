import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/core/styles';
import Dialog from '@material-ui/core/Dialog';
import ErrorOutline from '@material-ui/icons/ErrorOutline';

import MyButton from '../../common/material-ui-compoents/button';
import HeaderContainer from './header-container';
import { session } from '../../asstes/js/utils-methods';
import HeaderLeft from './utils/header-left';
import HeaderRight from './utils/header-right';
import { loginStyle } from './style';

const useStyle = makeStyles(loginStyle);
let consumers = null;

const HeaderLogin = (props) => {
  const { history } = props;
  const [dialogOpen, setDialogOpen] = useState(false);

  const classes = useStyle();

  // 确定退出登录
  const handleOutClick = () => {
    // 清除 sessionStore 中的 登录信息 以及用户信息
    session.remove('loginInfo');
    session.remove('userInfo');
    // 修改context中的登录状态 清除context中的登录信息
    consumers.setLogin(false);
    consumers.setUserInfo({});
    // to 到登录页面
    history.push('/s/signin');
  };

  // 打开弹出框
  const openDialog = (consumer) => {
    consumers = consumer;
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
      <Dialog
        open={dialogOpen}
        onClose={() => { setDialogOpen(false); }}
      >
        <div className={classes.dialogWrapper}>
          <ErrorOutline className={classes.dialogIcon} />
          <p className={classes.dialogText}>Are you sure you want to sign out?</p>
          <div className={classes.dialogFooter}>
            <MyButton
              variant="contained"
              color="primary"
              className={classes.dialogButton}
              onClick={() => { setDialogOpen(false); }}
            >
              Cancel
            </MyButton>
            <MyButton
              variant="contained"
              color="primary"
              className={classes.dialogButton}
              onClick={handleOutClick}
            >
              Confirm
            </MyButton>
          </div>
        </div>
      </Dialog>
    </>
  );
};

HeaderLogin.propTypes = {
  history: PropTypes.objectOf(PropTypes.object).isRequired,
};


export default HeaderLogin;
