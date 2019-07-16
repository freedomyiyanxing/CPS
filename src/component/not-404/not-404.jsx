import React from 'react';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/core/styles';
import MyButton from '../../common/material-ui-component/button';
import HeaderNotLogin from '../header/header-not-login';

import not404Style from './style';

const useStyles = makeStyles(not404Style);

const Not404 = (props) => {
  const { location, history } = props;
  const classes = useStyles();
  return (
    <>
      <HeaderNotLogin history={history} />
      <div
        className={classes.root}
      >
        <h2>No match for </h2>
        <h3>
          {location.pathname}
        </h3>
        <MyButton
          variant="contained"
          color="primary"
          onClick={() => history.push('/s/index')}
        >
          回到主页
        </MyButton>
      </div>
    </>
  );
};

Not404.propTypes = {
  history: PropTypes.objectOf(PropTypes.object).isRequired,
  location: PropTypes.objectOf(PropTypes.object).isRequired,
};

export default Not404;
