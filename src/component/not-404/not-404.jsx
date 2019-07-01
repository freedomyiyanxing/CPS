import React from 'react';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/core/styles';
import MyButton from '../../common/material-ui-compoents/button';

import not404Style from './style';

const useStyles = makeStyles(not404Style);

const Not404 = (props) => {
  // eslint-disable-next-line no-unused-vars
  const { location, route } = props;
  console.log(props);
  const classes = useStyles();
  // 如果是在二级路由中未匹配 则添加样式;
  // const notIndex = route.key === 'all-no-match-router' ? { height: '100vh' } : {};
  return (
    <div
      className={classes.root}
      // style={notIndex}
    >
      <h2>No match for </h2>
      <h3>
        {location.pathname}
      </h3>
      <MyButton
        variant="contained"
        color="primary"
      >
        回到主页
      </MyButton>
    </div>
  );
};

Not404.propTypes = {
  location: PropTypes.objectOf(PropTypes.object).isRequired,
  route: PropTypes.objectOf(PropTypes.object).isRequired,
};

export default Not404;
