import React from 'react';
import PropTypes from 'prop-types';
import { createForm, formShape } from 'rc-form';
import { withStyles } from '@material-ui/core/styles/index';

import MyTextarea from '../../../common/form/my-textarea';
import MySelect from '../../../common/form/my-select';
import SubmitButton from '../../../common/form/submit-button';
import DateRange from '../../../common/date-picker/rc-calendar';

import { searchStyle } from './style';

const arr = ['Get Earning', 'Withdraw'];

@withStyles(searchStyle)
@createForm()
class SearchLeft extends React.Component {
  constructor() {
    super();
    this.date = null; // 存储日期区间
  }

  handleSubmit = () => {
    const { form } = this.props;
    let ayc = null;
    form.validateFields((error, value) => {
      if (!error) {
        ayc = new Promise((resolve) => {
          setTimeout(() => {
            console.log({ ...value, date: this.date });
            resolve(true);
          }, 1000);
        });
      } else {
        ayc = null;
      }
    });
    return ayc;
  };

  getDate = (date) => {
    this.date = date;
    console.log('选择时间', date);
  };

  render() {
    const { classes, form } = this.props;
    return (
      <div className={classes.root}>
        <div className={classes.wrapper}>
          <h4 className={classes.title}>Search</h4>
          <DateRange getDate={this.getDate} is />
          <MySelect
            form={form}
            name="Type :"
            outputName="type"
            selectArr={arr}
            noRequire={false}
            fontSize="sm"
          />
          <MyTextarea
            form={form}
            noRequire={false}
            name="Description :"
            fontSize="sm"
          />
          <SubmitButton
            name="Apply"
            handleSubmit={this.handleSubmit}
          />
        </div>
      </div>
    );
  }
}

SearchLeft.propTypes = {
  classes: PropTypes.objectOf(PropTypes.object).isRequired,
  form: formShape.isRequired,
};

export default SearchLeft;
