import React from 'react';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/core/styles';

import DropDownBox from '../../../common/drop-down-box/drop-down-box';
import ProductItems from './product-item';
import MyPagination from '../../../common/pagination/pagination';

import { storeProduct } from '../../../asstes/data/default-data';
import { viewStyle } from '../style';

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
        <DropDownBox
          selects={storeProduct.productSort}
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
