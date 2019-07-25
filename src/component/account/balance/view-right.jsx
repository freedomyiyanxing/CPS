/* eslint-disable */
import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles/index';

import MyTable from '../../../common/material-ui-component/table';
import MyPagination from '../../../common/pagination/pagination';
import ViewHeight from './view-header';

import { balanceTableHeaders, amountTable } from '../../../asstes/data/default-data';
import { get } from '../../../asstes/http/index';

import { viewStyle } from './style';

// 设置每一页数量
const PAGE_SIZE = 10;

@withStyles(viewStyle)
class ViewRight extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      data: null,
      userInfo: null,
      loading: true,
    };
    this.pageCurrent = 1; // 当前页码 默认1;
    this.value = null; // 默认search 表单值为null
  }

  componentDidMount() {
    this._unmount = true;

    // 初始化时调用
    Promise.all([
      new Promise((resolve) => {
        get('/api/balance/detail', { page: 1, size: PAGE_SIZE, })
          .then((response) => {
            resolve(response);
          })
          .catch((err) => {
            console.log(err);
          })
      }),
      new Promise((resolve) => {
        get('/api/index/userInfo')
          .then((response) => {
            resolve(response)
          })
          .catch((err) => {
            console.log(err);
          })
      }),
    ])
      .then((response) => {
        const [data, userInfo] = response;
        if (this._unmount) {
          this.setState({
            data,
            userInfo,
            loading: false,
          });
        }
      })
      .catch((err) => {
        console.log(err);
      })
  }

  componentWillUnmount() {
    this._unmount = false;
  }

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
        this.setState({
          data: response,
        });
        console.log(response);
        resolve(true);
      })
      .catch((err) => {
        console.log(err);
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
    const { data, userInfo, loading } = this.state;
    return (
      <div className={classes.root}>
        {
          loading
            ? <div>loading....</div>
            : (
              <>
                <ViewHeight userInfo={userInfo} />
                <MyTable
                  headers={balanceTableHeaders}
                  rows={amountTable.setTableData(data.items, classes)}
                />
                <MyPagination
                  pageCurrent={this.pageCurrent}
                  total={data.total} // 总条数
                  pageSize={PAGE_SIZE} // 每页条数
                  change={this.handlePaginationChange} // 点击分页时调用
                />
              </>
            )
        }
      </div>
    );
  }
}

ViewRight.propTypes = {
  classes: PropTypes.objectOf(PropTypes.object).isRequired,
};

export default ViewRight;
