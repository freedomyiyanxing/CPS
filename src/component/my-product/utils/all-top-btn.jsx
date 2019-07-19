import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/core/styles';
import CircularProgress from '@material-ui/core/CircularProgress';

import MyButton from '../../../common/material-ui-component/button';

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
  const { handleDeleteChange, getAllLinks } = props;
  const [loading, setLoading] = useState(false);
  const [links, setLinks] = useState(false);
  const classes = useStyle();

  // 点击删除商品
  const handleClean = () => {
    setLoading(true);
    handleDeleteChange().then(() => {
      setLoading(false);
    });
  };

  // 点击删除商品
  const handleAllLinks = () => {
    setLinks(true);
    getAllLinks().then(() => {
      setLinks(false);
    });
  };

  return (
    <div>
      <MyButton
        variant="contained"
        color="primary"
        className={classes.root}
        onClick={handleAllLinks}
        loading={links}
        style={{ minWidth: 134 }}
      >
        {
          links
            ? <CircularProgress size={14} />
            : 'Batch Get Link'
        }
      </MyButton>
      <MyButton
        variant="contained"
        color="primary"
        className={classes.root}
        onClick={handleClean}
        loading={loading}
        style={{ minWidth: 88 }}
      >
        {
          loading
            ? <CircularProgress size={14} />
            : 'Delete'
        }
      </MyButton>
    </div>
  );
};

AllTopBtn.propTypes = {
  handleDeleteChange: PropTypes.func.isRequired,
  getAllLinks: PropTypes.func.isRequired,
};

export default AllTopBtn;
