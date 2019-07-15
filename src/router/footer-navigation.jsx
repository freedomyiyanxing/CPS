import React from 'react';
import PropTypes from 'prop-types';
import renderRoutes from './render-routes';
import FooterIndex from '../component/footer/footer-index';

/**
 * 解决方案 使用多级路由
 * @param props
 * @returns {*}
 * @constructor
 */
const FooterNavigation = (props) => {
  const { route, history } = props;
  window.__history__ = history; // 把history 赋值到 window.__history__
  return (
    <>
      {renderRoutes(route.routes)}
      <FooterIndex />
    </>
  );
};

FooterNavigation.propTypes = {
  history: PropTypes.objectOf(PropTypes.object).isRequired,
  route: PropTypes.objectOf(PropTypes.object).isRequired,
};

export default FooterNavigation;
