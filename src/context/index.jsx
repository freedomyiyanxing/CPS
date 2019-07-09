import React, { createContext, Component } from 'react';
import PropTypes from 'prop-types';
import { session } from '../asstes/js/utils-methods';

export const { Provider, Consumer } = createContext();

class Context extends Component {
  constructor() {
    super();
    // const loginInfo = session.getSession('loginInfo');
    const userInfo = session.getSession('userInfo');
    this.state = {
      isLogin: true, // loginInfo ? loginInfo.isLogin : false, // 是否登录
      useObj: userInfo || {}, // 用户信息
    };
  }

  // 修改登录标志
  handleClick = (isLogin) => {
    this.setState({
      isLogin,
    });
  };

  // 修改用户信息
  handleGetUserInfo = (useObj) => {
    this.setState({
      useObj,
    });
  };

  render() {
    const { children } = this.props;
    const { isLogin, useObj } = this.state;
    return (
      <Provider
        value={{
          state: { isLogin, useObj },
          setLogin: this.handleClick,
          getUserInfo: this.handleGetUserInfo,
        }}
      >
        {children}
      </Provider>
    );
  }
}

Context.propTypes = {
  children: PropTypes.node.isRequired,
};

export default Context;
