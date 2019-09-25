import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles/index';

import MyTable from '../../../common/material-ui-component/table';
import MyPagination from '../../../common/pagination/pagination';
import ViewHeight from './view-header';
import Skeleton from '../../../common/skeleton/index';

import { balanceTableHeaders, amountTable } from '../../../assets/data/default-data';
import { get } from '../../../assets/http/index';

import { viewStyle } from './style';

// 设置每一页数量
const PAGE_SIZE = 10;

@withStyles(viewStyle)
class ViewRight extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      items: [],
      total: 0,
      userInfo: null,
      loading: false,
    };
    this.pageCurrent = 1; // 当前页码 默认1;
    this.value = null; // 默认search 表单值为null
  }

  componentDidMount() {
    this._unmount = true;

    this.getUserInfo();
  }

  componentWillUnmount() {
    this._unmount = false;
  }

  // 初始化时调用, 提额完成时调用
  getUserInfo = () => {
    Promise.all([
      new Promise((resolve) => {
        this.pageCurrent = 1;
        get('/api/balance/detail', { page: this.pageCurrent, size: PAGE_SIZE })
          .then((response) => {
            resolve(response);
          });
      }),
      new Promise((resolve) => {
        get('/api/index/userInfo')
          .then((response) => {
            resolve(response);
          });
      }),
    ])
      .then((response) => {
        const [data, userInfo] = response;
        const { items, total } = data;
        if (this._unmount) {
          this.setState({
            items,
            total,
            userInfo,
            loading: true,
          });
        }
      });
  };

  /**
   * * 点击查询余额变动明细
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
        const { items, total } = response;
        this.setState({
          items,
          total,
        });
        resolve(true);
      })
      .catch(() => {
        resolve(true);
      });
  });

  // 点击分页时调用
  handlePaginationChange = (current) => {
    this.pageCurrent = current;
    this.getData().then();
  };

  render() {
    const { classes } = this.props;
    const {
      items, total, userInfo, loading,
    } = this.state;
    return (
      <div className={classes.root}>
        <Skeleton
          variant="balance"
          loading={loading}
        >
          <ViewHeight userInfo={userInfo} getUserInfo={this.getUserInfo} />
          <MyTable
            headers={balanceTableHeaders}
            rows={amountTable.setTableData(items, classes)}
          />
          <MyPagination
            pageCurrent={this.pageCurrent}
            total={total} // 总条数
            pageSize={PAGE_SIZE} // 每页条数
            change={this.handlePaginationChange} // 点击分页时调用
          />
        </Skeleton>
      </div>
    );
  }
}

ViewRight.propTypes = {
  classes: PropTypes.objectOf(PropTypes.object).isRequired,
};

export default ViewRight;
