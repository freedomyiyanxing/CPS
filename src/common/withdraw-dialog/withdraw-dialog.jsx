/* eslint-disable */
import React, { useState, useImperativeHandle, forwardRef } from 'react';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/core/styles';
import Dialog from '@material-ui/core/Dialog';
import Link from '@material-ui/core/Link';

import MyInput from '../material-ui-compoents/input';
import MyButton from '../material-ui-compoents/button';
import paypal from '../../asstes/images/p.png';
import withdrawStyle from './style';

const useStyle = makeStyles(withdrawStyle);

const footerText = [
  {
    id: 'btn-1',
    text: 'Submit',
  },
  {
    id: 'btn-2',
    text: 'Back',
  }
];

const WithdrawDialogs = (props, ref) => {
  const { } = props;
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
    }
  }));

  return (
    <Dialog
      open={open}
      onClose={handleClose}
      classes={{
        container: classes.container,
        paper: classes.dialog,
      }}
    >
      <div className={classes.header}>
        Withdraw
      </div>
      <div className={classes.content}>
        <div className={classes.items}>
          <span className={classes.left}>Payment Account :</span>
          <span className={`${classes.right} ${classes.img}`}>
            <img src={paypal} alt=""/>
          </span>
        </div>
        <div className={classes.items}>
          <span className={classes.left}>Account Balance :</span>
          <span className={`${classes.right} ${classes.all}`}>
            <span className={classes.price}>$1000.88</span>
            <Link
              component="button"
              underline="always"
              className={classes.links}
            >
              Widthdraw All
            </Link>
          </span>
        </div>
        <div className={classes.items}>
          <span className={classes.left}>Widthdraw Amount :</span>
          <MyInput
            placeholder="请输入金额"
            className={classes.right}
          />
        </div>
      </div>
      <div className={classes.footer}>
        {
          footerText.map(v => (
            <MyButton
              key={v.id}
              color="primary"
              variant="contained"
              className={classes.btn}
              onClick={handleClose}
            >
              {v.text}
            </MyButton>
          ))
        }
      </div>
    </Dialog>
  )
};

const WithdrawDialog = forwardRef(WithdrawDialogs);
export default WithdrawDialog
