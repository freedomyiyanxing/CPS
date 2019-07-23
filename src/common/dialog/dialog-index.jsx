import React from 'react';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/core/styles';
import Dialog from '@material-ui/core/Dialog';


const useStyle = makeStyles(() => ({
  root: {
    maxWidth: 600,
    minWidth: 400,
    margin: 0,
    maxHeight: 'calc(100% - 30px)',
  },
  wrapper: {
    margin: [[30, 0]],
    padding: [[0, 20]],
  },
}));

const DialogIndex = (props) => {
  const {
    children, header, footer, wrapperCls,
  } = props;
  const classes = useStyle();

  return (
    <Dialog
      {...props}
      classes={{
        paper: classes.root,
      }}
    >
      {header}
      <div className={`${classes.wrapper} ${wrapperCls}`}>
        {children}
      </div>
      {footer}
    </Dialog>
  );
};

DialogIndex.propTypes = {
  children: PropTypes.node.isRequired, // 弹框的中间内容
  header: PropTypes.node.isRequired,
  footer: PropTypes.node.isRequired,
  wrapperCls: PropTypes.string,
};

DialogIndex.defaultProps = {
  wrapperCls: '',
};

export default DialogIndex;
