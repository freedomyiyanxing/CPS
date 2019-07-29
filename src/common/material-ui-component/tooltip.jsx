import React from 'react';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/core/styles';
import Tooltip from '@material-ui/core/Tooltip';

import { MySvgIconPrompt } from './svg-icon';

const useStyle = makeStyles(theme => ({
  root: {
    margin: [[10, 0]],
    padding: 14,
    fontSize: theme.typography.fontSize,
    background: theme.palette.primary[50],
    color: theme.palette.text.primary,
    boxShadow: theme.shadows[6],
    borderRadius: 4,
  },
  svgWrapper: {
    width: 20,
    height: 20,
    cursor: 'pointer',
  },
  svgIcon: {
    fontSize: theme.typography.h4.fontSize,
    color: theme.palette.inherit[500],
  },
}));

const MyTooltip = (props) => {
  const { text } = props;
  const classes = useStyle();
  return (
    <Tooltip
      title={text}
      placement="top-start"
      classes={{
        tooltip: classes.root,
      }}
    >
      <div className={classes.svgWrapper}>
        <MySvgIconPrompt className={classes.svgIcon} />
      </div>
    </Tooltip>
  );
};

MyTooltip.propTypes = {
  text: PropTypes.string.isRequired,
};

export default MyTooltip;
