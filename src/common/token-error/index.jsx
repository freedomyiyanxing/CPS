import React from 'react';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/core/styles';

import MyButton from '../material-ui-component/button';

import { emailTokenPagePrompt } from '../../assets/data/prompt-text';

const useStyle = makeStyles(theme => ({
  errorWrapper: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'space-between',
    minHeight: 130,
    alignItems: 'center',
    color: theme.palette.error.main,
  },
  errorTitle: {
    fontSize: theme.typography.h4.fontSize,
    fontWeight: theme.typography.h4.fontWeight,
    lineHeight: theme.typography.h4.lineHeight,
  },
  errorText: {
    fontSize: theme.typography.fontSize,
    fontWeight: theme.typography.fontWeight,
    lineHeight: 1.5,
  },
}));

const TokenError = (props) => {
  const { error, children, history } = props;
  const classes = useStyle();
  return (
    error
      ? (
        <div className={classes.errorWrapper}>
          <h2 className={classes.errorTitle}>{emailTokenPagePrompt.title}</h2>
          <p className={classes.errorText}>{emailTokenPagePrompt.content}</p>
          <MyButton
            variant="contained"
            color="inherit"
            onClick={() => { history.push('/s/signup'); }}
          >
            {emailTokenPagePrompt.btn}
          </MyButton>
        </div>
      )
      : children
  );
};

TokenError.propTypes = {
  history: PropTypes.objectOf(PropTypes.object).isRequired,
  error: PropTypes.bool.isRequired,
  children: PropTypes.node.isRequired,
};

export default TokenError;
