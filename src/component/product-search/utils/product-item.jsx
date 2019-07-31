import React from 'react';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/core/styles/index';

import ItemButton from './item-button';
import Avatars from '../../../common/material-ui-component/avatar';

import { getTimes, setBrokerageRate } from '../../../assets/js/utils-methods';
import { itemStyle } from '../style';

const useStyle = makeStyles(itemStyle);

const ProductItems = (props) => {
  const { data } = props;
  const classes = useStyle();
  return (
    <div className={classes.root}>
      <Avatars
        photo={data.prodImg}
        classes={{
          img: classes.img,
        }}
      />
      <div className={classes.info}>
        <span className={classes.name}>{data.prodName}</span>
        <span className={classes.price}>
          <span>{data.storeName}</span>
          <span>
            $
            {data.prodPrice.toFixed(2)}
          </span>
        </span>
        <span className={classes.advertising}>
          <span>Advertising Fees :</span>
          <span className={classes.brokerage}>
            $
            {setBrokerageRate(data.prodPrice, data.brokerageRate)}
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
      <ItemButton
        id={data.id}
      />
    </div>
  );
};

ProductItems.propTypes = {
  data: PropTypes.objectOf(PropTypes.object).isRequired,
};

export default ProductItems;
