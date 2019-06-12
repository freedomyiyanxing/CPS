import React from 'react';
// import { hot } from 'react-hot-loader/root';
import { makeStyles } from '@material-ui/core/styles/index';
import { renderRoutes } from 'react-router-config';

import routers from './router/index';

import './asstes/style/reset.css';
import './asstes/style/index.css';
import './asstes/style/flags.css';

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


const App = () => {
  const classes = useStyles();
  return (
    <div className={classes.root}>
      {
        renderRoutes(routers)
      }
    </div>
  );
};

export default App;
