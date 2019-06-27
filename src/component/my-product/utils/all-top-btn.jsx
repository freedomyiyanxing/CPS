import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import MyButton from '../../../common/material-ui-compoents/button';

// eslint-disable-next-line no-unused-vars
const useStyle = makeStyles(theme => ({
  root: {
    padding: [[7, 24]],
    borderRadius: 2,
    '&:first-child': {
      marginRight: 10,
    },
  },
}));

const AllTopBtn = () => {
  const classes = useStyle();
  console.log(1);
  return (
    <div>
      <MyButton
        variant="contained"
        color="primary"
        className={classes.root}
      >
        Batch Get Link
      </MyButton>
      <MyButton
        variant="contained"
        color="primary"
        className={classes.root}
      >
        Delete
      </MyButton>
    </div>
  );
};

export default AllTopBtn;
