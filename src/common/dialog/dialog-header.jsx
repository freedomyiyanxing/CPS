import React from 'react';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/core/styles';

const useStyle = makeStyles(theme => ({
  header: {
    width: '100%',
    height: 45,
    display: 'flex',
    alignItems: 'center',
    paddingLeft: 20,
    background: theme.palette.primary.main,
    fontSize: theme.typography.h6.fontSize,
    color: theme.palette.primary.contrastText,
    fontWeight: theme.typography.h6.fontWeight,
    borderRadius: [[0, 0, 4, 4]],
  },
}));

const DialogHeader = (props) => {
  const { title } = props;
  const classes = useStyle();
  return (
    <div className={classes.header}>{title}</div>
  );
};

DialogHeader.propTypes = {
  title: PropTypes.string,
};

DialogHeader.defaultProps = {
  title: '',
};

export default DialogHeader;
