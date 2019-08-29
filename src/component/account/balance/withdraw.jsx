import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/core/styles';
import FormControl from '@material-ui/core/FormControl';
import FormHelperText from '@material-ui/core/FormHelperText';

import MyInput from '../../../common/material-ui-component/input';
import MyButton from '../../../common/material-ui-component/button';
// import PaypalView from '../../../common/paypal/paypal-view';
import MyTooltip from '../../../common/material-ui-component/tooltip';

import { formPrompt } from '../../../assets/data/prompt-text';

const useStyle = makeStyles(theme => ({
  wrapper: {
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
    fontSize: theme.typography.fontSizeLg,
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
    fontWeight: theme.typography.fontWeight,
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
}));

const Withdraw = (props) => {
  const { form, data } = props;
  const [value, setValue] = useState('');
  const classes = useStyle();

  const change = (e) => {
    setValue(e.target.value);
  };

  const compareToMin = (rule, formVal, callback) => {
    if (formVal < data.min) {
      callback(formPrompt.withdrawMin);
    }
    if (formVal > data.max) {
      callback(formPrompt.withdrawMax);
    }
    // eslint-disable-next-line no-restricted-properties
    if (window.isNaN(formVal)) {
      callback(formPrompt.withdrawNumber);
    }
    callback();
  };

  const handleAllWithdraw = () => {
    const { setFieldsValue } = form;
    setFieldsValue({
      withdraw: data.max,
    });
  };

  const { getFieldProps, getFieldError } = form;
  const errors = getFieldError('withdraw');
  return (
    <div className={classes.wrapper}>
      <div className={classes.items}>
        <span className={classes.left}>Payment Account :</span>
        {
          /* <PaypalView data={data} className={classes.paypalWrapper} /> */
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
            value={value}
            className={classes.right}
            onChange={change}
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
          ${data.tax}
          `}
        />
      </div>
    </div>
  );
};

Withdraw.propTypes = {
  form: PropTypes.objectOf(PropTypes.object).isRequired,
  data: PropTypes.objectOf(PropTypes.object).isRequired,
};

export default Withdraw;
