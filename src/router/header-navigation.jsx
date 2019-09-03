import React, { Suspense } from 'react';
import PropTypes from 'prop-types';
import { inject } from 'mobx-react';

import { renderRoutes } from './render-routes';
import HeaderLogin from '../component/header/header-login';
import BoxContainer from '../common/box-container/index';
import { CodeLoading } from '../common/skeleton/code-loading';

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
        <Suspense fallback={<CodeLoading />}>
          {renderRoutes(route.routes, userStore.isLogin)}
        </Suspense>
      </BoxContainer>
    </>
  );
};

HeaderNavigation.propTypes = {
  userStore: PropTypes.objectOf(PropTypes.object).isRequired,
  history: PropTypes.objectOf(PropTypes.object).isRequired,
  route: PropTypes.objectOf(PropTypes.object).isRequired,
};

const HeaderNavigations = inject('userStore')(HeaderNavigation);

export default HeaderNavigations;
