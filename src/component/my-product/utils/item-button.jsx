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
  const {
    id, handleDeleteClick, handleGetLinks,
  } = props;
  const [links, setLinks] = useState(null);
  const [clean, setClean] = useState(false);
  const classes = useStyle();
  const dialogRef = useRef();

  /**
   *  点击获取商品的 Links
   */
  const handleClick = (ids) => {
    if (dialogRef.current) {
      console.log('发送id: ', ids);
      // 打开弹出框
      dialogRef.current.handleCloses();

      // 获取link
      handleGetLinks(ids).then((data) => {
        setLinks(data);
      });
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
  const handleClean = (ids) => {
    setClean(true);
    handleDeleteClick(ids).then((data) => {
      setClean(false);
      console.log(data);
      openNotification({
        message: data,
        variant: 'success',
      });
    });
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
          {links || '努力加载中....'}
        </div>
      </MyDialogs>
    </>
  );
};

ItemButton.propTypes = {
  id: PropTypes.string.isRequired,
  handleDeleteClick: PropTypes.func.isRequired,
  handleGetLinks: PropTypes.func.isRequired,
};

export default ItemButton;