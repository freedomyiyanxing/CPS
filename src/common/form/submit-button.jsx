import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import CircularProgress from '@material-ui/core/CircularProgress';

import MyButton from '../material-ui-compoents/button';
import { submitButtonStyle } from './style';

@withStyles(submitButtonStyle)
class SubmitButton extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      loading: false,
    };
  }

  componentDidMount() {
    document.addEventListener('keydown', this.onKeyDown);
  }

  componentWillUnmount() {
    document.removeEventListener('keydown', this.onKeyDown);
  }

  // 键盘回车事件 (Enter)
  onKeyDown = (e) => {
    if (e.keyCode === 13) {
      this.handleClick();
    }
  };

  handleClick = () => {
    const { handleSubmit } = this.props;
    const promise = handleSubmit();
    if (promise) {
      this.setState({
        loading: true,
      });
      promise.then(() => {
        this.setState({
          loading: false,
        });
      });
    }
  };

  render() {
    const { name, width, classes } = this.props;
    const { loading } = this.state;
    return (
      <div className={classes.wrapperBtn}>
        <MyButton
          fullWidth
          variant="contained"
          color="primary"
          loading={loading}
          className={classes.btn}
          onClick={this.handleClick}
          style={{ width }}
        >
          {
            loading
              ? <CircularProgress size={24} />
              : name
          }
        </MyButton>
      </div>
    );
  }
}

SubmitButton.propTypes = {
  classes: PropTypes.objectOf(PropTypes.object).isRequired,
  handleSubmit: PropTypes.func.isRequired,
  name: PropTypes.string.isRequired,
  width: PropTypes.string,
};

SubmitButton.defaultProps = {
  width: null,
};

export default SubmitButton;
