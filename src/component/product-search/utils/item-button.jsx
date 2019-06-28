/* eslint-disable */
import React, { useState, useRef } from 'react';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/core/styles/index';
import CircularProgress from '@material-ui/core/CircularProgress/index';
import copy from 'copy-to-clipboard/index';

import MyButton from '../../../common/material-ui-compoents/button';
import PartitionLine from '../../../common/partition-line/partition-line';
import MyDialogs from '../../../common/dialog/dialog';
import openNotification from '../../../common/prompt-box/prompt-box';

import { itemButtonStyle } from '../style';

const useStyle = makeStyles(itemButtonStyle);

const ItemButton = (props) => {
  const { } = props;
  const [loading, setLoading] = useState(false);
  const [links, setLinks] = useState(null);
  const classes = useStyle();
  const dialogRef = useRef();

  // 点击select 把商品加入当前用户的推广商品列表
  const handleSelect = () => {
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      openNotification({
        message: '已经加入你的推广商品列表 --- OK',
        variant: 'success',
      });
    }, 1000);
  };

  /**
   *  获取商品的 Links
   */
  const handleClick = () => {
    if (dialogRef.current) {
      // 打开弹出框
      dialogRef.current.handleCloses();
      // 发送获取 Links 请求
      setTimeout(() => {
        setLinks('www.baidu.com');
      }, 1000);
    }
  };

  // 复制Links
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
  return (
    <>
      <div className={classes.btnWrapper}>
        <MyButton
          color="primary"
          className={classes.btn}
          onClick={handleClick}
        >
          GetLink
        </MyButton>
        <PartitionLine
          margin={[[0]]}
          width={1}
          color="borderDD"
        />
        <MyButton
          color="primary"
          disabled={loading}
          className={`${classes.btn} ${loading ? classes.disabled : ''}`}
          onClick={handleSelect}
        >
          {
            loading
              ? <CircularProgress size={24} />
              : 'Select'
          }
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
};

export default ItemButton;
