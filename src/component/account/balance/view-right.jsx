import React, { createRef } from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles/index';
import moment from 'moment';
import uuid from 'uuid';
import Add from '@material-ui/icons/Add';
import Remove from '@material-ui/icons/Remove';

import MyTable from '../../../common/material-ui-compoents/table';
import MyButton from '../../../common/material-ui-compoents/button';
import MyPagination from '../../../common/pagination/pagination';
import MyDialog from '../../../common/dialog/dialog';
import Withdraw from '../../../common/dialog/withdraw';

import { viewStyle } from './style';

const headers = ['Date', 'Amount', 'Balance', 'Type', 'Description'];

const setType = (classes, type, amount = null) => {
  let msg = null;
  if (amount) {
    msg = (
      <span className={classes.amount}>
        {type === 'in' ? <Add className={classes.icon} /> : <Remove className={classes.icon} />}
        {amount}
      </span>
    );
  } else {
    msg = type === 'in' ? 'Get Earning' : 'Withdraw';
  }
  return msg;
};

// 处理表格数据
const setTableData = (tables, classes) => {
  const arr = [];
  let index = 0;
  // eslint-disable-next-line no-restricted-syntax
  for (const v of tables) {
    // 1.改变数据顺序 保证遍历渲染顺序正确
    // 2.处理数据格式
    arr[index] = {
      id: v.id || uuid(),
      createdDate: moment(v.createdDate).format('YYYY-MM-DD HH:mm:ss'),
      amount: setType(classes, v.operateType, v.amount),
      balance: `$ ${v.balance}`,
      operateType: setType(classes, v.operateType),
      remark: v.remark,
    };
    index += 1;
  }
  console.log(arr);
  return arr;
};


@withStyles(viewStyle)
class ViewRight extends React.Component {
  constructor(props) {
    super(props);
    this.dialogRef = createRef();
  }

  /**
   * 打开提取余额弹出框
   */
  handleClick = () => {
    if (this.dialogRef.current) {
      this.dialogRef.current.handleCloses();
    }
  };

  // 点击分页时调用
  handlePaginationChange = (current) => {
    console.log(
      '当前选中的页数: ', current,
    );
  };

  render() {
    const { classes, data } = this.props;
    return (
      <>
        <div className={classes.root}>
          <div className={classes.header}>
            <span>Balance :</span>
            <span className={classes.price}>$ 795.29</span>
            <MyButton
              variant="contained"
              color="primary"
              className={classes.headerBtn}
              onClick={this.handleClick}
            >
              Withdraw
            </MyButton>
          </div>
          <MyTable
            headers={headers}
            rows={setTableData(data.items, classes)}
          />
          <MyPagination
            total={435} // 总条数
            pageSize={10} // 每页条数
            change={this.handlePaginationChange} // 点击分页时调用
          />
        </div>
        <MyDialog
          ref={this.dialogRef}
          title="Withdraw"
          btnArr={['Submit', 'Clean']}
        >
          <Withdraw />
        </MyDialog>
      </>
    );
  }
}

ViewRight.propTypes = {
  classes: PropTypes.objectOf(PropTypes.object).isRequired,
  data: PropTypes.objectOf(PropTypes.object).isRequired,
};

export default ViewRight;
