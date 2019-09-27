import React from 'react';
import PropTypes from 'prop-types';
import { MuiThemeProvider } from '@material-ui/core/styles';

import { renderRoutes } from '../../../router/render-routes';
import BoxContainer from '../../../common/box-container/index';
import Header from './header';

const childTheme = {
  child: {
    palette: {
      bg: '#EC8B5D',
      iconBg: '#161B45',
      textColor: '#ffffff',
      titleColor: '#000000',
    },
    typography: {
      fontFamily: '',
    },
  },
};

/**
 * 解决方案 使用多级路由
 * @param props
 * @returns {*}
 * @constructor
 */
const ColorContainer = (props) => {
  const { route, history } = props;
  if (window.scrollY > 0 && (typeof window.scroll === 'function')) {
    window.scroll(0, 0);
  }
  return (
    <MuiThemeProvider
      theme={childTheme}
    >
      <Header history={history} />
      <BoxContainer isMarginTop={false}>
        {renderRoutes(route.routes)}
      </BoxContainer>
    </MuiThemeProvider>
  );
};

ColorContainer.propTypes = {
  history: PropTypes.objectOf(PropTypes.object).isRequired,
  route: PropTypes.objectOf(PropTypes.object).isRequired,
};

export default ColorContainer;
