import React from 'react';
import ReactDom from 'react-dom';
import { BrowserRouter } from 'react-router-dom';
// eslint-disable-next-line no-unused-vars
import { MuiThemeProvider, StylesProvider, jssPreset } from '@material-ui/core/styles';
// eslint-disable-next-line no-unused-vars
import { create } from 'jss';

import { theme } from './base/theme/theme';
import App from './clinet';

const root = document.getElementById('root');

// console.log(jssPreset());

// const jss = create({
//   ...jssPreset(),
//   // We define a custom insertion point that JSS will look for injecting the styles in the DOM.
//   // insertionPoint: document.getElementById('jss-insertion-point'),
// });

const Main = () => (
  <BrowserRouter>
    <MuiThemeProvider theme={theme}>
      <App />
    </MuiThemeProvider>
  </BrowserRouter>
);

ReactDom.render(<Main />, root);
