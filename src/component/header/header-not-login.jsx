import React from 'react';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';

import HeaderContainer from './header-container';
import { loginHeaderStyle } from './style';
import logo from '../../asstes/images/logo_white.png';

const useStyles = makeStyles(loginHeaderStyle);

const HeaderLogin = (props) => {
  const { history } = props;
  const classes = useStyles();

  const handleClick = () => {
    history.push('/not/login');
  };

  return (
    <HeaderContainer>
      <div className={classes.logo}>
        <img src={logo} alt="" />
      </div>
      <div>
        <Button
          variant="contained"
          color="primary"
          onClick={handleClick}
        >
          Login
        </Button>
      </div>
    </HeaderContainer>
  );
};

HeaderLogin.propTypes = {
  history: PropTypes.objectOf(PropTypes.object).isRequired,
};


export default HeaderLogin;
