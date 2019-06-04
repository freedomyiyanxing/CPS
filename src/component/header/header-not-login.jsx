import React from 'react';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';

import HeaderContainer from './header-container';
import { loginNotStyle } from './style';
import logo from '../../asstes/images/logo_white.png';

const useStyles = makeStyles(loginNotStyle);

const HeaderNotLogin = (props) => {
  const { history } = props;
  const classes = useStyles();

  const handleClick = () => {
    history.push('/yes/index');
  };

  return (
    <HeaderContainer>
      <div className={classes.logo}>
        <img src={logo} alt="iNFLUMONSTER logo" />
      </div>
      <div className={classes.right}>
        <Button
          variant="contained"
          color="primary"
          onClick={handleClick}
          classes={{
            root: classes.rightBtn,
          }}
        >
          Join Now
        </Button>
        <span className={classes.line} />
        <Button
          variant="contained"
          color="primary"
          onClick={handleClick}
          classes={{
            root: classes.rightBtn,
          }}
        >
          Login
        </Button>
      </div>
    </HeaderContainer>
  );
};

HeaderNotLogin.propTypes = {
  history: PropTypes.objectOf(PropTypes.object).isRequired,
};


export default HeaderNotLogin;
