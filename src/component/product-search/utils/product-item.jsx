import React from 'react';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/core/styles/index';
import ItemButton from './item-button';

import { getTimes, imgPath } from '../../../base/js/utils-methods';
import { itemStyle } from '../style';

const useStyle = makeStyles(itemStyle);

const ProductItems = (props) => {
  const { data } = props;
  const classes = useStyle();
  return (
    <div className={classes.root}>
      <div className={classes.img}>
        <img src={imgPath + data.prodImg} alt="product" />
      </div>
      <div className={classes.info}>
        <span className={classes.name}>{data.prodName}</span>
        <span className={classes.price}>
          <span>YOZRA</span>
          <span>
            $
            {data.prodPrice}
          </span>
        </span>
        <span className={classes.advertising}>
          <span>Advertising Fees :</span>
          <span className={classes.brokerage}>
            $
            {(data.prodPrice / data.brokerageRate).toFixed(2)}
          </span>
          <span className={classes.rate}>
            {data.brokerageRate}
            %
          </span>
        </span>
        <span className={classes.date}>
          <span>Remaining Days :</span>
          <span>{getTimes(data.endTime)}</span>
        </span>
      </div>
      <ItemButton />
    </div>
  );
};

ProductItems.propTypes = {
  data: PropTypes.objectOf(PropTypes.object).isRequired,
};

export default ProductItems;
