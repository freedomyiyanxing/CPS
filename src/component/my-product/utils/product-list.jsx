/* eslint-disable */
import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';

import { MyTableCell } from '../../../common/material-ui-compoents/table';
import MyCheckbox from '../../../common/material-ui-compoents/checkbox';
import ItemButton from './item-button';

import { getTimes, imgPath, getCheckArr } from '../../../base/js/utils-methods';
import { listStyle } from '../style';

@withStyles(listStyle)
class ProductList extends React.Component {
  constructor(props) {
    super(props);
    const { data } = props;
    this.state = {
      checkArr: getCheckArr(data),
      checkedAll: false,
    }
  }

  // 点击check全选按钮
  handleCheckAllChange = () => {
    const { getListData } = this.props;
    const { checkArr, checkedAll } = this.state;
    // 把checkArr中的check 全部设为 true
    const data = getCheckArr(checkArr, !checkedAll);
    this.setState({
      checkArr: data,
      checkedAll: !checkedAll,
    });

    // 把修改后的数据发送给 view组件
    getListData(checkArr)
  };

  // 点击单个 check 按钮
  handleCheckChange = (index) => {
    const { getListData } = this.props;
    const { checkArr, checkedAll } = this.state;
    checkArr[index].check = !checkArr[index].check;
    this.setState({
      checkArr,
    });

    // 把修改后的数据发送给 view组件
    getListData(checkArr);

    // 只有当全选为真的情况下
    // (如果全选为真 且 checkArr的每一项check 都为false 就把全选的状态 变成false)
    if (checkedAll) {
      const checkedAll = checkArr.some((v) => v.check);
      this.setState({
        checkedAll,
      });
    }
  };

  render() {
    const { classes } = this.props;
    const { checkArr, checkedAll } = this.state;
    return (
      <Table>
        <TableHead className={classes.tableHead}>
          <MyTableCell
            align="center"
            className={classes.checkbox}
          >
            <MyCheckbox checked={checkedAll} onChange={this.handleCheckAllChange} />
          </MyTableCell>
          <MyTableCell className={classes.img} />
          <MyTableCell align="left">Items Name</MyTableCell>
          <MyTableCell align="left">Price</MyTableCell>
          <MyTableCell align="left">Category</MyTableCell>
          <MyTableCell align="left">Advertising Fees</MyTableCell>
          <MyTableCell align="left">Remaining Days</MyTableCell>
          <MyTableCell align="left">Statues</MyTableCell>
          <MyTableCell />
        </TableHead>
        <TableBody className={classes.tableBody}>
          {
            checkArr.map((v, i) => (
              <TableRow key={v.id}>
                <MyTableCell align="center">
                  <MyCheckbox
                    checked={v.check}
                    onChange={() => { this.handleCheckChange(i); }}
                  />
                </MyTableCell>
                <MyTableCell align="left" >
                  <img
                    className={classes.imgWrapper}
                    src={imgPath + v.prodImg}
                    alt="product"
                  />
                </MyTableCell>
                <MyTableCell align="left">
                  <div className={classes.name}>
                    <span>{v.prodName}</span>
                    <span>{v.storeName}</span>
                  </div>
                </MyTableCell>
                <MyTableCell align="left">
                  <span className={classes.price}>$ {v.prodPrice}.00</span>
                </MyTableCell>
                <MyTableCell align="left">
                  <span className={classes.prodCateName}>{v.prodCateName}</span>
                </MyTableCell>
                <MyTableCell align="left">
                  <div className={classes.rate}>
                    <span>$ {v.brokerageAmount}.00</span>
                    <span>{v.brokerageRate}%</span>
                  </div>
                </MyTableCell>
                <MyTableCell align="left">
            <span className={classes.date}>
              {getTimes(v.endTime)}
            </span>
                </MyTableCell>
                <MyTableCell align="left">
                  <span className={classes.status}>{v.status}</span>
                </MyTableCell>
                <MyTableCell align="left">
                  <ItemButton
                    id={v.id}
                  />
                </MyTableCell>
              </TableRow>
            ))
          }
        </TableBody>
      </Table>
    );
  }
}

ProductList.propTypes = {
  data: PropTypes.objectOf(PropTypes.array).isRequired,
  classes: PropTypes.objectOf(PropTypes.object).isRequired,
  getListData: PropTypes.func.isRequired,
};

export default ProductList;
