/* eslint-disable */
import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';

import DropDownBox from '../../../common/drop-down-box/drop-down-box';
import MyPagination from '../../../common/pagination/pagination';
import AllTopBtn from './all-top-btn';
import ProductList from './product-list';

import { get } from '../../../asstes/http/index';
import { myProduct } from '../../../asstes/data/default-data';
import { viewStyle } from '../style';

// 装着选中的ID
const selectArrId = [];

const PAGE_SIZE = 5; // 分页每一页条数

@withStyles(viewStyle)
class View extends React.Component{
  constructor(props) {
    super(props);
    this.state = {
      data: null,
    };

    this.sort = myProduct.productSort[0].value;
    this.pageCurrent = 1;
    this.value = null; // 默认search 表单值为null
  }

  componentDidMount() {
    this._unmount = true;
    this.getData().then();
  }

  componentWillUnmount() {
    this._unmount = false;
  }

  //
  getData = (
    value = this.value,
    page = this.pageCurrent,
    size = PAGE_SIZE,
    sortBy = this.sort
  ) => new Promise((resolve) => {
    get('/api/promotions/my', {
      page, size, ...value, sortBy,
    }).then((response) => {
      if (this._unmount) {
        this.setState({
          data: response,
        });
        resolve(true);
      }
    })
  });

  // 处理选中的ID
  getListData = (data, check) => {
    // 点击checkAll全选时调用
    if (Array.isArray(data)) {
      if (check) {
        if (selectArrId.length) {
          selectArrId.length = 0;
        }
        data.forEach(item => {
          selectArrId.push(item.id);
        });
      } else {
        selectArrId.length = 0;
      }
      return;
    }

    // 单个点击check
    if (typeof data === 'object') {
      if (data.check) {
        selectArrId.push(data.id);
      } else {
        selectArrId.forEach((item, index) => {
          if(item === data.id) {
            selectArrId.splice(index, 1);
          }
        })
      }
    }

    // 删除时调用
    if (typeof data === 'string') {
      if (selectArrId.length) {
        selectArrId.forEach((item, index) => {
          if (item === data) {
            selectArrId.splice(index, 1)
          }
        });
      }
    }
  };

  // 获取筛选排序的值
  handleSelectChange = (v) => {
    this.sort = v;
    this.getData().then();
  };

  // 点击分页时调用
  handlePaginationChange = (current) => {
    console.log(current);
  };

  render() {
    const { classes } = this.props;
    const { data } = this.state;
    console.log(data);
    return (
      <div className={classes.root}>
        <div className={classes.header}>
          <AllTopBtn selectArrId={selectArrId} />
          <DropDownBox
            selects={myProduct.productSort}
            onChange={this.handleSelectChange}
          />
        </div>
        {
          data
            ? (
              <>
                <ProductList
                  data={data.items}
                  getListData={this.getListData}
                />
                <MyPagination
                  total={data.total} // 总条数
                  pageSize={PAGE_SIZE} // 每页条数
                  pageCurrent={this.pageCurrent}
                  change={this.handlePaginationChange} // 点击分页时调用
                />
              </>
            )
            : <div>loading....</div>
        }
      </div>
    );
  }
}

View.propTypes = {
  classes: PropTypes.objectOf(PropTypes.object).isRequired,
};

export default View;
