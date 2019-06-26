/* eslint-disable */
import React, { useState, useRef } from 'react';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/core/styles';
import CircularProgress from "@material-ui/core/CircularProgress";
import copy from 'copy-to-clipboard';

import MyButton from '../../common/material-ui-compoents/button';
import PartitionLine from '../../common/partition-line/partition-line';
import MyDialogs from '../../common/dialog/dialog';

const useStyle = makeStyles(theme => ({
  btnWrapper: {
    width: '100%',
    display: 'flex',
    alignItems: 'center',
  },
  btn: {
    flex: 1,
    height: 38,
  },
  disabled: {
    background: theme.palette.primary[400],
  },
  copyWrapper: {
    height: 150,
    margin: [[20, 20, 30]],
    padding: 10,
    fontSize: theme.typography.fontSizeMd,
    color: theme.palette.text.secondary,
    border: `1px solid ${theme.palette.border.borderDD}`,
  },
}));

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
      setLoading(false)
    }, 3000);
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
      }, 2000);
    }
  };

  // 复制Links
  const handleChange = () => {
    // 当links有值时
    if (links) {
      copy(links);
      dialogRef.current.handleCloses();
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
              ? <CircularProgress size={24} className={classes.buttonProgress} />
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
