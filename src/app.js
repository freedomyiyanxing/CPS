import React, { useEffect } from 'react';
import ReactDom from 'react-dom';
import { BrowserRouter } from 'react-router-dom';
import { makeStyles, MuiThemeProvider } from '@material-ui/core/styles';
import { Provider } from 'mobx-react';
import { Helmet } from 'react-helmet';

import { renderRoutes } from './router/render-routes';
import User from './store/user';
import routers from './router/index';
import favicon from './assets/images/favicon.ico';

import './assets/style/reset.css';
import './assets/style/index.css';
import './assets/style/flags.css';
import './assets/style/cropper.css';

import { theme } from './config/theme/theme';


const useStyles = makeStyles(() => ({
  root: {
    display: 'flex',
    flexDirection: 'column',
    minHeight: '100vh',
  },
}));
const root = document.getElementById('root');

const userStore = new User();

const App = () => {
  const classes = useStyles();

  // 删除骨架屏的样式
  useEffect(() => {
    const skeleton = document.getElementById('skeleton-id');
    if (skeleton) {
      skeleton.parentNode.removeChild(skeleton);
    }
  });

  return (
    <Provider userStore={userStore}>
      <BrowserRouter>
        <MuiThemeProvider theme={theme}>
          <Helmet>
            <link rel="shortcut icon" href={favicon} />
          </Helmet>
          <div className={classes.root}>
            {
              renderRoutes(routers)
            }
          </div>
        </MuiThemeProvider>
      </BrowserRouter>
    </Provider>
  );
};

ReactDom.render(<App />, root);

// 告诉 webpack 允许此模块的热更新
// 热更新
if (module.hot) {
  module.hot.accept();
}
