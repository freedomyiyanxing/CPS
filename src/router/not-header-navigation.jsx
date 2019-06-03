import React from 'react';
import PropTypes from 'prop-types';
import { renderRoutes } from 'react-router-config';

import HeaderNotLogin from '../component/header/header-not-login';

/**
 * 解决方案 使用多级路由
 * @param props
 * @returns {*}
 * @constructor
 */
const NotHeaderNavigation = (props) => {
  const { route, history } = props;
  return (
    <>
      <HeaderNotLogin history={history} />
      {renderRoutes(route.routes)}
    </>
  );
};

NotHeaderNavigation.propTypes = {
  history: PropTypes.objectOf(PropTypes.object).isRequired,
  route: PropTypes.objectOf(PropTypes.object).isRequired,
};

export default NotHeaderNavigation;
