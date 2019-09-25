import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { Link as RouterLink } from 'react-router-dom';
import { LinkRouter } from '../header/utils/not-header-left';

import ColorContainer from '../../common/box-container/color-container';
import MyButton from '../../common/material-ui-component/button';
import { notHomeList } from '../../assets/data/default-data';
import homeBg from '../../assets/images/home-bg.png';
import notHomeStyle from './style';

const useStyles = makeStyles(notHomeStyle);

const NotHome = () => {
  const classes = useStyles();
  return (
    <ColorContainer
      isHome
      imgUrl={homeBg}
      floatingLayer={(
        <>
          <div className={classes.left}>
            <svg width="600" height="110" viewBox="0 0 600 110">
              <text x="0" y="105" fill="#fff" fontSize="150" fontWeight="bold">IMTRIBE</text>
            </svg>
            <svg width="600" height="60" viewBox="0 0 600 60">
              <text x="0" y="50" fill="#fff" fontSize="60" fontWeight="bold">AFFILIATE PROGRAM</text>
            </svg>
            <p className={classes.text}>
              The IMTRIBE affiliate program is a value
              driven hub of fashion-forward, out of the box thinkers.
            </p>
          </div>
          <div className={classes.right}>
            <p className={classes.prompt}>
              You have access to trendy, hand selected
              shops and streetwear boutiques who share a
              common message of empowerment and freedom of
              expression.
            </p>
            <div className={classes.btnWrapper}>
              <MyButton
                variant="contained"
                color="secondary"
                className={classes.btn}
                component={RouterLink}
                to="/s/signup"
              >
                SIGN UP
              </MyButton>
              <MyButton
                variant="contained"
                color="secondary"
                className={classes.btn}
                component={RouterLink}
                to="/s/signin"
              >
                LOG IN
              </MyButton>
            </div>
          </div>
        </>
      )}
    >
      <>
        <div className={classes.list}>
          {
            notHomeList.map(v => (
              <div key={v.id} className={classes.item}>
                <div className={classes.listIcon}>
                  <v.icon className={classes.icon} />
                </div>
                <h4 className={classes.listTitle}>{v.title}</h4>
                <p className={classes.listText}>{v.text}</p>
              </div>
            ))
          }
        </div>
        <div className={classes.footer}>
          <MyButton
            variant="contained"
            color="secondary"
            className={classes.btn}
            component={RouterLink}
            to="/s/signup"
          >
            JOIN NOW
          </MyButton>
          <LinkRouter
            color="inherit"
            className={classes.links}
          >
            OR LEARN MORE &gt;
          </LinkRouter>
        </div>
      </>
    </ColorContainer>
  );
};

export default NotHome;
