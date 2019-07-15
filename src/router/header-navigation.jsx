import React from 'react';
import PropTypes from 'prop-types';
import { inject } from 'mobx-react';

import renderRoutes from './render-routes';
import HeaderLogin from '../component/header/header-login';
import BoxContainer from '../common/box-container/index';

/**
 * 解决方案 使用多级路由
 * @param props
 * @returns {*}
 * @constructor
 */
const HeaderNavigation = (props) => {
  const { route, history, userStore } = props;
  return (
    <>
      <HeaderLogin history={history} />
      <BoxContainer>
        {renderRoutes(route.routes, userStore.isLogin)}
      </BoxContainer>
    </>
  );
};

HeaderNavigation.propTypes = {
  userStore: PropTypes.objectOf(PropTypes.object).isRequired,
  history: PropTypes.objectOf(PropTypes.object).isRequired,
  route: PropTypes.objectOf(PropTypes.object).isRequired,
};

export default inject('userStore')(HeaderNavigation);
