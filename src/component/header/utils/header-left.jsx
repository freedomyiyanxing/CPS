import React, { useState, useRef, useEffect } from 'react';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/core/styles';
import MenuItem from '@material-ui/core/MenuItem';
import MenuList from '@material-ui/core/MenuList';
import Collapse from '@material-ui/core/Collapse';

import MyButton from '../../../common/material-ui-component/button';
import { myHeader } from '../../../assets/data/default-data';

import { leftStyle } from '../style';

const useStyles = makeStyles(leftStyle);

const HeaderLeft = (props) => {
  const { history } = props;
  const classes = useStyles();
  const [open, setOpen] = useState(false);
  const indicator = useRef(null);

  useEffect(() => {
    const { pathname } = history.location;
    if (pathname.endsWith('product-search') || pathname.endsWith('own-products')) {
      indicator.current.style.transform = 'translateX(157px)';
    }
  });

  // home 点击事件
  const handleHome = () => {
    history.push('/my/index');
    indicator.current.style.transform = 'translateX(47px)';
  };

  // links 移入事件
  const onMouseEnterLinks = () => {
    setOpen(true);
  };

  // 点击进入推广管理页面
  const handlePushWide = (links) => {
    history.push(`/my/${links}`);
  };

  return (
    <div className={classes.nav}>
      <MyButton
        className={classes.linkBtn}
        onClick={handleHome}
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
  );
};

HeaderLeft.propTypes = {
  history: PropTypes.objectOf(PropTypes.object).isRequired,
};


export default HeaderLeft;
