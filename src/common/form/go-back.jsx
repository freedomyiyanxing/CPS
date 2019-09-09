import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/core/styles';
import MyButton from '../material-ui-component/button';
import { submitButtonStyle } from './style';

const useStyle = makeStyles(submitButtonStyle);

const GoBackBtn = (props) => {
  const {
    width, history,
  } = props;

  const style = {
    width,
  };

  const classes = useStyle(style);


  // 回退事件
  const handleBack = () => {
    if (history) {
      history.push('/my/account');
    }
  };

  // 键盘回车事件 (Enter)
  const onKeyDown = (e) => {
    // Esc事件
    if (e.keyCode === 27) {
      handleBack();
    }
  };

  useEffect(() => {
    document.addEventListener('keydown', onKeyDown);
    return () => {
      document.removeEventListener('keydown', onKeyDown);
    };
  }, []);

  return (
    <MyButton
      variant="contained"
      color="primary"
      className={classes.btn}
      onClick={handleBack}
    >
      Bank
    </MyButton>
  );
};


GoBackBtn.propTypes = {
  history: PropTypes.objectOf(PropTypes.object),
  width: PropTypes.number,
};

GoBackBtn.defaultProps = {
  history: null,
  width: 180,
};

export default GoBackBtn;
