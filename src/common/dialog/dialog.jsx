import React, { useState, useImperativeHandle, forwardRef } from 'react';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/core/styles';
import Dialog from '@material-ui/core/Dialog';

import MyButton from '../material-ui-compoents/button';
import { dialogsStyle } from './style';

const useStyle = makeStyles(dialogsStyle);

const MyDialogs = (props, ref) => {
  const {
    children, title, onChange, btnArr, disabled,
  } = props;
  const [open, setOpen] = useState(false);
  const classes = useStyle();
  /**
   * 控制弹出框
   */
  const handleClose = () => {
    setOpen(!open);
  };

  /**
   * 给父组件调用的 打开弹出框
   */
  useImperativeHandle(ref, () => ({
    handleCloses() {
      handleClose();
    },
  }));

  return (
    <Dialog
      open={open}
      onClose={handleClose}
      classes={{
        paper: classes.dialog,
      }}
    >
      <div className={classes.header}>
        {title}
      </div>
      {children}
      <div className={classes.footer}>
        <MyButton
          color="primary"
          variant="contained"
          disabled={!disabled}
          className={classes.btn}
          onClick={onChange}
        >
          {btnArr[0]}
        </MyButton>
        <MyButton
          color="primary"
          variant="contained"
          className={classes.btn}
          onClick={handleClose}
        >
          {btnArr[1]}
        </MyButton>
      </div>
    </Dialog>
  );
};

MyDialogs.propTypes = {
  children: PropTypes.node.isRequired, // 弹框的中间内容
  title: PropTypes.string.isRequired, // 头部标题文案
  onChange: PropTypes.func.isRequired, // (提交|复制) 按钮的提交方法
  disabled: PropTypes.bool.isRequired, // 控制 (提交|复制) 是否可点击
  btnArr: PropTypes.objectOf(PropTypes.array).isRequired, // 底部按钮文案
};


const MyDialog = forwardRef(MyDialogs);
export default MyDialog;
