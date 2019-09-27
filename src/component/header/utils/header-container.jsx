import React from 'react';
import PropTypes from 'prop-types';
import AppBar from '@material-ui/core/AppBar';
import { makeStyles } from '@material-ui/core/styles';
import useScrollTrigger from '@material-ui/core/useScrollTrigger/useScrollTrigger';
import { LogoWhite } from '../../../common/material-ui-component/svg-icon';
import { LinkRouter } from './not-header-left';


import { containerStyle } from '../style';

const useStyles = makeStyles(containerStyle);

const HeaderContainer = (props) => {
  const {
    leftComponent, rightComponent, scroll, isLogin,
  } = props;

  const classes = useStyles();
  let trigger = false;

  if (scroll) {
    trigger = useScrollTrigger({
      target: window || undefined,
      disableHysteresis: true,
      threshold: 0,
    });
  }

  return (
    <AppBar
      color="inherit"
      className={`${scroll ? classes.root : classes.root1} ${trigger ? classes.appBarBg : ''}`}
    >
      <div className={classes.container}>
        <div className={classes.left}>
          <LinkRouter
            to={isLogin ? '/my/index' : '/i/index'}
            color="inherit"
            underline="none"
          >
            <LogoWhite className={classes.logo} />
          </LinkRouter>
          {leftComponent}
        </div>
        <div className={classes.right}>{rightComponent}</div>
      </div>
    </AppBar>
  );
};

HeaderContainer.propTypes = {
  isLogin: PropTypes.bool.isRequired,
  rightComponent: PropTypes.node,
  leftComponent: PropTypes.node,
  scroll: PropTypes.bool,
};

HeaderContainer.defaultProps = {
  scroll: false,
  leftComponent: null,
  rightComponent: null,
};

export default HeaderContainer;
