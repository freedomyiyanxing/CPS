import React, { createContext, Component } from 'react';
import PropTypes from 'prop-types';

export const { Provider, Consumer } = createContext();

class Context extends Component {
  constructor() {
    super();
    this.state = {
      isLogin: false,
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
    console.log(isLogin);
    return (
      <Provider
        value={{
          state: { isLogin },
          func: this.handleClick,
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
