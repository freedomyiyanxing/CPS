/* eslint-disable */
import React from 'react';
import { withStyles } from '@material-ui/core/styles';

@withStyles(theme => ({
  root: {
    fontSize: theme.typography.h4.fontSize,
    fontWeight: theme.typography.h4.fontWeight,
    color: theme.palette.text.primary,
    lineHeight: theme.typography.h4.lineHeight,
  },
}))
class Counter extends React.Component {
  static defaultProps = {
    commas: true,
    timeout: 600,
    steps: 10
  };

  constructor(props) {
    super(props);
    this.state = {
      currentStep: 0,
      targetValue: props.value,
      originalValue: 0,
      currentValue: props.value
    };
  }

  componentDidMount() {
    this.setState({
      currentStep: 0,
      originalValue: 0,
      targetValue: this.state.targetValue || 0
    });
    clearInterval(this._interval);
    this._interval = setInterval(()=>{
      if (this.state.currentStep >= this.props.steps) {
        clearInterval(this._interval);
      }
      this.setState({
        currentValue: this.getValue(this.state.currentStep / this.props.steps),
        currentStep: this.state.currentStep + 1
      });
    }, this.props.timeout / this.props.steps);
  }

  componentWillUnmount(){
    clearInterval(this._interval);
  }

  getValue(percent) {
    const diff = this.state.targetValue - this.state.originalValue;
    return (diff * percent) + this.state.originalValue;
  }

  render() {
    let value;
    if (String(this.props.value).indexOf('.') === -1) {
      value = Math.round(this.state.currentValue);
    } else {
      value = this.state.currentValue.toFixed(2);
    }
    return (
      <span className={`beat-number-counter ${this.props.classes.root}`}>
        {
          this.props.unit
            ? this.props.unit === '%'
              ? value + this.props.unit
              : this.props.unit + value
            : value
        }
      </span>
    );
  }
}

export default Counter;
