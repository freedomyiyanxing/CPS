/* eslint-disable */
import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';

import DropDownBox from '../../../common/drop-down-box/drop-down-box';
import MyPagination from '../../../common/pagination/pagination';
import EmptyPage from '../../../common/empty/index';
import ProductItems from './product-item';

import { storeProduct } from '../../../asstes/data/default-data';
import { get } from '../../../asstes/http/index';
import { viewStyle } from '../style';

const PAGE_SIZE = 8; // 分页每一页条数

@withStyles(viewStyle)
class View extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      data: null,
    };
    this.sort = storeProduct.productSort[0].value; // 默认排序的值
    this.pageCurrent = 1; // 当前页码 默认1;
    this.value = null; // 默认search 表单值为null
  }

  componentDidMount() {
    this._unmount = true;
    this.getData().then();
  }

  componentWillUnmount() {
    this._unmount = false;
  }

  /**
   * * 查询推广商品
   * @param value 非必填参数 默认null
   * @param page 页码必填 默认 1
   * @param size 每页大小必填 默认 10;
   * @param sortBy 排序参数 默认 dateDesc;
   * @returns {Promise<any>} 返回一个promise对象
   */
  getData = (
    value = this.value,
    page = this.pageCurrent,
    size = PAGE_SIZE,
    sortBy = this.sort
  ) => new Promise((resolve) => {
    this.value= value; // 如果参数value有值 则覆盖缓存的值
    this.pageCurrent = page; // 如果参数page有值 则覆盖缓存的值
    get('/api/promotions/all', {
      page, size, ...value, sortBy,
    })
      .then((response) => {
        if (this._unmount) {
          this.setState({
            data: response,
          });
          resolve(true);
        }
      })
      .catch((err) => {
        console.log(err);
        resolve(true);
      });
  });

  // 获取筛选的值
  handleSelectChange = (v) => {
    this.sort = v;
    this.getData().then();
  };

  // 点击分页时调用
  handlePaginationChange = (current) => {
    this.pageCurrent = current;
    this.getData().then();
  };

  render() {
    const { classes } = this.props;
    const { data } = this.state;
    return (
      <div className={classes.root}>
        <div className={classes.header}>
          <DropDownBox
            selects={storeProduct.productSort}
            onChange={this.handleSelectChange}
          />
        </div>
        {
          data
            ? (
              <>
                <div className={classes.wrapper}>
                  {
                    data.items.length
                     ? (
                        data.items.map(v => (
                          <ProductItems
                            data={v}
                            key={v.id}
                          />
                        ))
                      )
                      : <EmptyPage title="暂无数据" height={375} />
                  }
                </div>
                <MyPagination
                  total={data.total} // 总条数
                  pageSize={PAGE_SIZE} // 每页条数
                  pageCurrent={this.pageCurrent}
                  change={this.handlePaginationChange} // 点击分页时调用
                />
              </>
            )
            : <div>loading.....</div>
        }
      </div>
    );
  }
}

View.propTypes = {
  classes: PropTypes.objectOf(PropTypes.object).isRequired,
};

export default View;
