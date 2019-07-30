import React from 'react';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/core/styles';
import MyButton from '../../common/material-ui-component/button';

import HeaderContainer from './header-container';
import PartitionLine from '../../common/partition-line/partition-line';
import { loginNotStyle } from './style';
import logo from '../../assets/images/logo_white.png';

const useStyles = makeStyles(loginNotStyle);

const HeaderNotLogin = (props) => {
  const { history } = props;
  const classes = useStyles();

  /**
   * 登录
   */
  const handleLogin = () => {
    history.push('/s/signin');
  };

  /**
   * 注册
   */
  const handleRegister = () => {
    history.push('/s/signup');
  };

  /**
   * to 未登录首页
   */
  const handleChange = () => {
    history.push('/s/index');
  };

  return (
    <HeaderContainer>
      <div
        className={classes.logo}
        tabIndex={0}
        role="button"
        onClick={handleChange}
      >
        <img src={logo} alt="iNFLUMONSTER logo" />
      </div>
      <div className={classes.right}>
        <MyButton
          onClick={handleRegister}
          className={classes.rightBtn}
        >
          Join Now
        </MyButton>
        <PartitionLine margin={[[0, 4]]} />
        <MyButton
          onClick={handleLogin}
          className={classes.rightBtn}
        >
          Login
        </MyButton>
      </div>
    </HeaderContainer>
  );
};

HeaderNotLogin.propTypes = {
  history: PropTypes.objectOf(PropTypes.object).isRequired,
};


export default HeaderNotLogin;
