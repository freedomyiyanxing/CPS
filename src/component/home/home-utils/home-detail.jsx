import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';

import MyTable from '../../../common/material-ui-compoents/table';
import MyTextField from '../../../common/material-ui-compoents/text-field-input';
import MyPagination from '../../../common/pagination/pagination';

import { httpResponse } from '../home-http';
import { getDaysTime, getTime, debounce } from '../../../asstes/js/utils-methods';
import { myIndexTableHeaders, myIndexTablesBody } from '../../../asstes/data/default-data';

import { detailStyle } from './style';

@withStyles(detailStyle)
class HomeDetails extends React.Component {
  constructor(props) {
    super(props);
    const { data } = props;
    this.state = {
      data,
    };
    this.pageCurrent = 1; // 起始页默认为 1;
  }

  componentWillReceiveProps(nextProps) {
    this.setState({
      data: nextProps.data,
    });
  }

  getData() {
    const { size, time } = this.props;
    httpResponse('/api/index/statistics/detail', {
      start: time.start || getTime(getDaysTime(90)),
      end: time.end || getTime(new Date().getTime(), 'end'),
      size,
      page: this.pageCurrent,
      orderSN: this.orderSN || '',
    }).then((response) => {
      this.setState({
        data: response,
      });
    });
  }

  // 点击分页时查询推广数据明细 (表格)
  handlePaginationChange = (current) => {
    this.pageCurrent = current;
    this.getData();
  };

  // 按订单号查询推广数据明细 (表格)
  // eslint 错误是 需要把这个方法放在 constructor方法之前 个人觉得没必要
  // eslint-disable-next-line react/sort-comp
  handleOrderNumberChange = debounce((e) => {
    this.orderSN = e.target.value;
    // 当搜索查询时 把分页设置为 起始页 防止异常情况
    this.pageCurrent = 1;
    this.getData();
  });

  render() {
    const { classes, size } = this.props;
    const { data } = this.state;
    return (
      <div className={classes.root}>
        <MyTextField
          label="Order Number"
          onChange={this.handleOrderNumberChange}
        />
        <MyTable
          headers={myIndexTableHeaders}
          rows={myIndexTablesBody.setTableData(data.items)}
        />
        {
          data.items.length
            ? (
              <MyPagination
                total={data.total} // 总条数
                pageSize={size} // 每页条数
                pageCurrent={this.pageCurrent}
                change={this.handlePaginationChange} // 点击分页时调用
              />
            )
            : null
        }
      </div>
    );
  }
}

HomeDetails.propTypes = {
  classes: PropTypes.objectOf(PropTypes.object).isRequired,
  time: PropTypes.objectOf(PropTypes.object).isRequired,
  data: PropTypes.objectOf(PropTypes.array).isRequired,
  size: PropTypes.number.isRequired,
};

export default HomeDetails;
