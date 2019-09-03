import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/core/styles/index';
import copy from 'copy-to-clipboard/index';

import MyButton from '../../../common/material-ui-component/button';
import PartitionLine from '../../../common/partition-line/partition-line';
import DialogIndex from '../../../common/dialog/dialog-index';
import DialogHeader from '../../../common/dialog/dialog-header';
import DialogFooter from '../../../common/dialog/dialog-footer';
import { postRequestBody, SUCCESS } from '../../../assets/http/index';
import { openNotifications } from '../../../common/prompt-box/prompt-box';
import { productPrompt } from '../../../assets/data/prompt-text';

import { itemButtonStyle } from '../style';

const useStyle = makeStyles(itemButtonStyle);

// 缓存商品链接
// const productLink = {};

const ItemButton = (props) => {
  const { id } = props;
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const [links, setLinks] = useState(null);
  const classes = useStyle();

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
      })
      .catch(() => {
        setLoading(false);
      });
  };

  /**
   *  获取商品的 Links
   */
  const handleClick = () => {
    // 打开弹出框
    setOpen(true);
    postRequestBody(`/api/promotions/link/${id}`).then((response) => {
      const { link } = response;
      setLinks(link);
    });
  };

  /**
   * 点击复制Links
   */
  const handleChange = () => {
    // 当links有值时
    if (links) {
      copy(links);
      setOpen(false);
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
          loading={loading}
          className={`${classes.btn} ${loading ? classes.disabled : ''}`}
          onClick={handleSelect}
        >
          Select
        </MyButton>
      </div>
      <DialogIndex
        open={open}
        onClose={() => { setOpen(false); }}
        wrapperCls={classes.copyWrapper}
        header={<DialogHeader title="Get Link" />}
        footer={(
          <DialogFooter
            handleChange={handleChange}
            handleDelete={() => { setOpen(false); }}
            disabled={!links}
          />
        )}
      >
        {links || 'loading....'}
      </DialogIndex>
    </>
  );
};

ItemButton.propTypes = {
  id: PropTypes.string.isRequired,
};

export default ItemButton;
