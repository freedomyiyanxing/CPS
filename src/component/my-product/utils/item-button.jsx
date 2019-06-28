/* eslint-disable */
import React, { useState, useRef } from 'react';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/core/styles';
import CircularProgress from '@material-ui/core/CircularProgress/index';
import copy from 'copy-to-clipboard/index';

import MyButton from '../../../common/material-ui-compoents/button';
import MyDialogs from '../../../common/dialog/dialog';
import openNotification from '../../../common/prompt-box/prompt-box';

import { itemButtonStyle } from '../style';

const useStyle = makeStyles(itemButtonStyle);

const ItemButton = (props) => {
  const { id } = props;
  const [links, setLinks] = useState(null);
  const [clean, setClean] = useState(false);
  const classes = useStyle();
  const dialogRef = useRef();

  /**
   *  点击获取商品的 Links
   */
  const handleClick = (id) => {
    if (dialogRef.current) {
      console.log('发送id: ', id);
      // 打开弹出框
      dialogRef.current.handleCloses();
      // 发送获取 Links 请求
      setTimeout(() => {
        setLinks('www.baidu.com');
      }, 1000);
    }
  };

  // 点击复制Links
  const handleChange = () => {
    // 当links有值时
    if (links) {
      copy(links);
      dialogRef.current.handleCloses();
      openNotification({
        message: '复制成功 --- OK',
        variant: 'success',
      });
    }
  };

  // 点击删除商品
  const handleClean = (id) => {
    setClean(true);
    setTimeout(() => {
      setClean(false);
      openNotification({
        message: `删除当前商品 -${id} :  success ---`,
        variant: 'success',
      });
    }, 2000);
  };
  return (
    <>
      <div className={classes.btnWrapper}>
        <MyButton
          variant="outlined"
          className={classes.btn}
          onClick={() => { handleClean(id); }}
          loading={clean}
        >
          {
            clean
              ? <CircularProgress size={14} />
              : 'Delete'
          }
        </MyButton>
        <MyButton
          variant="outlined"
          className={classes.btn}
          onClick={() => { handleClick(id); }}
        >
          Get Link
        </MyButton>
      </div>
      <MyDialogs
        ref={dialogRef}
        onChange={handleChange}
        btnArr={['Copy', 'Close']}
        disabled={Boolean(links)}
      >
        <div className={classes.copyWrapper}>
          {links ? links : '努力加载中....'}
        </div>
      </MyDialogs>
    </>
  );
};

ItemButton.propTypes = {
  id: PropTypes.string.isRequired,
};

export default ItemButton;
