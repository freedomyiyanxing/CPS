import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/core/styles';
import FormControl from '@material-ui/core/FormControl';
import FormHelperText from '@material-ui/core/FormHelperText';
import InputAdornment from '@material-ui/core/InputAdornment';
import Remove from '@material-ui/icons/Remove';
import MyInput from '../material-ui-compoents/input';

const useStyle = makeStyles(theme => ({
  root: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: 4,
    '& > div': {
      maxWidth: 140,
    },
  },
  label: {
    transform: 'translate(0, 1.5px) scale(0.75)',
    transformOrigin: 'top left',
    fontSize: theme.typography.fontSizeMd,
    color: theme.palette.text.secondary,
  },
  icon: {
    fontSize: theme.typography.fontSize,
    color: theme.palette.text.secondary,
  },
}));

const MyPrice = (props) => {
  const { form } = props;
  const classes = useStyle();
  const [startPrice, setStartPrice] = useState('');
  const [endPrice, setEndPrice] = useState('');

  const handleStartChange = (e) => {
    setStartPrice(e.target.value);
  };

  const handleEndChange = (e) => {
    setEndPrice(e.target.value);
  };

  const compareToEndPrice = (rule, value, callback) => {
    if (value) {
      form.validateFields(['endPrice'], { force: true });
    }
    callback();
  };

  const compareToStartPrice = (rule, value, callback) => {
    // 获取起始价格
    const price = form.getFieldValue('startPrice');
    // eslint-disable-next-line radix
    if ((value && price) && parseInt(value) <= parseInt(price)) {
      // eslint-disable-next-line standard/no-callback-literal
      callback('起始价格必须 小于 结尾价格');
    } else {
      callback();
    }
  };

  const { getFieldProps, getFieldError } = form;
  const errors = getFieldError('startPrice') || getFieldError('endPrice');
  return (
    <FormControl
      fullWidth
      error={errors}
      margin="normal"
    >
      <span className={classes.label}>Price :</span>
      <div className={classes.root}>
        <MyInput
          type="text"
          value={startPrice}
          autocomplete="off"
          onChange={handleStartChange}
          startAdornment={(
            <InputAdornment
              position="start"
              className={classes.adornment}
            >
              $
            </InputAdornment>
          )}
          {...getFieldProps('startPrice', {
            validateFirst: true,
            initialValue: '',
            rules: [
              {
                pattern: /^([0-9]{1,4})$/,
                message: '开始价格 我们需要有效的 数字',
              },
              {
                validator: compareToEndPrice,
              },
            ],
          })}
        />
        <Remove className={classes.icon} />
        <MyInput
          type="text"
          value={endPrice}
          autocomplete="off"
          onChange={handleEndChange}
          startAdornment={(
            <InputAdornment
              position="start"
              className={classes.adornment}
            >
              $
            </InputAdornment>
          )}
          {...getFieldProps('endPrice', {
            validateFirst: true,
            initialValue: '',
            rules: [
              {
                pattern: /^([0-9]{1,5})$/,
                message: ' 结束 价格 我们需要有效的 数字',
              },
              {
                validator: compareToStartPrice,
              },
            ],
          })}
        />
      </div>
      {
        errors
          ? <FormHelperText>{errors.join(',')}</FormHelperText>
          : null
      }
    </FormControl>
  );
};

MyPrice.propTypes = {
  form: PropTypes.objectOf(PropTypes.object).isRequired,
};

export default MyPrice;
