import React from 'react';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';

import not404Style from './style';

const useStyles = makeStyles(not404Style);

const Not404 = (props) => {
  const { location, route } = props;
  const classes = useStyles();
  console.log(route);
  // 如果是在二级路由中未匹配 则添加样式;
  const notIndex = route.key === 'all-no-match-router' ? { height: '100vh' } : {};
  return (
    <div className={classes.root} style={notIndex}>
      <h2>No match for </h2>
      <h3>
        {location.pathname}
      </h3>
      <Button
        variant="contained"
        color="primary"
      >
        回到主页
      </Button>
    </div>
  );
};

Not404.propTypes = {
  location: PropTypes.objectOf(PropTypes.object).isRequired,
  route: PropTypes.objectOf(PropTypes.object).isRequired,
};

export default Not404;
