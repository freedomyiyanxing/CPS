import React from 'react';
import ReactDom from 'react-dom';
import { BrowserRouter } from 'react-router-dom';
import { makeStyles, MuiThemeProvider } from '@material-ui/core/styles';

import renderRoutes from './router/render-routes';
import Context from './context/index';
import routers from './router/index';

import './asstes/style/reset.css';
import './asstes/style/index.css';
import './asstes/style/flags.css';
import './asstes/style/cropper.css';

import { theme } from './config/theme/theme';


// eslint-disable-next-line no-shadow
const useStyles = makeStyles((theme) => {
  console.log(theme);
  return {
    root: {
      display: 'flex',
      flexDirection: 'column',
      minHeight: '100vh',
    },
  };
});
const root = document.getElementById('root');

const App = () => {
  const classes = useStyles();
  return (
    <BrowserRouter>
      <MuiThemeProvider theme={theme}>
        <Context>
          <div className={classes.root}>
            {
              renderRoutes(routers)
            }
          </div>
        </Context>
      </MuiThemeProvider>
    </BrowserRouter>
  );
};

ReactDom.render(<App />, root);
