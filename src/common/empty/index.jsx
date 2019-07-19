import React from 'react';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/core/styles';

import { MySvgIconEmpty } from '../material-ui-component/svg-icon';

const useStyle = makeStyles(theme => ({
  root: {
    width: '100%',
    background: theme.palette.primary[50],
    minHeight: 200,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-evenly',
    flexDirection: 'column',
    color: theme.palette.text.disabled,
    fontSize: theme.typography.fontSizeLg,
  },
  icon: {
    fontSize: 80,
  },
}));

const EmptyPage = (props) => {
  const { title, height } = props;
  const classes = useStyle();
  return (
    <div className={classes.root} style={{ height }}>
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
  title: '暂无数据',
};

export default EmptyPage;
