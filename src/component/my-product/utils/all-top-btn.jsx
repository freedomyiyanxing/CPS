import React from 'react';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/core/styles';

import MyButton from '../../../common/material-ui-component/button';
import { get, deleteRequestBody } from '../../../asstes/http/index';

const useStyle = makeStyles(() => ({
  root: {
    padding: [[7, 24]],
    borderRadius: 2,
    '&:first-child': {
      marginRight: 10,
    },
  },
}));

const AllTopBtn = (props) => {
  const { selectArrId } = props;
  const classes = useStyle();

  // 获取所有已选中的links
  const getLinks = () => {
    get('/api/promotions/links', {
      ids: selectArrId.join(','),
    }).then((response) => {
      console.log(response);
    }).catch((err) => {
      console.log(err);
    });
  };

  // 删除所有已选中的商品
  const deleteAll = () => {
    deleteRequestBody('/api/promotions/delete', {
      ids: selectArrId.join(','),
    }).then((response) => {
      console.log(response);
    }).catch((err) => {
      console.log(err);
    });
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
        onClick={deleteAll}
      >
        Delete
      </MyButton>
    </div>
  );
};

AllTopBtn.propTypes = {
  selectArrId: PropTypes.objectOf(PropTypes.array).isRequired,
};

export default AllTopBtn;
