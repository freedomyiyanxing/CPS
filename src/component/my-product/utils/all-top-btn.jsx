import React from 'react';
import PropTypes from 'prop-types';
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

const AllTopBtn = (props) => {
  const { value } = props;
  const classes = useStyle();

  const getLinks = () => {
    console.log('获取所有的选中的id', value, 'value');
  };

  return (
    <div>
      <MyButton
        variant="contained"
        color="primary"
        className={classes.root}
        onClick={getLinks}
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

AllTopBtn.propTypes = {
  value: PropTypes.objectOf(PropTypes.array).isRequired,
};

export default AllTopBtn;
