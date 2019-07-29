import React from 'react';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/core/styles';
import IconButton from '@material-ui/core/IconButton';

import {
  MySvgIconSocialPaypal,
  MySvgIconDelete,
} from '../material-ui-component/svg-icon';

const useStyle = makeStyles(theme => ({
  palpayWrapper: {
    width: '100%',
    display: 'flex',
    alignItems: 'center',
    padding: [[0, 40, 0, 20]],
    background: theme.palette.primary[100],
    border: `1px solid ${theme.palette.border.borderEf}`,
    borderRadius: 4,
  },
  paypalIcon: {
    fontSize: 38,
  },
  textWrapper: {
    height: 48,
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'space-between',
    marginLeft: 10,
    minWidth: 0,
    '& > h2': {
      lineHeight: '22px',
      textOverflow: 'ellipsis',
      whiteSpace: 'nowrap',
      overflow: 'hidden',
      fontSize: theme.typography.fontSizeMd,
      color: theme.palette.text.primary,
    },
    '& > p': {
      lineHeight: '18px',
      fontSize: theme.typography.fontSize,
      color: theme.palette.text.secondary,
      textOverflow: 'ellipsis',
      whiteSpace: 'nowrap',
      overflow: 'hidden',
    },
  },
  iconButton: {
    position: 'absolute',
    right: 0,
    '&:hover': {
      background: 'none',
    },
  },
  icon: {
    fontSize: theme.typography.fontSize,
    color: theme.palette.text.secondary,
  },
}));

const PaypalView = (props) => {
  const { data, handleDelete, className } = props;
  const classes = useStyle();
  const { paypalName, paypalEmail } = data;
  return (
    <div className={`${classes.palpayWrapper} ${className}`}>
      <MySvgIconSocialPaypal className={classes.paypalIcon} />
      <div className={classes.textWrapper}>
        <h2>{paypalName}</h2>
        <p>{paypalEmail}</p>
      </div>
      {
        handleDelete
          ? (
            <IconButton
              className={classes.iconButton}
              onClick={handleDelete}
            >
              <MySvgIconDelete className={classes.icon} />
            </IconButton>
          )
          : null
      }
    </div>
  );
};

PaypalView.propTypes = {
  data: PropTypes.objectOf(PropTypes.object).isRequired,
  handleDelete: PropTypes.func,
  className: PropTypes.string,
};

PaypalView.defaultProps = {
  handleDelete: null,
  className: '',
};

export default PaypalView;