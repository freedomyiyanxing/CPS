import React from 'react';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/core/styles';

import { title } from './mask';

import footerStyle from './style';

const useStyles = makeStyles(footerStyle);


const FooterIndex = (props) => {
  const { history } = props;
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <div className={classes.wrapper}>
        <div className={classes.footerNavigation}>
          {
            title.map(val => (
              <div key={val.id}>
                <div className={classes.itemHeader}>
                  <span>{val.text}</span>
                </div>
                <div className={classes.itemContent}>
                  {
                    val.children
                      ? (
                        val.children.map(v => (
                          <span
                            className={classes.links}
                            // href={v.url}
                            key={v.id}
                            tabIndex={0}
                            role="button"
                            onClick={() => { history.push(v.url); }}
                          >
                            {v.name}
                          </span>
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

FooterIndex.propTypes = {
  history: PropTypes.objectOf(PropTypes.object).isRequired,
};

export default FooterIndex;
