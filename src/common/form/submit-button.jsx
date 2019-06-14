import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/core/styles';
import CircularProgress from '@material-ui/core/CircularProgress';

import MyButton from '../button/button';
import { submitButtonStyle } from './style';

const useStyle = makeStyles(submitButtonStyle);

const SubmitButton = (props) => {
  const { handleSubmit, name, width } = props;
  const [loading, setLoading] = useState(false);
  const classes = useStyle();

  const handleClick = () => {
    const promise = handleSubmit();
    if (promise) {
      setLoading(true);
      promise.then(() => {
        setLoading(false);
      });
    }
  };
  return (
    <div className={classes.wrapperBtn}>
      <MyButton
        variant="contained"
        fullWidth
        color="primary"
        disabled={loading}
        className={classes.btn}
        onClick={handleClick}
        style={{ width }}
      >
        {name}
      </MyButton>
      {
        loading && <CircularProgress size={24} className={classes.buttonProgress} />}
    </div>
  );
};

SubmitButton.propTypes = {
  handleSubmit: PropTypes.func.isRequired,
  name: PropTypes.string.isRequired,
  width: PropTypes.string,
};

SubmitButton.defaultProps = {
  width: null,
};

export default SubmitButton;
