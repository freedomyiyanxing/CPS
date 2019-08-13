import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';

import MyButton from '../material-ui-component/button';
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
    const { bank, disabled } = this.props;
    // 回车事件
    if (e.keyCode === 13 && !disabled) {
      this.handleClick();
    }
    // Esc事件
    if (e.keyCode === 27 && bank) {
      this.handleBack();
    }
  };

  // 提交事件
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
      }).catch(() => {
        this.setState({
          loading: false,
        });
      });
    }
  };

  // 回退事件
  handleBack = () => {
    const { history } = this.props;
    if (history) {
      history.push('/my/account');
    }
  };

  render() {
    const {
      name, width, classes, bank, disabled, styles,
    } = this.props;
    const { loading } = this.state;
    return (
      <div
        style={styles}
        className={`${classes.wrapperBtn} ${bank ? classes.bank : ''}`}
      >
        <MyButton
          disabled={disabled}
          fullWidth
          variant="contained"
          color="primary"
          loading={loading}
          className={classes.btn}
          onClick={this.handleClick}
          style={{ width: `${width}px` }}
        >
          {name}
        </MyButton>
        {
          bank
            ? (
              <MyButton
                variant="contained"
                color="primary"
                className={classes.btn}
                style={{ width: `${width}px` }}
                onClick={this.handleBack}
              >
                Bank
              </MyButton>
            )
            : null
        }
      </div>
    );
  }
}

SubmitButton.propTypes = {
  classes: PropTypes.objectOf(PropTypes.object).isRequired,
  handleSubmit: PropTypes.func.isRequired,
  name: PropTypes.string.isRequired,
  width: PropTypes.string,
  bank: PropTypes.bool, // 是否添加 回退按钮
  history: PropTypes.objectOf(PropTypes.object),
  disabled: PropTypes.bool,
  styles: PropTypes.objectOf(PropTypes.object),
};

SubmitButton.defaultProps = {
  width: null,
  bank: false,
  history: null,
  disabled: false,
  styles: null,
};

export default SubmitButton;
