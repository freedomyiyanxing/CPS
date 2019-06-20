import React, { useRef } from 'react';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/core/styles';
import Avatar from '@material-ui/core/Avatar';

import PartitionLine from '../../../common/partition-line/partition-line';
import MyButton from '../../../common/material-ui-compoents/button';
import WithdrawDialog from '../../../common/withdraw-dialog/withdraw-dialog';

import { headerStyle } from './style';

const useStyle = makeStyles(headerStyle);

const HomeHeader = (props) => {
  const { data } = props;
  const classes = useStyle();
  console.log(data);
  const dialogRef = useRef();

  /**
   * 打开提取余额弹出框
   */
  const handleClick = () => {
    if (dialogRef.current) {
      dialogRef.current.handleCloses();
    }
  };

  return (
    <>
      <div className={classes.root}>
        <Avatar
          src={data.photo}
          alt="account icon"
          className={classes.bigAvatar}
        />
        <h5 className={classes.name}>
          {`${data.firstName} ${data.lastName}`}
        </h5>
        <span className={classes.email}>
          {data.email}
        </span>
        <PartitionLine width={1} color="borderDD" />
        <span className={classes.balance}>
          <span className={classes.text}>Balance :</span>
          <span className={classes.price}>
            {`$ ${data.balance}`}
          </span>
        </span>
        <MyButton
          variant="contained"
          color="primary"
          className={classes.withdrawBtn}
          onClick={handleClick}
        >
          Withdraw
        </MyButton>
      </div>
      <WithdrawDialog ref={dialogRef} />
    </>
  );
};

HomeHeader.propTypes = {
  data: PropTypes.objectOf(PropTypes.object).isRequired,
};

export default HomeHeader;
