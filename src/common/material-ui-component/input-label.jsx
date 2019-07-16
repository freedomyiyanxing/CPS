import React from 'react';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/core/styles';
import InputLabel from '@material-ui/core/InputLabel';

const useStyles = makeStyles(theme => ({
  root: {
    fontSize: theme.typography.fontSize,
  },
  shrink: {
    transform: 'translate(0, 1.5px) scale(0.85)',
  },
}));

const MyLabel = (props) => {
  const { fontSize } = props;
  const classes = useStyles();
  return (
    <InputLabel
      {...props}
      className={fontSize === 'sm' ? classes.root : ''}
      classes={{
        shrink: fontSize === 'sm' ? classes.shrink : null,
      }}
    />
  );
};

MyLabel.propTypes = {
  fontSize: PropTypes.string.isRequired, // fontSize 接受 sm 表示字号使用 1.4rem
};

export default MyLabel;
