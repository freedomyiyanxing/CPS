import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Search from '@material-ui/icons/Search';
import TextField from '@material-ui/core/TextField';

const useStyle = makeStyles(theme => ({
  field: {
    width: 300,
    marginBottom: 10,
    position: 'relative',
  },
  wrapper: {
    paddingRight: 35,
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
  iconWrapper: {
    position: 'absolute',
    right: 10,
    top: 10,
    margin: 0,
  },
}));

const MyTextField = (props) => {
  const classes = useStyle();
  return (
    <TextField
      {...props}
      className={classes.field}
      variant="outlined"
      helperText={<Search />}
      InputLabelProps={{
        className: classes.label,
      }}
      InputProps={{
        className: classes.wrapper,
        classes: {
          input: classes.input,
        },
      }}
      FormHelperTextProps={{
        className: classes.iconWrapper,
      }}
    />
  );
};

export default MyTextField;
