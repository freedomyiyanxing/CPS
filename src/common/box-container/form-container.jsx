import React from 'react';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/core/styles/index';

const useStyle = makeStyles(theme => ({
  container: {
    width: '100%',
    height: '100%',
    background: theme.palette.primary[50],
  },
  root: {
    width: 520,
    margin: [[132, 'auto']],
    border: '1px solid',
    borderColor: theme.palette.text.colorDdd,
    borderRadius: 10,
    padding: [[20, 60, 50]],
  },
  title: {
    lineHeight: theme.typography.h2.lineHeight,
    fontSize: theme.typography.h2.fontSize,
    fontWeight: theme.typography.h2.fontWeight,
    color: theme.palette.text.primary,
  },
}));

const InputContainer = (props) => {
  const { children, title } = props;
  const classes = useStyle();
  return (
    <div className={classes.container}>
      <div className={classes.root}>
        <h2 className={classes.title}>{title}</h2>
        {children}
      </div>
    </div>
  );
};

InputContainer.propTypes = {
  children: PropTypes.node.isRequired,
  title: PropTypes.string.isRequired,
};

export default InputContainer;
