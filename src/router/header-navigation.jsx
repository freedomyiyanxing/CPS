import React from 'react';
import PropTypes from 'prop-types';
import { renderRoutes } from 'react-router-config';

import HeaderLogin from '../component/header/header-not-login';

/**
 * 解决方案 使用多级路由
 * @param props
 * @returns {*}
 * @constructor
 */
const HeaderNavigation = (props) => {
  const { route, history } = props;
  return (
    <>
      <HeaderLogin history={history} />
      {renderRoutes(route.routes)}
    </>
  );
};

HeaderNavigation.propTypes = {
  history: PropTypes.objectOf(PropTypes.object).isRequired,
  route: PropTypes.objectOf(PropTypes.object).isRequired,
};

export default HeaderNavigation;
