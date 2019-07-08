import React from 'react';
import PropTypes from 'prop-types';
import renderRoutes from './render-routes';

import HeaderLogin from '../component/header/header-login';
import BoxContainer from '../common/box-container/index';
import { Consumer } from '../context/index';

/**
 * 解决方案 使用多级路由
 * @param props
 * @returns {*}
 * @constructor
 */
const HeaderNavigation = (props) => {
  const { route, history } = props;
  return (
    <Consumer>
      {
        data => (
          <>
            <HeaderLogin history={history} />
            <BoxContainer>
              {renderRoutes(route.routes, data.state.isLogin)}
            </BoxContainer>
          </>
        )
      }
    </Consumer>
  );
};

HeaderNavigation.propTypes = {
  history: PropTypes.objectOf(PropTypes.object).isRequired,
  route: PropTypes.objectOf(PropTypes.object).isRequired,
};

export default HeaderNavigation;
