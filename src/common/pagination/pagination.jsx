import React from 'react';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/core/styles';
import Pagination from 'rc-pagination';

import { ChevronLeft, ChevronRight } from '../material-ui-component/svg-icon';
import './style.css';

const useStyle = makeStyles(theme => ({
  wrapper: {
    margin: [[10, 0, 6]],
    display: 'flex',
    justifyContent: 'flex-end',
  },
  icon: {
    fontSize: theme.typography.fontSize,
  },
}));


const MyPagination = (props) => {
  const {
    total, pageSize, change, pageCurrent,
  } = props;
  const classes = useStyle();
  function onChange(page, size) {
    change(page, size);
  }
  return (
    <div className={classes.wrapper}>
      <Pagination
        current={pageCurrent}
        showSizeChanger
        defaultPageSize={pageSize}
        onChange={onChange}
        total={total}
        prevIcon={<ChevronLeft className={classes.icon} />}
        nextIcon={<ChevronRight className={classes.icon} />}
      />
    </div>
  );
};

MyPagination.propTypes = {
  total: PropTypes.number.isRequired,
  pageSize: PropTypes.number.isRequired,
  pageCurrent: PropTypes.number.isRequired,
  change: PropTypes.func.isRequired,
};


export default MyPagination;
