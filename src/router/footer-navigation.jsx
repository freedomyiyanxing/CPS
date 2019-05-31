import React from 'react';
import PropTypes from 'prop-types';
import { renderRoutes } from 'react-router-config';

import FooterIndex from '../component/footer/footer-index';

/**
 * 解决方案 使用多级路由
 * @param props
 * @returns {*}
 * @constructor
 */
const FooterNavigation = (props) => {
  const { route } = props;
  return (
    <>
      {renderRoutes(route.routes)}
      <FooterIndex />
    </>
  );
};

FooterNavigation.propTypes = {
  route: PropTypes.objectOf(PropTypes.object).isRequired,
};

export default FooterNavigation;
