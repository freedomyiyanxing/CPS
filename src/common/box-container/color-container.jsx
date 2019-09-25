import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/core';
import containerStyle from './style';

const useStyle = makeStyles(containerStyle);

function ColorContainer(props) {
  const {
    isHome, imgUrl, children, floatingLayer,
  } = props;
  const [load, setLoad] = useState(true);

  const classes = useStyle({
    isHome,
  });

  const handleLoad = () => {
    setLoad(false);
  };
  return (
    <div className={classes.container}>
      <div className={classes.root}>
        <div className={classes.img}>
          <img className={load ? classes.placeholderImg : ''} src={imgUrl} alt="faq-bg" onLoad={handleLoad} />
        </div>
        <div className={classes.wrapper}>
          {floatingLayer}
        </div>
      </div>
      <div className={classes.content}>
        {children}
      </div>
    </div>
  );
}

ColorContainer.propTypes = {
  imgUrl: PropTypes.string.isRequired,
  children: PropTypes.node.isRequired,
  floatingLayer: PropTypes.node.isRequired,
  isHome: PropTypes.bool,
};

ColorContainer.defaultProps = {
  isHome: false,
};

export default ColorContainer;
