/* eslint-disable */
import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/core/styles';

import DropDownBox from '../../../common/drop-down-box/drop-down-box';
import MyPagination from '../../../common/pagination/pagination';
import AllTopBtn from './all-top-btn';
import ProductList from './product-list';

import { myProduct } from '../../../asstes/data/default-data';
import { viewStyle } from '../style';

const useStyle = makeStyles(viewStyle);

const View = (props) => {
  const { data } = props;
  const [value, setValue] = useState(null);
  const classes = useStyle();

  // 点击全选时调用
  const getListData = (data) => {
    const arr = [];
    // 筛选出 所有选中的id
    data.forEach(v => {
      if (v.check) {
        arr.push(v.id);
      }
    });
    setValue(arr);
  };

  // 获取筛选的值
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
        <AllTopBtn value={value} />
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
