import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/core/styles';
import copy from 'copy-to-clipboard/index';

import MyButton from '../../../common/material-ui-component/button';
import DialogIndex from '../../../common/dialog/dialog-index';
import DialogHeader from '../../../common/dialog/dialog-header';
import DialogFooter from '../../../common/dialog/dialog-footer';

import { openNotifications } from '../../../common/prompt-box/prompt-box';
import { productPrompt } from '../../../assets/data/prompt-text';
import { postRequestBody } from '../../../assets/http';
import { itemButtonStyle } from '../style';

const useStyle = makeStyles(itemButtonStyle);

const ItemButton = (props) => {
  const {
    id, handleDeleteClick,
  } = props;
  const [open, setOpen] = useState(false);
  const [links, setLinks] = useState(null);
  const [clean, setClean] = useState(false);
  const classes = useStyle();

  /**
   *  获取商品的 Links
   */
  const handleClick = () => {
    // 打开弹出框
    setOpen(true);
    // 打开弹出框
    postRequestBody(`/api/promotions/link/${id}`)
      .then((response) => {
        const { link } = response;
        setLinks(link);
      })
      .catch((err) => {
        openNotifications.open({
          message: err.data.message || productPrompt.copyLinksError,
          variant: 'error',
          duration: 5,
        });
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

  // 点击删除商品
  const handleClean = (ids) => {
    setClean(true);
    handleDeleteClick(ids).then(() => {
      setClean(false);
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
          loadingSize={14}
        >
          Delete
        </MyButton>
        <MyButton
          variant="outlined"
          className={classes.btn}
          onClick={handleClick}
        >
          Get Link
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
  handleDeleteClick: PropTypes.func.isRequired,
};

export default ItemButton;
