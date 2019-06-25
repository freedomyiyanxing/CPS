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
    const price = form.getFieldValue('startPercentage');
    // eslint-disable-next-line radix
    if ((value && price) && parseInt(value) <= parseInt(price)) {
      // eslint-disable-next-line standard/no-callback-literal
      callback('起始佣金必须 小于 结尾佣金');
    } else {
      callback();
    }
  };

  // 限制结束佣金不得超过100
  const limitEndPercentage = (rule, value, callback) => {
    if (value && value > 100) {
      // eslint-disable-next-line standard/no-callback-literal
      callback('佣金 比例 不许 超过 100%');
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
      <span className={classes.label}>Advertising :</span>
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
                message: '开始佣金 我们需要有效的 数字',
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
                message: ' 结束 佣金 我们需要有效的 数字',
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
