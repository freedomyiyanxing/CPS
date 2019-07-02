import React, { createContext, Component } from 'react';
import PropTypes from 'prop-types';

export const { Provider, Consumer } = createContext();

class Context extends Component {
  constructor() {
    super();
    this.state = {
      isLogin: true, // 是否登录
    };
  }

  handleClick = (isLogin) => {
    this.setState({
      isLogin,
    });
  };

  render() {
    const { children } = this.props;
    const { isLogin } = this.state;
    console.log(isLogin, '登录标志');
    return (
      <Provider
        value={{
          state: { isLogin },
          setLogin: this.handleClick,
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
