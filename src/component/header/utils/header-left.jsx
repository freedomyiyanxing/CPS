import React, { useState, useRef, useEffect } from 'react';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/core/styles';
import MenuItem from '@material-ui/core/MenuItem';
import MenuList from '@material-ui/core/MenuList';
import Collapse from '@material-ui/core/Collapse';

import MyButton from '../../../common/material-ui-compoents/button';
import { myHeader } from '../../../asstes/data/default-data';
import logo from '../../../asstes/images/logo_white.png';

import { leftStyle } from '../style';

const useStyles = makeStyles(leftStyle);

const HeaderLeft = (props) => {
  const { history } = props;
  const classes = useStyles();
  const [open, setOpen] = useState(false);
  const indicator = useRef(null);

  useEffect(() => {
    const { pathname } = history.location;
    if (pathname.endsWith('product-search') || pathname.endsWith('my-products')) {
      indicator.current.style.transform = 'translateX(85px)';
    }
  });

  /**
   * 去登录的首页
   */
  const handleIndex = () => {
    history.push('/my/index');
  };

  // home 点击事件
  const handleHome = () => {
    history.push('/my/index');
    indicator.current.style.transform = 'translateX(12px)';
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
    console.log(1);
    history.push(`/my/${links}`);
    // indicator.current.style.transform = 'translateX(85px)';
  };

  return (
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
  );
};

HeaderLeft.propTypes = {
  history: PropTypes.objectOf(PropTypes.object).isRequired,
};


export default HeaderLeft;
