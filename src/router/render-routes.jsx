import React from 'react';
import { Route, Redirect, Switch } from 'react-router-dom';

const renderRoutes = (routes, auth = true, extraProps = {}, switchProps = {}) => (routes ? (
  <Switch {...switchProps}>
    {routes.map((route, i) => (
      <Route
        key={route.key || i}
        path={route.path}
        exact={route.exact}
        strict={route.strict}
        render={(props) => {
          const { location } = props;
          // 进入当前端口 直接redirect到首页
          if (location.pathname === '/') {
            return <Redirect to={{ pathname: '/not/index', state: { from: location } }} />;
          }
          // 为匹配的路径直接redirect到404页面
          if (route.path === '/*') {
            return <Redirect to="/not404" />;
          }
          // 判断是否需要登录的页面
          if (auth) {
            return <route.component {...props} {...extraProps} route={route} />;
          }
          // 如果是需要登录的 则redirect到登录页面
          return <Redirect to={{ pathname: '/not/login', state: { from: location } }} />;
        }}
      />
    ))}
  </Switch>
) : null);

export default renderRoutes;
