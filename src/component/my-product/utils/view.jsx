/* eslint-disable */
import React, { useState } from 'react';
import PropTypes from 'prop-types';
import uuid from 'uuid';
import { makeStyles } from '@material-ui/core/styles';

import DropDownBox from '../../../common/drop-down-box/drop-down-box';
import MyPagination from '../../../common/pagination/pagination';
import AllTopBtn from './all-top-btn';
import ProductList from './product-list';

import { viewStyle } from '../style';

const selects = [
  {
    uuid: uuid(),
    name: 'Selected Date: default',
    value: 'dateDesc',
  },
  {
    uuid: uuid(),
    name: 'Selected Date: Old to New',
    value: 'dateAsc',
  },
  {
    uuid: uuid(),
    name: 'Ad Fees Rate: High to Low',
    value: 'rateDesc',
  },
  {
    uuid: uuid(),
    name: 'Ad Fees Rate: Low to High',
    value: 'rateAsc',
  },
  {
    uuid: uuid(),
    name: 'Alphabetically: A-Z',
    value: 'nameDesc',
  },
  {
    uuid: uuid(),
    name: 'Alphabetically: Z-A',
    value: 'nameAsc',
  },
];


const useStyle = makeStyles(viewStyle);
const View = (props) => {
  const { data } = props;
  const classes = useStyle();

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
        <AllTopBtn />
        <DropDownBox
          selects={selects}
          onChange={handleSelectChange}
        />
      </div>
      <ProductList data={data.items} />
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
