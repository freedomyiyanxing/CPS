import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Link from '@material-ui/core/Link';

import MyInput from '../material-ui-compoents/input';
import paypal from '../../asstes/images/p.png';
import { withdrawStyle } from './style';

const useStyle = makeStyles(withdrawStyle);

const Withdraw = () => {
  const classes = useStyle();
  return (
    <div className={classes.content}>
      <div className={classes.items}>
        <span className={classes.left}>Payment Account :</span>
        <span className={`${classes.right} ${classes.img}`}>
          <img src={paypal} alt="支付Icon" />
        </span>
      </div>
      <div className={classes.items}>
        <span className={classes.left}>Account Balance :</span>
        <span className={`${classes.right} ${classes.all}`}>
          <span className={classes.price}>$1000.88</span>
          {/* eslint-disable-next-line jsx-a11y/anchor-is-valid */}
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
  );
};

export default Withdraw;
