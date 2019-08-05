import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import InputAdornment from '@material-ui/core/InputAdornment';

import { Search } from './svg-icon';

const useStyle = makeStyles(theme => ({
  field: {
    width: 300,
    marginBottom: 10,
    position: 'relative',
  },
  wrapper: {
    padding: 0,
    '& > .MuiOutlinedInput-notchedOutline': {
      borderWidth: '1px !important',
      borderRadius: 4,
      borderColor: theme.palette.border.borderDD,
    },
  },
  input: {
    padding: [[14, 8, 8]],
  },
  label: {
    fontSize: theme.typography.fontSize,
    transform: 'translate(10px, 15px) scale(1)',
  },
  adornment: {
    marginTop: 4,
    height: '100%',
    color: theme.palette.text.secondary,
  },
}));

const MyTextField = (props) => {
  const classes = useStyle();
  return (
    <TextField
      {...props}
      className={classes.field}
      variant="outlined"
      InputLabelProps={{
        className: classes.label,
      }}
      InputProps={{
        className: classes.wrapper,
        classes: {
          input: classes.input,
        },
        endAdornment: (
          <InputAdornment
            position="start"
            className={classes.adornment}
          >
            <Search />
          </InputAdornment>
        ),
      }}
    />
  );
};

export default MyTextField;
