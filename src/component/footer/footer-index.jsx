import React from 'react';
import uuid from 'uuid';
import { makeStyles } from '@material-ui/core/styles';

import footerStyle from './style';
import footerObj from './mask';

const useStyles = makeStyles(footerStyle);

const title = [
  {
    id: uuid(),
    text: 'ABOUT INFLUMONSTER',
    children: footerObj.left,
  },
  {
    id: uuid(),
    text: 'CUSTOMER SERVICE',
    children: footerObj.middle,
  },
  {
    id: uuid(),
    text: 'FOLLOW INFLUMONSTER',
    children: null,
  },
];

const FooterIndex = () => {
  const classes = useStyles();
  return (
    <div className={classes.root}>
      <div className={classes.wrapper}>
        <div className={classes.footerNavigation}>
          {
            title.map(val => (
              <div key={val.id} className={classes.item}>
                <div className={classes.itemHeader}>
                  <span>{val.text}</span>
                </div>
                <div className={classes.itemContent}>
                  {
                    val.children
                      ? (
                        val.children.map(v => (
                          <a
                            className={classes.links}
                            href={v.url}
                            key={v.id}
                          >
                            {v.name}
                          </a>
                        ))
                      )
                      : null
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

export default FooterIndex;
