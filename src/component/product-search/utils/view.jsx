import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';

import Skeleton from '../../../common/skeleton/index';
import DropDownBox from '../../../common/drop-down-box/drop-down-box';
import MyPagination from '../../../common/pagination/pagination';
import EmptyPage from '../../../common/empty/index';
import ProductItems from './product-item';

import { storeProduct } from '../../../assets/data/default-data';
import { get } from '../../../assets/http/index';
import { viewStyle } from '../style';

const PAGE_SIZE = 8; // 分页每一页条数

@withStyles(viewStyle)
class View extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      items: [],
      total: 0,
      loading: false,
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
   * @param sort 排序参数 默认 dateDesc;
   * @returns {Promise<any>} 返回一个promise对象
   */
  getData = (
    value = this.value,
    page = this.pageCurrent,
    size = PAGE_SIZE,
    sort = this.sort,
  ) => new Promise((resolve) => {
    this.value = value; // 如果参数value有值 则覆盖缓存的值
    this.pageCurrent = page; // 如果参数page有值 则覆盖缓存的值
    get('/api/promotions/all', {
      page, size, ...value, sort,
    })
      .then((response) => {
        const { total, items } = response;
        if (this._unmount) {
          this.setState({
            items,
            total,
            loading: true,
          });
          resolve(true);
        }
      })
      .catch(() => {
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
    const { items, total, loading } = this.state;
    return (
      <div className={classes.root}>
        <div className={classes.header}>
          <DropDownBox
            selects={storeProduct.productSort}
            onChange={this.handleSelectChange}
          />
        </div>
        <Skeleton
          loading={loading}
          variant="product"
        >
          <div className={classes.wrapper}>
            {
              items.length
                ? (
                  items.map(v => (
                    <ProductItems
                      data={v}
                      key={v.id}
                    />
                  ))
                )
                : <EmptyPage height={375} />
            }
          </div>
          <MyPagination
            total={total} // 总条数
            pageSize={PAGE_SIZE} // 每页条数
            pageCurrent={this.pageCurrent}
            change={this.handlePaginationChange} // 点击分页时调用
          />
        </Skeleton>
      </div>
    );
  }
}

View.propTypes = {
  classes: PropTypes.objectOf(PropTypes.object).isRequired,
};

export default View;
