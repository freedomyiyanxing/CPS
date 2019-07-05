import React from 'react';
import PropTypes from 'prop-types';
import uuid from 'uuid';
import { withStyles } from '@material-ui/core/styles';
import moment from 'moment';

import MyTable from '../../../common/material-ui-compoents/table';
import MyTextField from '../../../common/material-ui-compoents/text-field-input';
import MyPagination from '../../../common/pagination/pagination';

import { detailStyle } from './style';

const headers = [
  'Order Number', 'Purdchase Time', 'Order Status', 'Product Qty',
  'Protein', 'Amount', 'Advertising fees rate', 'Earnings',
];

const orderStatus = status => (
  // eslint-disable-next-line no-nested-ternary
  status === '0'
    ? 'Created'
    : status === '1'
      ? 'Uncompleted'
      : 'Completed'
);

// 处理表格数据
const setTableData = (tables) => {
  const arr = [];
  let index = 0;
  // eslint-disable-next-line no-restricted-syntax
  for (const v of tables) {
    arr[index] = {
      id: v.id || uuid(),
      orderSN: v.orderSN,
      orderTime: moment(v.orderTime).format('YYYY-MM-DD HH:mm:ss'),
      orderStatus: orderStatus(v.orderStatus),
      prodName: v.prodName,
      purchaseQty: v.purchaseQty,
      purchaseAmount: `$ ${v.purchaseAmount}`,
      brokerageRate: `${v.brokerageRate} %`,
      brokerageAmount: `$ ${v.brokerageAmount}`,
    };
    index += 1;
  }
  return arr;
};

@withStyles(detailStyle)
class HomeDetails extends React.Component {
  render() {
    const {
      classes, data, size, onChangePage, onChangeOrderNumber,
    } = this.props;
    return (
      <div className={classes.root}>
        <MyTextField
          label="Order Number"
          onChange={onChangeOrderNumber}
        />
        <MyTable
          headers={headers}
          rows={setTableData(data.items)}
        />
        <MyPagination
          total={data.total} // 总条数
          pageSize={size} // 每页条数
          change={onChangePage} // 点击分页时调用
        />
      </div>
    );
  }
}

HomeDetails.propTypes = {
  classes: PropTypes.objectOf(PropTypes.object).isRequired,
  data: PropTypes.objectOf(PropTypes.array).isRequired,
  size: PropTypes.number.isRequired,
  onChangePage: PropTypes.func.isRequired,
  onChangeOrderNumber: PropTypes.func.isRequired,
};

export default HomeDetails;
