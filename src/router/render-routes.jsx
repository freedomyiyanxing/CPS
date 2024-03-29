import React from 'react';
import { Route, Redirect, Switch } from 'react-router-dom';

export const renderRoutes = (routes, auth = true, extraProps = {}, switchProps = {}) => (routes ? (
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
            return <Redirect to={{ pathname: '/i/index', state: { from: location } }} />;
          }

          // 判断是否需要登录的页面
          if (auth) {
            return <route.component {...props} {...extraProps} route={route} />;
          }

          // 如果是需要登录的 则redirect到登录页面
          return <Redirect to={{ pathname: '/s/signin', state: { from: location } }} />;
        }}
      />
    ))}
  </Switch>
) : null);
