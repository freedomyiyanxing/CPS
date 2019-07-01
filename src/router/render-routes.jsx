import React from 'react';
import { Route, Redirect, Switch } from 'react-router-dom';

const renderRoutes = (routes, auth, authPath, extraProps = {}, switchProps = {}) => (routes ? (
  <Switch {...switchProps}>
    {routes.map((route, i) => (
      <Route
        key={route.key || i}
        path={route.path}
        exact={route.exact}
        strict={route.strict}
        render={(props) => {
          const { location } = props;
          if (route.path === '*') {
            return <Redirect to={{ pathname: '/not404', state: { from: location } }} />;
          }
          if (auth || route.path === authPath) {
            return <route.component {...props} {...extraProps} route={route} />;
          }
          return <Redirect to={{ pathname: authPath || '/not/login', state: { from: location } }} />;
        }}
      />
    ))}
  </Switch>
) : null);

export default renderRoutes;
