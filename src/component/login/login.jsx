import React from 'react';
import Button from '@material-ui/core/Button';

const Login = (props) => {
  const handleClick = () => {
    // eslint-disable-next-line react/prop-types
    props.history.goBack();
  };
  return (
    <div>
      <Button
        variant="contained"
        color="primary"
        onClick={handleClick}
      >
        登录
      </Button>
    </div>
  );
};

export default Login;
