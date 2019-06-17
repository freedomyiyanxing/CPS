import React from 'react';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/core/styles';
import Select from '@material-ui/core/Select';

const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 5;

const styles = theme => ({
  root: {
    '&:before': {
      borderBottomColor: theme.palette.text.colorDdd,
    },
  },
  menu: {
    maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
  },
  icon: {
    color: theme.palette.text.secondary,
  },
  a: {
    padding: 6,
    height: 19,
  },
});

const useStyle = makeStyles(styles);

const MySelects = (props) => {
  const { className } = props;
  const classes = useStyle();
  return (
    <Select
      {...props}
      className={`${classes.root} ${className}`}
      MenuProps={{
        PaperProps: {
          className: classes.menu,
        },
      }}
      classes={{
        icon: classes.icon,
        select: classes.a,
      }}
    />
  );
};

MySelects.propTypes = {
  className: PropTypes.string,
};

MySelects.defaultProps = {
  className: '',
};

export default MySelects;
