/* eslint-disable */
import React from 'react';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/core/styles';

import DropDownBox from '../../../common/drop-down-box/drop-down-box';
import MyPagination from '../../../common/pagination/pagination';
import AllTopBtn from './all-top-btn';
import ProductList from './product-list';

import { myProduct } from '../../../asstes/data/default-data';
import { viewStyle } from '../style';

const useStyle = makeStyles(viewStyle);

// 装着选中的ID
const selectArrId = [];

const View = (props) => {
  const { data } = props;
  const classes = useStyle();

  // 处理选中的ID
  const getListData = (data, check) => {
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
  const handleSelectChange = (v) => {
    console.log(v);
  };

  // 点击分页时调用
  const handlePaginationChange = (current) => {
    console.log(current);
  };

  return (
    <div className={classes.root}>
      <div className={classes.header}>
        <AllTopBtn selectArrId={selectArrId} />
        <DropDownBox
          selects={myProduct.productSort}
          onChange={handleSelectChange}
        />
      </div>
      <ProductList
        data={data.items}
        getListData={getListData}
      />
      <MyPagination
        total={435} // 总条数
        pageSize={10} // 每页条数
        change={handlePaginationChange} // 点击分页时调用
      />
    </div>
  );
};

View.propTypes = {
  data: PropTypes.objectOf(PropTypes.object).isRequired,
};

export default View;
