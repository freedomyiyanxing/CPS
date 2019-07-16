import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/core/styles';
import FormControl from '@material-ui/core/FormControl';
import FormHelperText from '@material-ui/core/FormHelperText';
import InputAdornment from '@material-ui/core/InputAdornment';
import Remove from '@material-ui/icons/Remove';
import MyInput from '../material-ui-component/input';
import MyLabel from '../material-ui-component/input-label';
import { formPrompt } from '../../asstes/data/prompt-text';

const useStyle = makeStyles(theme => ({
  root: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: 16,
    '& > div': {
      maxWidth: 140,
    },
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
      form.validateFields(['priceHigh'], { force: true });
    }
    callback();
  };

  const compareToStartPrice = (rule, value, callback) => {
    // 获取起始价格
    const { parseInt } = window;
    const price = form.getFieldValue('priceLow');
    if ((value && price) && parseInt(value) <= parseInt(price)) {
      callback(formPrompt.priceValidator);
    } else {
      callback();
    }
  };

  const { getFieldProps, getFieldError } = form;
  const errors = getFieldError('priceLow') || getFieldError('priceHigh');
  return (
    <FormControl
      fullWidth
      error={errors}
      margin="normal"
    >
      <MyLabel fontSize="sm" shrink>Price :</MyLabel>
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
          {...getFieldProps('priceLow', {
            validateFirst: true,
            initialValue: '',
            rules: [
              {
                pattern: /^([0-9]{1,4})$/,
                message: formPrompt.priceFormat,
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
          {...getFieldProps('priceHigh', {
            validateFirst: true,
            initialValue: '',
            rules: [
              {
                pattern: /^([0-9]{1,5})$/,
                message: formPrompt.priceFormat,
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
