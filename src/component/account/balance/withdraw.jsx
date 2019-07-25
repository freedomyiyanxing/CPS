import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/core/styles';
import FormControl from '@material-ui/core/FormControl';
import FormHelperText from '@material-ui/core/FormHelperText';

import MyInput from '../../../common/material-ui-component/input';
import MyButton from '../../../common/material-ui-component/button';
import { MySvgIconPaypal } from '../../../common/material-ui-component/svg-icon';
import { formPrompt } from '../../../asstes/data/prompt-text';

const useStyle = makeStyles(theme => ({
  content: {
    margin: [[20, 0]],
  },
  items: {
    display: 'flex',
    alignItems: 'center',
    height: 40,
    marginBottom: 20,
  },
  left: {
    flex: '0 0 206px',
    textAlign: 'right',
    marginRight: 22,
    fontSize: theme.typography.fontSizeLg,
  },
  right: {
    width: 272,
  },
  img: {
    '& img': {
      width: 138,
    },
  },
  all: {
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
    callback();
  };

  const compareToFormat = (rule, formVal, callback) => {
    // eslint-disable-next-line no-restricted-properties
    if (window.isNaN(formVal)) {
      callback(formPrompt.withdrawNumber);
    }
    callback();
  };

  const { getFieldProps, getFieldError } = form;
  const errors = getFieldError('withdraw');
  return (
    <div className={classes.content}>
      <div className={classes.items}>
        <span className={classes.left}>Payment Account :</span>
        <span className={`${classes.right} ${classes.img}`}>
          <MySvgIconPaypal style={{ fontSize: 130 }} />
        </span>
      </div>
      <div className={classes.items}>
        <span className={classes.left}>Account Balance :</span>
        <span className={`${classes.right} ${classes.all}`}>
          <span className={classes.price}>
            $
            {data.max.toFixed(2)}
          </span>
          <MyButton
            className={classes.links}
          >
            Widthdraw All
          </MyButton>
        </span>
      </div>
      <div className={classes.items}>
        <span className={classes.left}>Widthdraw Amount :</span>
        <FormControl
          fullWidth
          required
          error={errors}
          margin="normal"
        >
          <MyInput
            value={value}
            placeholder="请输入金额"
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
                {
                  validator: compareToFormat,
                },
              ],
            })}
          />
          {
            errors
              ? <FormHelperText>{errors.join(',')}</FormHelperText>
              : null
          }
        </FormControl>
      </div>
    </div>
  );
};

Withdraw.propTypes = {
  form: PropTypes.objectOf(PropTypes.object).isRequired,
  data: PropTypes.objectOf(PropTypes.object).isRequired,
};

export default Withdraw;
