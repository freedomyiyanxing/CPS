import React from 'react';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/core/styles';
import { inject } from 'mobx-react';

import PartitionLine from '../../../common/partition-line/partition-line';
import MyButton from '../../../common/material-ui-component/button';
import Avatars from '../../../common/material-ui-component/avatar';

import { headerStyle } from './style';

const useStyle = makeStyles(headerStyle);

const HomeHeader = (props) => {
  const { data, history, userStore } = props;
  const classes = useStyle();

  /**
   * to 余额展示页面
   */
  const handleClick = () => {
    history.push('/my/account-balance');
  };

  return (
    <div className={classes.root}>
      <Avatars
        photo={userStore.userPhoto}
        classes={{
          img: classes.bigAvatar,
        }}
      />
      <h5 className={classes.name}>
        {userStore.userName}
      </h5>
      <span className={classes.email}>
        {data.email}
      </span>
      <PartitionLine width={1} color="borderDD" />
      <span className={classes.balance}>
        <span className={classes.text}>Balance :</span>
        <span className={classes.price}>
          $
          {data.balance && data.balance.toFixed(2)}
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
  );
};

HomeHeader.propTypes = {
  history: PropTypes.objectOf(PropTypes.object).isRequired,
  data: PropTypes.objectOf(PropTypes.object).isRequired,
  userStore: PropTypes.objectOf(PropTypes.object).isRequired,
};

export default inject('userStore')(HomeHeader);
