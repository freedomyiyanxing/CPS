import React from 'react';
import PropTypes from 'prop-types';

import { renderRoutes } from '../../../router/render-routes';
import BoxContainer from '../../../common/box-container/index';
import NotLoginHeaders from './header';

/**
 * 解决方案 使用多级路由
 * @param props
 * @returns {*}
 * @constructor
 */
const NotLoginContainer = (props) => {
  const { route, history } = props;
  if (window.scrollY > 0 && (typeof window.scroll === 'function')) {
    console.log('触发了吗');
    window.scroll(0, 0);
  }
  return (
    <>
      <NotLoginHeaders history={history} />
      <BoxContainer>
        {renderRoutes(route.routes)}
      </BoxContainer>
    </>
  );
};

NotLoginContainer.propTypes = {
  history: PropTypes.objectOf(PropTypes.object).isRequired,
  route: PropTypes.objectOf(PropTypes.object).isRequired,
};

export default NotLoginContainer;
