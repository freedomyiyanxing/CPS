import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/core/styles';

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
    }).catch(() => {
      setLoading(false);
    });
  };

  // 点击批量下载商品信息
  const handleAllLinks = () => {
    setLinks(true);
    getAllLinks().then(() => {
      setLinks(false);
    }).catch(() => {
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
        loadingSize={14}
        style={{ minWidth: 134 }}
      >
        Batch Get Link
      </MyButton>
      <MyButton
        variant="contained"
        color="primary"
        className={classes.root}
        onClick={handleClean}
        loading={loading}
        style={{ minWidth: 88 }}
        loadingSize={14}
      >
        Delete
      </MyButton>
    </div>
  );
};

AllTopBtn.propTypes = {
  handleDeleteChange: PropTypes.func.isRequired,
  getAllLinks: PropTypes.func.isRequired,
};

export default AllTopBtn;
