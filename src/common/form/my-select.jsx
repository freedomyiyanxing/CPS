import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/core/styles';
import FormControl from '@material-ui/core/FormControl';
import InputLabel from '@material-ui/core/InputLabel';
import FormHelperText from '@material-ui/core/FormHelperText';
import Select from '@material-ui/core/Select';
import MenuItem from '@material-ui/core/MenuItem';

import { mySelectStyle } from './style';

const useStyle = makeStyles(mySelectStyle);

const MySelect = (props) => {
  const {
    form, selectArr, name, outputName,
  } = props;
  const [names, setNames] = useState('');
  const classes = useStyle();

  const handleChange = (e) => {
    setNames(e.target.value);
  };

  const { getFieldProps, getFieldError } = form;
  const errors = getFieldError(outputName);
  return (
    <FormControl
      fullWidth
      required
      error={errors}
      margin="normal"
    >
      <InputLabel htmlFor="my-url">{name}</InputLabel>
      <Select
        value={names}
        onChange={handleChange}
        name="value"
        className={classes.root}
        MenuProps={{
          PaperProps: {
            className: classes.menu,
          },
        }}
        classes={{
          icon: classes.icon,
        }}
        {...getFieldProps(outputName, {
          validateFirst: true,
          rules: [
            {
              required: true,
              message: '我们需要 你选择类别',
            },
          ],
        })}
      >
        {
          selectArr.map(v => (
            <MenuItem key={v} value={v}>{v}</MenuItem>
          ))
        }
      </Select>
      {
        errors
          ? <FormHelperText>{errors.join(',')}</FormHelperText>
          : null
      }
    </FormControl>
  );
};

MySelect.propTypes = {
  form: PropTypes.objectOf(PropTypes.object).isRequired,
  selectArr: PropTypes.objectOf(PropTypes.array).isRequired,
  name: PropTypes.string.isRequired,
  outputName: PropTypes.string.isRequired,
};

export default MySelect;
