/* eslint-disable */
import React from 'react';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/core/styles';
import ItemButton from './item-button';


const imgPath = 'https://cdn.influmonsters.com/fit-in/250x313/filters:fill(fff)';

const useStyle = makeStyles(theme => ({
  root: {
    width: '24.2%',
    marginBottom: 10,
    marginRight: '1%',
    background: theme.palette.primary[50],
    '&:nth-child(4n)': {
      marginRight: 0,
    },
    '&:hover': {
      boxShadow: theme.shadows[5],//'0px 0px 1px 0px rgba(0,0,0,1)',
    },
  },
  img: {
    display: 'flex',
  },
  info: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    padding: [[0, 10]],
    color: theme.palette.text.primary,
  },
  name: {
    width: '100%',
    lineHeight: '26px',
    overflow: 'hidden',
    whiteSpace: 'nowrap',
    textOverflow: 'ellipsis',
    textAlign: 'center',
    fontSize: theme.typography.fontSizeMd,
    fontWeight: theme.typography.fontWeight,
  },
  price: {
    lineHeight: '26px',
    fontSize: theme.typography.fontSizeMd,
    '& span:first-child': {
      marginRight: 10,
    },
  },
  advertising: {
    display: 'flex',
    alignItems: 'center',
    height: 24,
    fontSize: theme.typography.fontSize,
  },
  brokerage: {
    margin: [[0, 6, 0, 10]],
    fontWeight: theme.typography.fontWeight,
    color: theme.palette.error[500],
  },
  rate: {
    color: theme.palette.error[500],
  },
  date: {
    lineHeight: '24px',
    fontSize: theme.typography.fontSize,
    '& span:last-child': {
      marginLeft: 10,
      fontSize: theme.typography.fontSizeMd,
    },
  },
}));

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
          <span>$ {data.prodPrice}</span>
        </span>
        <span className={classes.advertising}>
          <span>Advertising Fees :</span>
          <span className={classes.brokerage}>
            ${(data.prodPrice / data.brokerageRate).toFixed(2)}
          </span>
          <span className={classes.rate}>{data.brokerageRate}%</span>
        </span>
        <span className={classes.date}>
          <span>Remaining Days :</span>
          <span>1 Days</span>
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
