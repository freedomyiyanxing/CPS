import React from 'react';
import PropTypes from 'prop-types';
import { inject } from 'mobx-react';

import { renderRoutes } from '../../../router/render-routes';
import BoxContainer from '../../../common/box-container/index';
import LoginHeaders from './header';

/**
 * 解决方案 使用多级路由
 * @param props
 * @returns {*}
 * @constructor
 */
const LoginContainer = (props) => {
  const { route, history, userStore } = props;
  if (window.scrollY > 0 && (typeof window.scroll === 'function')) {
    console.log('触发了吗');
    window.scroll(0, 0);
  }
  return (
    <>
      <LoginHeaders history={history} />
      <BoxContainer>
        {renderRoutes(route.routes, userStore.isLogin)}
      </BoxContainer>
    </>
  );
};

LoginContainer.propTypes = {
  userStore: PropTypes.objectOf(PropTypes.object).isRequired,
  history: PropTypes.objectOf(PropTypes.object).isRequired,
  route: PropTypes.objectOf(PropTypes.object).isRequired,
};

const LoginContainers = inject('userStore')(LoginContainer);

export default LoginContainers;
