import React, { useState, useRef } from 'react';
import PropTypes from 'prop-types';
import uuid from 'uuid';
import { makeStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import MenuItem from '@material-ui/core/MenuItem';
import MenuList from '@material-ui/core/MenuList';
import ClickAwayListener from '@material-ui/core/ClickAwayListener';
import { CSSTransition } from 'react-transition-group';

import HeaderContainer from './header-container';
import { loginStyle } from './style';
import logo from '../../asstes/images/logo_white.png';

const homeList = [
  {
    id: uuid(),
    text: 'Product Search',
  },
  {
    id: uuid(),
    text: 'My Oroduct',
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

  const handleClick = () => {
    history.push('/not/login');
  };

  const toggleOpen = () => {
    setOpen(!open);
  };

  // tabs下面的线条切换
  const tabHandleClick = (number) => {
    console.log(number);
    if (number) {
      toggleOpen();
      console.log('点击了 Links');
    } else {
      console.log('点击了 home');
    }
    indicator.current.style.transform = `translateX(${number * 95}px)`;
  };

  // 点击个人账户下拉列表 事件
  const handleAccount = (links) => {
    history.push(`/yes/${links}`);
  };

  return (
    <HeaderContainer>
      <div className={classes.left}>
        <div className={classes.logo}>
          <img src={logo} alt="iNFLUMONSTER logo" />
        </div>
        <div className={classes.nav}>
          <Button
            variant="contained"
            color="primary"
            onClick={() => { tabHandleClick(0); }}
            classes={{
              root: classes.navBtn,
            }}
          >
            Home
          </Button>
          <Button
            variant="contained"
            color="primary"
            className={`${classes.lastBtn} ${open ? classes.addActive : ''}`}
            classes={{
              root: classes.navBtn,
            }}
            onClick={() => { tabHandleClick(1); }}
          >
            <span>Links</span>
            <span className="triangle-right" />
            <CSSTransition
              in={open}
              timeout={300}
              classNames="slide"
              unmountOnExit
            >
              <ClickAwayListener onClickAway={toggleOpen}>
                <div
                  className={classes.dropDownContainer1}
                >
                  <div className={classes.dropDownWrapper1}>
                    <MenuList className={classes.list}>
                      {
                        homeList.map(v => (
                          <MenuItem
                            key={v.id}
                            classes={{
                              root: classes.items,
                            }}
                          >
                            {v.text}
                          </MenuItem>
                        ))
                      }
                    </MenuList>
                  </div>
                </div>
              </ClickAwayListener>
            </CSSTransition>
          </Button>
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
          <span className={classes.img}>
            <img src="https://cdn.influmonsters.com/fit-in/250x313/filters:fill(fff)/upload/image/product/desktop/2018/09/27/f5ee73fa-437c-49f7-ada5-39c59dbd1795.jpg" alt="" />
          </span>
          <span className={classes.name}>user name</span>
          <span className="triangle-right" />
          <CSSTransition
            in={showMessage}
            timeout={300}
            classNames="slide"
            unmountOnExit
          >
            <div
              className={classes.dropDownContainer}
            >
              <span className={classes.dropDownArrow} />
              <div className={classes.dropDownWrapper}>
                <MenuList className={classes.list}>
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
              </div>
            </div>
          </CSSTransition>
        </div>
        <span className={classes.line} />
        <Button
          variant="contained"
          color="primary"
          classes={{
            root: classes.rightBtn,
          }}
          onClick={handleClick}
        >
          Logout
        </Button>
      </div>
    </HeaderContainer>
  );
};

HeaderLogin.propTypes = {
  history: PropTypes.objectOf(PropTypes.object).isRequired,
};


export default HeaderLogin;
