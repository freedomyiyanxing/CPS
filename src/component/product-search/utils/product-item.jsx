import React from 'react';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/core/styles/index';

import ItemButton from './item-button';
import Avatars from '../../../common/material-ui-component/avatar';
import { Store, AlarmClock, Purse } from '../../../common/material-ui-component/svg-icon';

import { getViewDate, setBrokerageRate } from '../../../assets/js/utils-methods';
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
        options={{
          width: 250,
          height: 312,
        }}
      />
      <div className={classes.info}>
        <span className={classes.items}>
          <span>{data.prodName}</span>
          <span>
            $
            {data.prodPrice.toFixed(2)}
          </span>
        </span>
        <span className={`${classes.items} ${classes.price}`}>
          <span>
            <Purse className={classes.purseIcon} />
            <span className={classes.text}>
              $
              {setBrokerageRate(data.prodPrice, data.brokerageRate)}
              &nbsp;&nbsp;
              {data.brokerageRate}
              %
            </span>
          </span>
          <span>
            <AlarmClock className={classes.purseIcon} />
            <span className={classes.text}>
              {getViewDate(data.endTime)}
            </span>
          </span>
        </span>
        <span className={classes.items}>
          <span className={classes.store}>
            <Store className={classes.storeIcon} />
            <span>{data.storeName}</span>
          </span>
          <span />
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
