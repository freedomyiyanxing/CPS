/* eslint-disable */
import React from 'react';
import { Route, Redirect, Switch } from 'react-router-dom';

export const renderRoutes = (routes, auth = true, extraProps = {}, switchProps = {}) => (routes ? (
  <Switch {...switchProps}>
    {routes.map((route, i) => {
      // console.log(route)
      return (
        <Route
          key={route.key || i}
          path={route.path}
          exact={route.exact}
          strict={route.strict}
          render={(props) => {
            const { location } = props;
            // 进入当前端口 直接redirect到首页
            if (location.pathname === '/') {
              return <Redirect to={{ pathname: '/s/index', state: { from: location } }}/>;
            }

            // 进入付款账户维护前, 先进入到account页面
            // if (location.pathname === '/my/account-payment' && !window.__valid__password__) {
            //   // return <Redirect to={{ pathname: '/my/account' }} />;
            // }

            // 判断是否需要登录的页面
            if (auth) {
              return <route.component {...props} {...extraProps} route={route}/>;
            }

            // 如果是需要登录的 则redirect到登录页面
            return <Redirect to={{ pathname: '/s/signin', state: { from: location } }}/>;
          }}
        />
      )
    })}
  </Switch>
) : null);


export function renderRoute(routes, auth = true, extraProps, switchProps) {
  if (!extraProps) {
    extraProps = {};
  }

  if (!switchProps) {
    switchProps = {};
  }

  return routes ? React.createElement(Switch, switchProps, routes.map((route, i) => {
    return React.createElement(Route, {
      key: route.key || i,
      path: route.path,
      exact: route.exact,
      strict: route.strict,
      render: function render(props) {
        console.log(route.render);
        return route.render ? route.render(Object.assign({}, props, extraProps, {
          route,
        })) : React.createElement(route.component, Object.assign({}, props, extraProps, {
          route,
        }));
      },
      // render: (props) => {
      //   const { location } = props;
      //   console.log(location);
      //   // 进入当前端口 直接redirect到首页
      //   if (location.pathname === '/') {
      //     return <Redirect to={{ pathname: '/s/index', state: { from: location } }}/>;
      //   }
      //
      //   // 进入付款账户维护前, 先进入到account页面
      //   // if (location.pathname === '/my/account-payment' && !window.__valid__password__) {
      //   //   // return <Redirect to={{ pathname: '/my/account' }} />;
      //   // }
      //
      //   // 判断是否需要登录的页面
      //   if (auth) {
      //     return <route.component {...props} {...extraProps} route={route}/>;
      //   }
      //
      //   // 如果是需要登录的 则redirect到登录页面
      //   return <Redirect to={{ pathname: '/s/signin', state: { from: location } }}/>;
      // }
    });
  })) : null;
}
