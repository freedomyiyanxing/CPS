import React from 'react';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/core/styles';
import { containerStyle } from '../style';

const useStyle = makeStyles(containerStyle);

const Container = (props) => {
  const { children, title, component } = props;
  const classes = useStyle();
  return (
    <>
      <div className={classes.title}>
        {title}
      </div>
      <div className={classes.root}>
        <div className={classes.wrapper}>
          {children}
        </div>
        {component}
      </div>
    </>
  );
};

Container.propTypes = {
  children: PropTypes.node.isRequired,
  title: PropTypes.string.isRequired,
  component: PropTypes.node,
};

Container.defaultProps = {
  component: null,
};


export default Container;
