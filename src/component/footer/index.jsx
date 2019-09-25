import React from 'react';
import PropTypes from 'prop-types';
import { renderRoutes } from '../../router/render-routes';
import Footer from './footer-index';

/**
 * 解决方案 使用多级路由
 * @param props
 * @returns {*}
 * @constructor
 */
const FooterIndex = (props) => {
  const { route, history } = props;
  window.__history__ = history; // 把history 赋值到 window.__history__
  return (
    <>
      {renderRoutes(route.routes)}
      <Footer />
    </>
  );
};

FooterIndex.propTypes = {
  history: PropTypes.objectOf(PropTypes.object).isRequired,
  route: PropTypes.objectOf(PropTypes.object).isRequired,
};

export default FooterIndex;
