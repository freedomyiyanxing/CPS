import React from 'react';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/core/styles';

import MyButton from '../material-ui-component/button';

const useStyle = makeStyles(theme => ({
  footer: {
    marginBottom: 30,
    display: 'flex',
    justifyContent: 'space-evenly',
  },
  btn: {
    width: 120,
    height: 38,
    fontWeight: theme.typography.fontWeight,
    borderRadius: 4,
  },
}));

const DialogFooter = (props) => {
  const {
    title, handleDelete, handleChange, disabled, loading,
  } = props;
  const classes = useStyle();

  return (
    <div className={classes.footer}>
      <MyButton
        color="primary"
        variant="contained"
        className={classes.btn}
        onClick={handleDelete}
      >
        {title.delete}
      </MyButton>
      <MyButton
        color="primary"
        variant="contained"
        disabled={disabled}
        className={classes.btn}
        onClick={handleChange}
        loading={loading}
      >
        {title.ok}
      </MyButton>
    </div>
  );
};

DialogFooter.propTypes = {
  title: PropTypes.objectOf(PropTypes.object),
  handleDelete: PropTypes.func.isRequired,
  handleChange: PropTypes.func.isRequired,
  disabled: PropTypes.bool,
  loading: PropTypes.bool,
};

DialogFooter.defaultProps = {
  title: {
    ok: 'Copy',
    delete: 'Close',
  },
  disabled: false,
  loading: false,
};

export default DialogFooter;
