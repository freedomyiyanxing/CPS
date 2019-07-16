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

const MyPercentage = (props) => {
  const { form } = props;
  const classes = useStyle();
  const [rateLow, setRateLow] = useState('');
  const [rateHigh, setRateHigh] = useState('');

  const handleStartChange = (e) => {
    setRateLow(e.target.value);
  };

  const handleEndChange = (e) => {
    setRateHigh(e.target.value);
  };

  const compareToEndPercentage = (rule, value, callback) => {
    if (value) {
      form.validateFields(['rateHigh'], { force: true });
    }
    callback();
  };

  const compareToStartPercentage = (rule, value, callback) => {
    // 获取起始价格
    const { parseInt } = window;
    const price = form.getFieldValue('rateLow');
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
  const errors = getFieldError('rateLow') || getFieldError('rateHigh');
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
          value={rateLow}
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
          {...getFieldProps('rateLow', {
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
          value={rateHigh}
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
          {...getFieldProps('rateHigh', {
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
