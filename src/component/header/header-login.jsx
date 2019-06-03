/* eslint-disable */
import React, { useState, useRef } from 'react';
import PropTypes from 'prop-types';
import uuid from 'uuid';
import { makeStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import { CSSTransition } from 'react-transition-group';

import HeaderContainer from './header-container';
import { loginStyle } from './style';
import logo from '../../asstes/images/logo_white.png';

const account = [
  {
    id: uuid(),
    text: 'Account Setting',
  },
  {
    id: uuid(),
    text: 'Account Balance',
  },
  {
    id: uuid(),
    text: 'Change Password',
  },
];

const useStyles = makeStyles(loginStyle);

const HeaderLogin = (props) => {
  const { history } = props;
  const classes = useStyles();
  const [open, setOpen] = useState(false);
  const [showMessage, setShowMessage] = useState(false);
  const anchorRef1 = useRef(null);

  const handleClick = () => {
    history.push('/not/login');
  };

  return (
    <HeaderContainer>
      <div className={classes.left}>
        <div className={classes.logo}>
          <img src={logo} alt="iNFLUMONSTER logo" />
        </div>
        <div className={classes.nav}>
          <Button
            variant="contained"
            color="primary"
            classes={{
              root: classes.navBtn,
            }}
          >
            Home
          </Button>
          <Button
            variant="contained"
            color="primary"
            className={classes.lastBtn}
            classes={{
              root: classes.navBtn,
            }}
            onClick={() => { setOpen(!open) }}
          >
            <span>Links</span>
            <span className="triangle-right" />
            <CSSTransition
              in={open}
              timeout={300}
              classNames="slide"
              unmountOnExit
            >
              <div
                className={classes.dropDownContainer1}
              >
                <div className={classes.dropDownWrapper1}>
                  {
                    account.map(v => (
                      <Button
                        key={v.id}
                        classes={{
                          root: classes.dropBtn,
                        }}
                      >
                        {v.text}
                      </Button>
                    ))
                  }
                </div>
              </div>
            </CSSTransition>
          </Button>
          <span className={classes.indicator} />
        </div>
      </div>
      <div className={classes.right}>
        <div
          ref={anchorRef1}
          className={classes.rightInfo}
          onClick={() => { setShowMessage(true) }}
          onMouseLeave={() => { setShowMessage(false) }}
        >
          <span className={classes.img}>
            <img src="https://cdn.influmonsters.com/fit-in/250x313/filters:fill(fff)/upload/image/product/desktop/2018/09/27/f5ee73fa-437c-49f7-ada5-39c59dbd1795.jpg" alt=""/>
          </span>
          <span className={classes.name}>user name</span>
          <span className="triangle-right" />
          <CSSTransition
            in={showMessage}
            timeout={300}
            classNames="slide"
            unmountOnExit
          >
            <div
              className={classes.dropDownContainer}
            >
              <span className={classes.dropDownArrow} />
              <div className={classes.dropDownWrapper}>
                {
                  account.map(v => (
                    <Button
                      key={v.id}
                      classes={{
                        root: classes.dropBtn,
                      }}
                    >
                      {v.text}
                    </Button>
                  ))
                }
              </div>
            </div>
          </CSSTransition>
        </div>
        <span className={classes.line} />
        <Button
          variant="contained"
          color="primary"
          classes={{
            root: classes.rightBtn,
          }}
          onClick={handleClick}
        >
          Logout
        </Button>
      </div>
    </HeaderContainer>
  );
};

HeaderLogin.propTypes = {
  history: PropTypes.objectOf(PropTypes.object).isRequired,
};


export default HeaderLogin;
