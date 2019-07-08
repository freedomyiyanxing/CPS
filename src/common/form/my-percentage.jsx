import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/core/styles';
import FormControl from '@material-ui/core/FormControl';
import FormHelperText from '@material-ui/core/FormHelperText';
import InputAdornment from '@material-ui/core/InputAdornment';
import Remove from '@material-ui/icons/Remove';
import MyInput from '../material-ui-compoents/input';
import MyLabel from '../material-ui-compoents/input-label';
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

const MyPercentage = (props) => {
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

  const compareToEndPercentage = (rule, value, callback) => {
    if (value) {
      form.validateFields(['endPercentage'], { force: true });
    }
    callback();
  };

  const compareToStartPercentage = (rule, value, callback) => {
    // 获取起始价格
    const { parseInt } = window;
    const price = form.getFieldValue('startPercentage');
    if ((value && price) && parseInt(value) <= parseInt(price)) {
      callback(formPrompt.advertisingStart);
    } else {
      callback();
    }
  };

  // 限制结束佣金不得超过100
  const limitEndPercentage = (rule, value, callback) => {
    if (value && value > 100) {
      callback(formPrompt.advertisingEnd);
    } else {
      callback();
    }
  };

  const { getFieldProps, getFieldError } = form;
  const errors = getFieldError('startPercentage') || getFieldError('endPercentage');
  return (
    <FormControl
      fullWidth
      error={errors}
      margin="normal"
    >
      <MyLabel fontSize="sm" shrink>Advertising :</MyLabel>
      <div className={classes.root}>
        <MyInput
          type="text"
          value={startPrice}
          autocomplete="off"
          onChange={handleStartChange}
          endAdornment={(
            <InputAdornment
              position="end"
              className={classes.adornment}
            >
              %
            </InputAdornment>
          )}
          {...getFieldProps('startPercentage', {
            validateFirst: true,
            initialValue: '',
            rules: [
              {
                pattern: /^([0-9]{1,2})$/,
                message: formPrompt.advertisingFormat,
              },
              {
                validator: compareToEndPercentage,
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
          endAdornment={(
            <InputAdornment
              position="end"
              className={classes.adornment}
            >
              %
            </InputAdornment>
          )}
          {...getFieldProps('endPercentage', {
            validateFirst: true,
            initialValue: '',
            rules: [
              {
                pattern: /^([0-9]{1,3})$/,
                message: formPrompt.advertisingFormat,
              },
              {
                validator: limitEndPercentage,
              },
              {
                validator: compareToStartPercentage,
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

MyPercentage.propTypes = {
  form: PropTypes.objectOf(PropTypes.object).isRequired,
};

export default MyPercentage;
