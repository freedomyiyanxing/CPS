import React from 'react';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';

import { MyTableCell } from '../../../common/material-ui-component/table';
import MyCheckbox from '../../../common/material-ui-component/checkbox';
import Avatars from '../../../common/material-ui-component/avatar';
import ItemButton from './item-button';

import { myProduct } from '../../../assets/data/default-data';
import { getViewDate } from '../../../assets/js/utils-methods';
import { listStyle } from '../style';

const useStyle = makeStyles(listStyle);

const ProductList = (props) => {
  const {
    data,
    checkedAllBool,
    handleCheckChange,
    handleDeleteClick,
    handleCheckAllChange,
  } = props;
  const classes = useStyle();

  return (
    <Table>
      <TableHead className={classes.tableHead}>
        <MyTableCell align="center">
          <MyCheckbox
            checked={checkedAllBool}
            onChange={handleCheckAllChange}
          />
        </MyTableCell>
        {
          myProduct.tableHeadText.map(items => <MyTableCell align="left">{items}</MyTableCell>)
        }
      </TableHead>
      <TableBody className={classes.tableBody}>
        {
          data.map((v, i) => (
            <TableRow>
              <MyTableCell align="center">
                <MyCheckbox
                  checked={v.check}
                  onChange={() => {
                    handleCheckChange(i, v.id);
                  }}
                />
              </MyTableCell>
              <MyTableCell align="left">
                <Avatars
                  photo={v.prodImg}
                  classes={{
                    img: classes.imgWrapper,
                  }}
                  options={{
                    width: 80,
                    height: 100,
                  }}
                />
              </MyTableCell>
              <MyTableCell align="left">
                <div className={classes.name}>
                  <span>{v.prodName}</span>
                  <span>{v.storeName}</span>
                </div>
              </MyTableCell>
              <MyTableCell align="left">
                <span className={classes.price}>
                  $
                  {v.prodPrice.toFixed(2)}
                </span>
              </MyTableCell>
              <MyTableCell align="left">
                <span className={classes.prodCateName}>{v.prodCateName}</span>
              </MyTableCell>
              <MyTableCell align="left">
                <div className={classes.rate}>
                  <span>
                    $
                    {v.brokerageAmount.toFixed(2)}
                  </span>
                  <span>
                    {v.brokerageRate}
                    %
                  </span>
                </div>
              </MyTableCell>
              <MyTableCell align="left">
                <span className={classes.date}>
                  {getViewDate(v.endTime)}
                </span>
              </MyTableCell>
              <MyTableCell align="left">
                <span className={classes.status}>{v.valid ? 'Normal' : 'Invalid'}</span>
              </MyTableCell>
              <MyTableCell align="left">
                <ItemButton
                  id={v.id}
                  promProdId={v.promProdId}
                  valid={v.valid}
                  handleDeleteClick={handleDeleteClick}
                />
              </MyTableCell>
            </TableRow>
          ))
        }
      </TableBody>
    </Table>
  );
};

ProductList.propTypes = {
  data: PropTypes.objectOf(PropTypes.array).isRequired,
  handleCheckAllChange: PropTypes.func.isRequired,
  handleCheckChange: PropTypes.func.isRequired,
  handleDeleteClick: PropTypes.func.isRequired,
  checkedAllBool: PropTypes.bool.isRequired,
};

export default ProductList;
