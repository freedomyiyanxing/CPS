/* eslint-disable */
import React from 'react';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Checkbox from '@material-ui/core/Checkbox';

import { MyTableCell } from '../../../common/material-ui-compoents/table';
import MyCheckbox from '../../../common/material-ui-compoents/checkbox';

import { listStyle } from '../style';

const useStyles = makeStyles(listStyle);

const imgPath = 'https://cdn.influmonsters.com/fit-in/250x313/filters:fill(fff)';

const ProductList = (props) => {
  const { data } = props;
  const classes = useStyles();
  console.log(props.data);

  const handleCheckChange = (check) => {
    console.log(check)
  };

  return (
    <Table>
      <TableHead>
        <MyTableCell
          align="center"
          className={classes.checkbox}
        >
          <MyCheckbox onChange={handleCheckChange} />
        </MyTableCell>
        <MyTableCell className={classes.img} />
        <MyTableCell
          align="left"
          className={classes.name}
        >
          Items Name
        </MyTableCell>
        <MyTableCell align="left">Price</MyTableCell>
        <MyTableCell align="left">Category</MyTableCell>
        <MyTableCell align="left">Advertising Fees</MyTableCell>
        <MyTableCell align="left">Remaining Days</MyTableCell>
        <MyTableCell align="left">Statues</MyTableCell>
        <MyTableCell />
      </TableHead>
      <TableBody className={classes.tableBody}>
        <TableRow>
          <MyTableCell align="center">
            <MyCheckbox onChange={handleCheckChange} />
          </MyTableCell>
          <MyTableCell align="left" >
            <img
              className={classes.imgWrapper}
              src={imgPath + data[0].prodImg}
              alt="product"
            />
          </MyTableCell>
          <MyTableCell align="left">
            <span>{data[0].prodName}</span>
            <span>{data[0].storeName}</span>
          </MyTableCell>
          <MyTableCell align="left">
            <span>$ {data[0].prodPrice}.00</span>
          </MyTableCell>
          <MyTableCell align="left">
            {data[0].status}
          </MyTableCell>
          <MyTableCell align="left">
            <span>$ {data[0].brokerageAmount}.00</span>
            <span>{data[0].brokerageRate}%</span>
          </MyTableCell>
          <MyTableCell align="left">
            20 Days
          </MyTableCell>
          <MyTableCell align="left">
            {data[0].status}
          </MyTableCell>
          <MyTableCell align="left">
            按钮
          </MyTableCell>
        </TableRow>
      </TableBody>
    </Table>
  );
};

ProductList.propTypes = {
  data: PropTypes.objectOf(PropTypes.array).isRequired,
};

export default ProductList;
