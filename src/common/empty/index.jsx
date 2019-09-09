import React from 'react';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/core/styles';

import { MySvgIconEmpty } from '../material-ui-component/svg-icon';

const useStyle = makeStyles(theme => ({
  root: props => ({
    width: '100%',
    height: props.height,
    background: theme.palette.primary[50],
    minHeight: 200,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-evenly',
    flexDirection: 'column',
    color: theme.palette.text.disabled,
    fontSize: theme.typography.h6.fontSize,
  }),
  icon: {
    fontSize: 80,
  },
}));

const EmptyPage = (props) => {
  const { title, height } = props;
  const style = {
    height,
  };
  const classes = useStyle(style);
  return (
    <div className={classes.root}>
      <h2>{title}</h2>
      <MySvgIconEmpty className={classes.icon} />
    </div>
  );
};

EmptyPage.propTypes = {
  title: PropTypes.string,
  height: PropTypes.number,
};

EmptyPage.defaultProps = {
  height: null,
  title: 'No data',
};

export default EmptyPage;
