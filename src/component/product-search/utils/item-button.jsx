import React, { useState, useRef } from 'react';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/core/styles/index';
import CircularProgress from '@material-ui/core/CircularProgress/index';
import copy from 'copy-to-clipboard/index';

import MyButton from '../../../common/material-ui-component/button';
import PartitionLine from '../../../common/partition-line/partition-line';
import MyDialogs from '../../../common/dialog/dialog';
import { postRequestBody, SUCCESS } from '../../../asstes/http/index';
import { openNotifications } from '../../../common/prompt-box/prompt-box';
import { productPrompt } from '../../../asstes/data/prompt-text';

import { itemButtonStyle } from '../style';

const useStyle = makeStyles(itemButtonStyle);

// 缓存商品链接
// const productLink = {};

const ItemButton = (props) => {
  const { id } = props;
  const [loading, setLoading] = useState(false);
  const [links, setLinks] = useState(null);
  const classes = useStyle();
  const dialogRef = useRef();

  /**
   * 点击select 把商品加入当前用户的推广商品列表
   */
  const handleSelect = () => {
    setLoading(true);
    postRequestBody(`/api/promotions/add/${id}`)
      .then((response) => {
        const { message } = response;
        if (message === SUCCESS) {
          setLoading(false);
          openNotifications.open({
            message: productPrompt.addProductSuccess,
            variant: 'success',
          });
        }
      });
  };

  /**
   *  获取商品的 Links
   */
  const handleClick = () => {
    if (dialogRef.current) {
      // 打开弹出框
      dialogRef.current.handleCloses();
      postRequestBody(`/api/promotions/link/${id}`)
        .then((response) => {
          const { link } = response;
          setLinks(link);
        })
        .catch((err) => {
          console.log(err);
          openNotifications.open({
            message: productPrompt.copyLinksError,
            variant: 'error',
            duration: 5,
          });
        });
    }
  };

  /**
   * 点击复制Links
   */
  const handleChange = () => {
    // 当links有值时
    if (links) {
      copy(links);
      dialogRef.current.handleCloses();
      openNotifications.open({
        message: productPrompt.copyLinksSuccess,
        variant: 'success',
        duration: 5,
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
          {links || 'loading....'}
        </div>
      </MyDialogs>
    </>
  );
};

ItemButton.propTypes = {
  id: PropTypes.string.isRequired,
};

export default ItemButton;
