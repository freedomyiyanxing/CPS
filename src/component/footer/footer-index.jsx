import React from 'react';
import { makeStyles } from '@material-ui/core/styles';

import { LinkRouter } from '../header/utils/not-header-left';
import { footerObj } from '../../assets/data/default-data';

import footerStyle from './style';

const useStyles = makeStyles(footerStyle);


const Footer = () => {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <div className={classes.wrapper}>
        <div className={classes.footerNavigation}>
          {
            footerObj.title.map(val => (
              <div key={val.id}>
                <div className={classes.itemHeader}>
                  <span>{val.text}</span>
                </div>
                <div className={val.children === 'right' ? classes.itemIcon : classes.itemContent}>
                  {
                    footerObj[val.children].map((v) => {
                      if (v.name) {
                        return (
                          <LinkRouter
                            key={v.id}
                            to={v.link}
                            className={classes.links}
                          >
                            {v.name}
                          </LinkRouter>
                        );
                      }
                      return <v.icon />;
                    })
                  }
                </div>
              </div>
            ))
          }
        </div>
        <div className={classes.copyright}>
          <p>©Copyright 2016 - 2019 InfluDigital Corporation.</p>
          <p> All Rights Reserved.</p>
        </div>
      </div>
    </div>
  );
};

export default Footer;
