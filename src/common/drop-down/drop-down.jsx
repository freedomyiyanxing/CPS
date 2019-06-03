import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { CSSTransition } from 'react-transition-group';
import { makeStyles } from '@material-ui/core/styles';

import dropStyle from './style';

const useStyles = makeStyles(dropStyle);

const DropDown = (props) => {
  const { parentRef } = props;
  // eslint-disable-next-line no-unused-vars
  const [showMessage, setShowMessage] = useState(false);
  const classes = useStyles();

  useEffect(() => {
    parentRef.current.onclick = () => {
      setShowMessage(true);
    };

    parentRef.current.onmouseout = () => {
      setShowMessage(false);
    };
  });

  return (
    <CSSTransition
      in={showMessage}
      timeout={300}
      classNames="slide"
      unmountOnExit
    >
      <div
        className={classes.dropDownContainer}
      >
        <span className="drop-down-arrow" />
        <div className={classes.dropDownWrapper}>
          <span>1</span>
          <span>2</span>
        </div>
      </div>
    </CSSTransition>
  );
};

DropDown.propTypes = {
  parentRef: PropTypes.objectOf(PropTypes.object).isRequired,
};

export default DropDown;
