import React from 'react';
import ReactDom from 'react-dom';
import { BrowserRouter } from 'react-router-dom';
import { MuiThemeProvider } from '@material-ui/core/styles';

import { theme } from './base/theme/theme';
import App from './clinet';

const root = document.getElementById('root');

const Main = () => (
  <BrowserRouter>
    <MuiThemeProvider theme={theme}>
      <App />
    </MuiThemeProvider>
  </BrowserRouter>
);

ReactDom.render(<Main />, root);
