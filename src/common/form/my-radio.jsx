import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/core/styles';
import FormControl from '@material-ui/core/FormControl';
import Radio from '@material-ui/core/Radio';
import RadioGroup from '@material-ui/core/RadioGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import RadioButtonUncheckedIcon from '@material-ui/icons/RadioButtonUnchecked';
import RadioButtonCheckedIcon from '@material-ui/icons/RadioButtonChecked';

import { radioStyle } from './style';

const useStyle = makeStyles(radioStyle);

const MyRadio = (props) => {
  const { value, form } = props;

  const classes = useStyle();

  const [val, setVal] = useState(value);

  const handleChange = (event) => {
    setVal(event.target.value);
  };

  const { getFieldProps } = form;

  return (
    <FormControl
      fullWidth
      margin="normal"
      className={classes.root}
      {...getFieldProps('gender', {
        initialValue: val,
      })}
    >
      <span className={classes.label}>Gender :</span>
      <RadioGroup
        row
        aria-label="position"
        name="position"
        value={val}
        onChange={handleChange}
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
    </FormControl>
  );
};

MyRadio.propTypes = {
  form: PropTypes.objectOf(PropTypes.object).isRequired,
  value: PropTypes.string,
};

MyRadio.defaultProps = {
  value: '',
};

export default MyRadio;
