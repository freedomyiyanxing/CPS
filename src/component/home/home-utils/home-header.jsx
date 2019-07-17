import React, { useRef } from 'react';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/core/styles';

import PartitionLine from '../../../common/partition-line/partition-line';
import MyButton from '../../../common/material-ui-component/button';
import MyDialog from '../../../common/dialog/dialog';
import Withdraw from '../../../common/dialog/withdraw';
import Avatars from '../../../common/material-ui-component/avatar';

import { headerStyle } from './style';

const useStyle = makeStyles(headerStyle);

const HomeHeader = (props) => {
  const { data } = props;
  const classes = useStyle();
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
        <Avatars
          photo={data.photo}
          classes={{
            img: classes.bigAvatar,
          }}
        />
        <h5 className={classes.name}>
          {data.firstName + data.lastName}
        </h5>
        <span className={classes.email}>
          {data.email}
        </span>
        <PartitionLine width={1} color="borderDD" />
        <span className={classes.balance}>
          <span className={classes.text}>Balance :</span>
          <span className={classes.price}>
            {`$ ${data.balance || 0}`}
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
      <MyDialog
        ref={dialogRef}
        title="Withdraw"
        btnArr={['Submit', 'Clean']}
      >
        <Withdraw />
      </MyDialog>
    </>
  );
};

HomeHeader.propTypes = {
  data: PropTypes.objectOf(PropTypes.object).isRequired,
};

export default HomeHeader;
