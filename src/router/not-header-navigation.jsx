import React, { Suspense } from 'react';
import PropTypes from 'prop-types';
import { renderRoutes } from './render-routes';
import HeaderNotLogin from '../component/header/header-not-login';
import BoxContainer from '../common/box-container/index';
import { NotCodeLoading } from '../common/skeleton/code-loading';

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
      <BoxContainer marginTop={68}>
        <Suspense fallback={<NotCodeLoading />}>
          {renderRoutes(route.routes)}
        </Suspense>
      </BoxContainer>
    </>
  );
};

NotHeaderNavigation.propTypes = {
  history: PropTypes.objectOf(PropTypes.object).isRequired,
  route: PropTypes.objectOf(PropTypes.object).isRequired,
};

export default NotHeaderNavigation;
