/* eslint-disable */
import React, { createRef } from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles/index';
import moment from 'moment';
import uuid from 'uuid';
import Add from '@material-ui/icons/Add';
import Remove from '@material-ui/icons/Remove';

import MyTable from '../../../common/material-ui-component/table';
import MyButton from '../../../common/material-ui-component/button';
import MyPagination from '../../../common/pagination/pagination';
import MyDialog from '../../../common/dialog/dialog';
import Withdraw from '../../../common/dialog/withdraw';
import { balanceTableHeaders, storeProduct } from '../../../asstes/data/default-data';
import { get } from '../../../asstes/http/index';

import { viewStyle } from './style';

const PAGE_SIZE = 6;

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
      operateType: v.operateType, //setType(classes, v.operateType),
      remark: v.remark,
    };
    index += 1;
  }
  return arr;
};


@withStyles(viewStyle)
class ViewRight extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      data: null,
      balance: 0, // 默认余额为0;
    };
    this.dialogRef = createRef();

    this.pageCurrent = 1; // 当前页码 默认1;
    this.value = null; // 默认search 表单值为null
  }

  componentDidMount() {
    this._unmount = true;
    this.getData().then();
    this.getUserInfo();
  }

  componentWillUnmount() {
    this._unmount = false;
  }

  /**
   * 查询用户信息
   */
  getUserInfo = () => {
    const { balance } = this.state;
    get('/api/index/userInfo')
      .then((response) => {
        if (this._unmount && balance !== response.balance) {
          this.setState({
            balance: response.balance,
          });
          console.log(response);
        }
      })
      .catch((err) => {
        console.log(err);
      })
  };

  /**
   * * 查询余额变动明细
   * @param value 非必填参数 默认null
   * @param page 页码必填 默认 1
   * @param size 每页大小必填 默认 10;
   * @returns {Promise<any>} 返回一个promise对象
   */
  getData = (
    value = this.value,
    page = this.pageCurrent,
    size = PAGE_SIZE,
  ) => new Promise((resolve) => {
    this.value = value; // 如果参数value有值 则覆盖缓存的值
    this.pageCurrent = page; // 如果参数page有值 则覆盖缓存的值
    get('/api/balance/detail', {
      page, size, ...value,
    })
      .then((response) => {
        if (this._unmount) {
          this.setState({
            data: response,
          });
          console.log(response);
          resolve(true);
        }
      })
      .catch((err) => {
        console.log(err);
        resolve(true);
      });
  });

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
    const { classes } = this.props;
    const { data, balance } = this.state;
    return (
      <>
        <div className={classes.root}>
          <div className={classes.header}>
            <span>Balance :</span>
            <span className={classes.price}>
              $
              {balance}
            </span>
            <MyButton
              variant="contained"
              color="primary"
              className={classes.headerBtn}
              onClick={this.handleClick}
            >
              Withdraw
            </MyButton>
          </div>
          {/*<MyTable*/}
          {/*  headers={balanceTableHeaders}*/}
          {/*  rows={setTableData(data.items, classes)}*/}
          {/*/>*/}
          {

            data
              ? (
                <div>aa</div>
              )
              : <div>loading...</div>
          }
          <MyPagination
            pageCurrent={1}
            total={43} // 总条数
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
