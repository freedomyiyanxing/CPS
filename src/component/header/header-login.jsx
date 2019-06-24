import React, { useState, useRef } from 'react';
import PropTypes from 'prop-types';
import uuid from 'uuid';
import { makeStyles } from '@material-ui/core/styles';
import MenuItem from '@material-ui/core/MenuItem';
import MenuList from '@material-ui/core/MenuList';
import Collapse from '@material-ui/core/Collapse';
import Avatar from '@material-ui/core/Avatar';

import MyButton from '../../common/material-ui-compoents/button';
import HeaderContainer from './header-container';
import PartitionLine from '../../common/partition-line/partition-line';
import { loginStyle } from './style';
import logo from '../../asstes/images/logo_white.png';

const homeList = [
  {
    id: uuid(),
    text: 'Product Search',
    links: 'product-search',
  },
  {
    id: uuid(),
    text: 'My Products',
    links: 'my-products',
  },
];

const account = [
  {
    id: uuid(),
    text: 'Account Setting',
    links: 'account-setting',
  },
  {
    id: uuid(),
    text: 'Account Balance',
    links: 'account-balance',
  },
  {
    id: uuid(),
    text: 'Change Password',
    links: 'account-password',
  },
];

const useStyles = makeStyles(loginStyle);

const HeaderLogin = (props) => {
  const { history } = props;
  const classes = useStyles();
  const [open, setOpen] = useState(false);
  const [showMessage, setShowMessage] = useState(false);
  const anchorRef1 = useRef(null);
  const indicator = useRef(null);

  /**
   * 去未登录的首页
   */
  const handleIndex = () => {
    history.push('/yes/index');
  };

  const handleClick = () => {
    history.push('/not/login');
  };

  // home 点击事件
  const handleHome = () => {
    history.push('/yes/index');
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
    history.push(`/yes/${links}`);
    indicator.current.style.transform = 'translateX(85px)';
  };

  // 点击个人账户下拉列表 事件
  const handleAccount = (links) => {
    history.push(`/yes/${links}`);
  };

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
                  homeList.map(v => (
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
          <Avatar
            src="https://cdn.influmonsters.com/fit-in/250x313/filters:fill(fff)/upload/image/product/desktop/2018/09/27/f5ee73fa-437c-49f7-ada5-39c59dbd1795.jpg"
            alt="iNFLUMONSTER logo"
            className={classes.bigAvatar}
          />
          <span className={classes.name}>user name</span>
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
                account.map(v => (
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
          onClick={handleClick}
        >
          Logout
        </MyButton>
      </div>
    </HeaderContainer>
  );
};

HeaderLogin.propTypes = {
  history: PropTypes.objectOf(PropTypes.object).isRequired,
};


export default HeaderLogin;
