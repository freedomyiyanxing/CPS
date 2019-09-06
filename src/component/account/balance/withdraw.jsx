import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/core/styles';
import FormControl from '@material-ui/core/FormControl';
import FormHelperText from '@material-ui/core/FormHelperText';

import MyInput from '../../../common/material-ui-component/input';
import MyButton from '../../../common/material-ui-component/button';
import PaypalView from '../../../common/paypal/paypal-view';
import MyTooltip from '../../../common/material-ui-component/tooltip';

import { formPrompt } from '../../../assets/data/prompt-text';

const useStyle = makeStyles(theme => ({
  wrapper: {
    width: '100%',
    padding: [[0, 40]],
  },
  items: {
    display: 'flex',
    alignItems: 'center',
    marginBottom: 20,
  },
  left: {
    flex: '0 0 33%',
    textAlign: 'right',
    marginRight: 20,
    fontSize: theme.typography.h6.fontSize,
  },
  paypalWrapper: {
    height: 64,
    padding: [[0, 14]],
  },
  all: {
    width: '100%',
    height: 40,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  price: {
    fontSize: 24,
    fontWeight: theme.typography.h6.fontWeight,
  },
  input: {
    width: '100%',
  },
  links: {
    color: theme.palette.text.secondary,
  },
  helperText: {
    position: 'absolute',
    bottom: -18,
  },
  tax: {
    fontSize: theme.typography.body1.fontSize,
    color: theme.palette.text.secondary,
  },
}));

const Withdraw = (props) => {
  const { form, data } = props;
  const [value, setValue] = useState(0);
  const classes = useStyle();

  const compareToMin = (rule, formVal, callback) => {
    const { isNaN } = Number;
    if (formVal < data.min) {
      callback(formPrompt.withdrawMin);
    } else if (formVal > data.max) {
      callback(formPrompt.withdrawMax);
    } else if (isNaN(Number(formVal))) {
      callback(formPrompt.withdrawNumber);
    } else {
      if (data.tax > 0) {
        setValue((formVal * data.tax).toFixed(2));
      }
      callback();
    }
  };

  // 点击提交全部余额
  const handleAllWithdraw = () => {
    const { setFieldsValue } = form;
    setFieldsValue({
      withdraw: data.max,
    });
    if (data.tax > 0) {
      setValue((data.max * data.tax).toFixed(2));
    }
  };

  const { getFieldProps, getFieldError } = form;
  const errors = getFieldError('withdraw');
  return (
    <div className={classes.wrapper}>
      <div className={classes.items}>
        <span className={classes.left}>Payment Account :</span>
        {
          <PaypalView
            name={data.name}
            info={data.cardNumber}
            isPaypal={data.accountType !== '1'}
            className={classes.paypalWrapper}
          />
        }
      </div>
      <div className={classes.items}>
        <span className={classes.left}>Account Balance :</span>
        <span className={classes.all}>
          <span className={classes.price}>
            $
            {data.max.toFixed(2)}
          </span>
          <MyButton
            className={classes.links}
            onClick={handleAllWithdraw}
          >
            Withdraw All
          </MyButton>
        </span>
      </div>
      <div className={classes.items}>
        <span className={classes.left}>Widthdraw Amount :</span>
        <FormControl
          fullWidth
          required
          error={errors}
          margin="none"
        >
          <MyInput
            {...getFieldProps('withdraw', {
              validateFirst: true,
              rules: [
                {
                  required: true,
                  message: formPrompt.withdrawRequired,
                },
                {
                  validator: compareToMin,
                },
              ],
            })}
            className={classes.right}
          />
          {
            errors
              ? <FormHelperText className={classes.helperText}>{errors.join(',')}</FormHelperText>
              : null
          }
        </FormControl>
        <MyTooltip
          text={`Minimun Payment Amount $
          ${data.min}
          ; Fees Rate :
          ${data.tax * 100}%
          `}
        />
      </div>
      <div className={classes.items}>
        <span className={classes.left}>Fees :</span>
        <span className={classes.tax}>
          $
          {value}
        </span>
      </div>
    </div>
  );
};

Withdraw.propTypes = {
  form: PropTypes.objectOf(PropTypes.object).isRequired,
  data: PropTypes.objectOf(PropTypes.object).isRequired,
};

export default Withdraw;
