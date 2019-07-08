/* eslint-disable */
import React, { useState, useRef, useEffect } from 'react';
import PropTypes from 'prop-types';
import uuid from 'uuid';
import { makeStyles } from '@material-ui/core/styles';
import MenuItem from '@material-ui/core/MenuItem';
import MenuList from '@material-ui/core/MenuList';
import Collapse from '@material-ui/core/Collapse';
import Avatar from '@material-ui/core/Avatar';
import Dialog from '@material-ui/core/Dialog';
import ErrorOutline from '@material-ui/icons/ErrorOutline';

import { Consumer } from '../../context/index';
import MyButton from '../../common/material-ui-compoents/button';
import HeaderContainer from './header-container';
import PartitionLine from '../../common/partition-line/partition-line';
import MyPerson from '../../common/material-ui-compoents/icon-person';

import { myHeader } from '../../asstes/data/default-data';
import logo from '../../asstes/images/logo_white.png';

import { loginStyle } from './style';

const useStyles = makeStyles(loginStyle);

const HeaderLogin = (props) => {
  const { history } = props;
  const classes = useStyles();
  const [open, setOpen] = useState(false);
  const [showMessage, setShowMessage] = useState(false);
  const [dialogOpen, setDialogOpen] = useState(false);
  const anchorRef1 = useRef(null);
  const indicator = useRef(null);

  useEffect(() => {
    const { pathname } = history.location;
    if (pathname.endsWith('product-search') || pathname.endsWith('my-products')) {
      indicator.current.style.transform = 'translateX(85px)';
    }
  });

  /**
   * 去未登录的首页
   */
  const handleIndex = () => {
    history.push('/my/index');
  };

  // 确定退出登录
  const handleOutClick = () => {
    console.log('确定退出登录吗');
  };

  // home 点击事件
  const handleHome = () => {
    history.push('/my/index');
    indicator.current.style.transform = 'translateX(12px)';
    // indicator.current.style.transform = 'translateX(12px)';
  };

  // home 移入事件
  const onMouseEnterHome = () => {
    // indicator.current.style.transform = 'translateX(12px)';
  };

  // links 移入事件
  const onMouseEnterLinks = () => {
    setOpen(true);
    // indicator.current.style.transform = 'translateX(85px)';
  };

  // 点击进入推广管理页面
  const handlePushWide = (links) => {
    history.push(`/my/${links}`);
    indicator.current.style.transform = 'translateX(85px)';
  };

  // 点击个人账户下拉列表 事件
  const handleAccount = (links) => {
    history.push(`/my/${links}`);
  };

  return (
    <>
      <Consumer>
        {
          (data) => {
            return (
              <HeaderContainer>
                <div className={classes.left}>
                  <div
                    className={classes.logo}
                    role="button"
                    tabIndex={0}
                    onClick={handleIndex}
                  >
                    <img src={logo} alt="iNFLUMONSTER logo" />
                  </div>
                  <div className={classes.nav}>
                    <MyButton
                      className={classes.linkBtn}
                      onClick={handleHome}
                      onMouseEnter={onMouseEnterHome}
                    >
                      Home
                    </MyButton>
                    <MyButton
                      className={classes.linkBtn}
                      onMouseEnter={onMouseEnterLinks}
                      onMouseLeave={() => { setOpen(false); }}
                    >
                      <span>Links</span>
                      <span className="triangle-right" />
                      <Collapse
                        in={open}
                        classes={{
                          container: classes.linkCollapse,
                        }}
                      >
                        <MenuList className={classes.linkList}>
                          {
                            myHeader.homeList.map(v => (
                              <MenuItem
                                key={v.id}
                                classes={{
                                  root: classes.items,
                                }}
                                onClick={() => { handlePushWide(v.links); }}
                              >
                                {v.text}
                              </MenuItem>
                            ))
                          }
                        </MenuList>
                      </Collapse>
                    </MyButton>
                    <span ref={indicator} className={classes.indicator} />
                  </div>
                </div>
                <div className={classes.right}>
                  <div
                    role="button"
                    tabIndex={0}
                    ref={anchorRef1}
                    className={classes.rightInfo}
                    onClick={() => { setShowMessage(true); }}
                    onMouseLeave={() => { setShowMessage(false); }}
                  >
                    {
                      data.state.useObj.userPhoto
                        ? (
                          <Avatar
                            src={data.state.useObj.userPhoto}
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
                    <span className={classes.name}>{data.state.useObj.userName || 'user name'}</span>
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
                    onClick={() => { setDialogOpen(true); }}
                  >
                    Logout
                  </MyButton>
                </div>
              </HeaderContainer>
            );
          }
        }
      </Consumer>
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
