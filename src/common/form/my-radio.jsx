/* eslint-disable */
import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/core/styles';
import Radio from '@material-ui/core/Radio';
import RadioGroup from '@material-ui/core/RadioGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import RadioButtonUncheckedIcon from '@material-ui/icons/RadioButtonUnchecked';
import RadioButtonCheckedIcon from '@material-ui/icons/RadioButtonChecked';

import { radioStyle } from './style';

const useStyle = makeStyles(radioStyle);

const MyRadio = (props) => {
  const { value, getGender } = props;

  const classes = useStyle();

  const [val, setVal] = useState(value);

  const handleChange = (event) => {
    setVal(event.target.value);
    getGender(event.target.value)
  };

  return (
    <div className={classes.root}>
      <span className={classes.label}>Gender :</span>
      <RadioGroup
        aria-label="position"
        name="position"
        value={val}
        onChange={handleChange}
        row
      >
        <FormControlLabel
          value="Male"
          control={(
            <Radio
              color="primary"
              icon={<RadioButtonUncheckedIcon className={classes.icon} />}
              checkedIcon={<RadioButtonCheckedIcon className={classes.icon} />}
            />
          )}
          label="Male"
          labelPlacement="end"
        />
        <FormControlLabel
          value="Female"
          control={(
            <Radio
              color="primary"
              icon={<RadioButtonUncheckedIcon className={classes.icon} />}
              checkedIcon={<RadioButtonCheckedIcon className={classes.icon} />}
            />
          )}
          label="Female"
          labelPlacement="end"
        />
      </RadioGroup>
    </div>
  );
};

MyRadio.propTypes = {
  value: PropTypes.string,
  getGender: PropTypes.func.isRequired,
};

MyRadio.defaultPoprs = {
  value: '',
};

export default MyRadio;
