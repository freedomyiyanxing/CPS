import React, { createRef } from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles/index';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';

import MyTableCell from '../../../common/material-ui-compoents/tableCell';
import MyButton from '../../../common/material-ui-compoents/button';
import MyPagination from '../../../common/pagination/pagination';
import WithdrawDialog from '../../../common/withdraw-dialog/withdraw-dialog';

import { viewStyle } from './style';

function createData(name, calories, fat, carbs, protein) {
  return {
    name, calories, fat, carbs, protein,
  };
}

const rows = [
  createData('Frozen yoghurt', 159, 6.0, 24, 4.0),
  createData('Ice cream sandwich', 237, 9.0, 37, 4.3),
  createData('Eclair', 262, 16.0, 24, 6.0),
  createData('Cupcake', 305, 3.7, 67, 4.3),
  createData('Gingerbread', 356, 16.0, 49, 3.9),
  createData('哈哈哈哈哈', 356, 16.0, 49, 3.9),
];


@withStyles(viewStyle)
class ViewRight extends React.Component {
  constructor() {
    super();

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

  handlePaginationChange = (current) => {
    console.log(
      '当前选中的页数: ', current,
    );
  };

  render() {
    const { classes } = this.props;
    return (
      <>
        <WithdrawDialog ref={this.dialogRef} />
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
          <Table className={classes.table}>
            <TableHead className={classes.tableHeader}>
              <TableRow>
                <MyTableCell>Dessert (100g serving)</MyTableCell>
                <MyTableCell align="center">Calories</MyTableCell>
                <MyTableCell align="center">Fat&nbsp;(g)</MyTableCell>
                <MyTableCell align="center">Carbs&nbsp;(g)</MyTableCell>
                <MyTableCell align="center">Protein&nbsp;(g)</MyTableCell>
              </TableRow>
            </TableHead>
            <TableBody className={classes.tableBody}>
              {rows.map(row => (
                <TableRow key={row.name}>
                  <MyTableCell scope="row">{row.name}</MyTableCell>
                  <MyTableCell align="center">{row.calories}</MyTableCell>
                  <MyTableCell align="center">{row.fat}</MyTableCell>
                  <MyTableCell align="center">{row.carbs}</MyTableCell>
                  <MyTableCell align="center">{row.protein}</MyTableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
          <MyPagination
            total={435} // 总条数
            pageSize={10} // 每页条数
            change={this.handlePaginationChange} // 点击分页时调用
          />
        </div>
      </>
    );
  }
}

ViewRight.propTypes = {
  classes: PropTypes.objectOf(PropTypes.object).isRequired,
};

export default ViewRight;
