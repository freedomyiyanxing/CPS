import React, { useState, useEffect, useRef } from 'react';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/core/styles';
import MyButton from '../material-ui-component/button';
import { submitButtonStyle } from './style';

const useStyle = makeStyles(submitButtonStyle);

const SubmitButton = (props) => {
  const {
    name, width, bank, disabled, history, handleSubmit, className,
  } = props;

  const [loading, setLoading] = useState(false);

  const style = {
    width,
  };

  const classes = useStyle(style);

  // 解决hooks的闭包问题
  // hooks闭包的由来详解: 因为useEffect传递了第二个参数为一个空数组,
  // 从而导致useEffect只在第一次创建组件时调用, 在组件更新时缓存了useEffect的状态,
  // 导致onKeyDown中每次拿到的disable都是第一次创建时的值
  // 解决办法使用一个对象, 每次组件更新去修改对象中的某个值, 而不修改当前这个对象
  const disabledRef = useRef();
  disabledRef.current = disabled;

  // 提交事件
  const handleClick = () => {
    const promise = handleSubmit();
    if (promise) {
      setLoading(true);
      promise.then(() => {
        setLoading(false);
      }).catch(() => {
        setLoading(false);
      });
    }
  };

  // 回退事件
  const handleBack = () => {
    if (history) {
      history.push('/my/account');
    }
  };

  // 键盘回车事件 (Enter)
  const onKeyDown = (e) => {
    // 回车事件
    if (e.keyCode === 13 && !disabledRef.current) {
      handleClick();
      return;
    }
    // Esc事件
    if (e.keyCode === 27 && bank) {
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
    <div
      className={`${classes.wrapperBtn} ${bank ? classes.bank : ''} ${className}`}
    >
      {
        bank
          ? (
            <MyButton
              variant="contained"
              color="primary"
              className={classes.btn}
              onClick={handleBack}
            >
              Bank
            </MyButton>
          )
          : null
      }
      <MyButton
        disabled={disabled}
        fullWidth
        variant="contained"
        color="primary"
        loading={loading}
        className={classes.btn}
        onClick={handleClick}
      >
        {name}
      </MyButton>
    </div>
  );
};


SubmitButton.propTypes = {
  handleSubmit: PropTypes.func.isRequired,
  name: PropTypes.string.isRequired,
  width: PropTypes.number,
  bank: PropTypes.bool, // 是否添加 回退按钮
  history: PropTypes.objectOf(PropTypes.object),
  disabled: PropTypes.bool,
  className: PropTypes.string,
};

SubmitButton.defaultProps = {
  width: null,
  bank: false,
  history: null,
  disabled: false,
  className: '',
};

export default SubmitButton;
