/* eslint-disable */
import React, { useState } from 'react';
import PropTypes from 'prop-types';
import uuid from 'uuid';
import { makeStyles } from '@material-ui/core/styles';

import DropDownBox from '../../../common/drop-down-box/drop-down-box';
import ProductItems from '../../../common/product-item/product-item';

import { viewStyle } from '../style';

const selects = [
  {
    uuid: uuid(),
    name: 'Date: New to Old',
    value: 'dateDesc',
  },
  {
    uuid: uuid(),
    name: 'Date: Old to New',
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
    name: 'Price: High to Low',
    value: 'priceDesc',
  },
  {
    uuid: uuid(),
    name: 'Price: Low to High',
    value: 'priceAsc',
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
  console.log(data);

  // 获取筛选的值
  const handleSelectChange = (v) => {
    console.log(v);
  };


  return (
    <div className={classes.root}>
      <div className={classes.header}>
        <DropDownBox
          selects={selects}
          onChange={handleSelectChange}
        />
      </div>
      <div className={classes.wrapper}>
        {
          data.items.map(v => (
            <ProductItems data={v} key={v.id} />
          ))
        }
      </div>
    </div>
  );
};

View.propTypes = {
  data: PropTypes.objectOf(PropTypes.object).isRequired,
};

export default View;
