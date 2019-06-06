import React from 'react';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';

import HeaderContainer from './header-container';
import { loginNotStyle } from './style';
import logo from '../../asstes/images/logo_white.png';

const useStyles = makeStyles(loginNotStyle);

const HeaderNotLogin = (props) => {
  const { history } = props;
  const classes = useStyles();

  /**
   * 去未登录的首页
   */
  const handleIndex = () => {
    history.push('/not/index');
  };

  /**
   * 登录
   */
  const handleLogin = () => {
    history.push('/not/login');
  };

  /**
   * 注册
   */
  const handleRegister = () => {
    history.push('/not/register');
  };

  return (
    <HeaderContainer>
      <div
        className={classes.logo}
        role="button"
        tabIndex={0}
        onClick={handleIndex}
      >
        <img src={logo} alt="iNFLUMONSTER logo" />
      </div>
      <div className={classes.right}>
        <Button
          variant="contained"
          color="primary"
          onClick={handleRegister}
          classes={{
            root: classes.rightBtn,
          }}
        >
          Join Now
        </Button>
        <span className={classes.line} />
        <Button
          variant="contained"
          color="primary"
          onClick={handleLogin}
          classes={{
            root: classes.rightBtn,
          }}
        >
          Login
        </Button>
      </div>
    </HeaderContainer>
  );
};

HeaderNotLogin.propTypes = {
  history: PropTypes.objectOf(PropTypes.object).isRequired,
};


export default HeaderNotLogin;
