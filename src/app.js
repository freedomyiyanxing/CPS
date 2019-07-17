import React from 'react';
import ReactDom from 'react-dom';
import { BrowserRouter } from 'react-router-dom';
import { makeStyles, MuiThemeProvider } from '@material-ui/core/styles';
import { Provider } from 'mobx-react';

import renderRoutes from './router/render-routes';
import User from './store/user';
import routers from './router/index';

import './asstes/style/reset.css';
import './asstes/style/index.css';
import './asstes/style/flags.css';
import './asstes/style/cropper.css';

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
  return (
    <Provider userStore={userStore}>
      <BrowserRouter>
        <MuiThemeProvider theme={theme}>
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
