import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import CircularProgress from '@material-ui/core/CircularProgress';

import submitButtonStyle from './style';

const useStyle = makeStyles(submitButtonStyle);

const SubmitButton = (props) => {
  const { handleSubmit, name } = props;
  const [loading, setLoading] = useState(false);
  const classes = useStyle();

  const handleClick = () => {
    const promise = handleSubmit();
    if (promise) {
      console.log(promise);
      setLoading(true);
      promise.then(() => {
        setLoading(false);
      });
    }
  };
  return (
    <div className={classes.wrapperBtn}>
      <Button
        variant="contained"
        fullWidth
        color="primary"
        disabled={loading}
        classes={{
          root: classes.btn,
        }}
        onClick={handleClick}
      >
        {name}
      </Button>
      {
        loading && <CircularProgress size={24} className={classes.buttonProgress} />}
    </div>
  );
};

SubmitButton.propTypes = {
  handleSubmit: PropTypes.func.isRequired,
  name: PropTypes.string.isRequired,
};

export default SubmitButton;
