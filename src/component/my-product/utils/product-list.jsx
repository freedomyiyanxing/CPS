/* eslint-disable */
import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import { CSSTransition, TransitionGroup } from 'react-transition-group';

import { MyTableCell } from '../../../common/material-ui-compoents/table';
import MyCheckbox from '../../../common/material-ui-compoents/checkbox';
import ItemButton from './item-button';

import { getTimes, imgPath, getCheckArr } from '../../../asstes/js/utils-methods';
import { listStyle } from '../style';

@withStyles(listStyle)
class ProductList extends React.Component {
  constructor(props) {
    super(props);
    const { data } = props;
    this.state = {
      dataArr: getCheckArr(data),
      checkedAll: false,
    }
  }

  // 组件移除时
  componentWillUnmount() {
    clearTimeout(this.handle1);
    clearTimeout(this.handle2);
  }

  // 点击check全选按钮
  handleCheckAllChange = () => {
    const { getListData } = this.props;
    const { dataArr, checkedAll } = this.state;
    // 把checkArr中的check 全部设为 true
    const data = getCheckArr(dataArr, !checkedAll);

    this.setState({
      dataArr: data,
      checkedAll: !checkedAll,
    });

    // 把修改后的数据发送给 view组件
    getListData(data, !checkedAll)
  };

  // 点击单个 check 按钮
  handleCheckChange = (index) => {
    const { getListData } = this.props;
    const { dataArr, checkedAll } = this.state;
    dataArr[index].check = !dataArr[index].check;
    this.setState({
      dataArr,
    });

    // 把修改后的数据发送给 view组件
    getListData(dataArr[index]);

    // 只有当全选为真的情况下
    // (如果全选为真 且 checkArr的每一项check 都为false 就把全选的状态 变成false)
    if (checkedAll) {
      const checkedAll = dataArr.some((v) => v.check);
      this.setState({
        checkedAll,
      });
    }
  };

  // 点击单个删除
  handleDeleteClick = (id) => new Promise((resolve, reject) => {
    const { getListData } = this.props;
    this.handle1 = setTimeout(() => {
      resolve('成功删除商品: ' + id);
      const { dataArr } = this.state;
      this.setState({
        dataArr: dataArr.filter(item => item.id !== id),
      });
      // 把删除的 id 传递 view 组件做处理
      getListData(id);
    }, 1000);
  });

  // 点击单个获取商品链接
  handleGetLinks = (id) => new Promise((resolve, reject) => {
    this.handle2 = setTimeout(() => {
     console.log('id', id);
     resolve('成功商品links: ' + id);
    }, 2000);
  });


  render() {
    const { classes } = this.props;
    const { dataArr, checkedAll } = this.state;
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
          <TransitionGroup
            component={null}
          >
            {
              dataArr.map((v, i) => (
                <CSSTransition
                  key={v.id}
                  timeout={500}
                  classNames="my-product"
                >
                  <TableRow>
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
                        handleGetLinks={this.handleGetLinks}
                        handleDeleteClick={this.handleDeleteClick}
                      />
                    </MyTableCell>
                  </TableRow>
                </CSSTransition>
              ))
            }
          </TransitionGroup>
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
