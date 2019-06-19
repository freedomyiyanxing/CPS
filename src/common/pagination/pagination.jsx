import React from 'react';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/core/styles';
import Pagination from 'rc-pagination';
import ChevronRight from '@material-ui/icons/ChevronRight';
import ChevronLeft from '@material-ui/icons/ChevronLeft';
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
  const { total, pageSize, change } = props;
  const classes = useStyle();

  function onChange(current, size) {
    change(current, size);
  }

  return (
    <div className={classes.wrapper}>
      <Pagination
        showSizeChanger
        defaultPageSize={pageSize}
        defaultCurrent={1}
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
  change: PropTypes.func.isRequired,
};

export default MyPagination;
