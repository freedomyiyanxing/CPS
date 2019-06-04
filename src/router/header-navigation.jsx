import React from 'react';
import PropTypes from 'prop-types';
import { renderRoutes } from 'react-router-config';

import HeaderLogin from '../component/header/header-login';
import BoxContainer from '../common/box-container/index';

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
      <BoxContainer>
        {renderRoutes(route.routes)}
      </BoxContainer>
    </>
  );
};

HeaderNavigation.propTypes = {
  history: PropTypes.objectOf(PropTypes.object).isRequired,
  route: PropTypes.objectOf(PropTypes.object).isRequired,
};

export default HeaderNavigation;
