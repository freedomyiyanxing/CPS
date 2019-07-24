import React from 'react';
import PropTypes from 'prop-types';
import { createForm, formShape } from 'rc-form';
import { withStyles } from '@material-ui/core/styles/index';

import MyTextarea from '../../../common/form/my-textarea';
import MySelect from '../../../common/form/my-select';
import SubmitButton from '../../../common/form/submit-button';
import DateRange from '../../../common/date-picker/date-range';
import { myBalanceType } from '../../../asstes/data/default-data';
import { getSelectIndex } from '../../../asstes/js/utils-methods';

import { searchStyle } from './style';

let dateStart = null;
let dateEnd = null;

@withStyles(searchStyle)
@createForm()
class SearchLeft extends React.Component {
  handleSubmit = () => {
    const { form } = this.props;
    let ayc = null;
    form.validateFields((error, value) => {
      if (!error) {
        const obj = {
          ...value,
          type: getSelectIndex(value.type, myBalanceType),
          dateStart,
          dateEnd,
        };
        ayc = new Promise((resolve) => {
          setTimeout(() => {
            console.log(obj);
            resolve(true);
          }, 1000);
        });
      }
    });
    return ayc;
  };

  // 选择时间
  getDate = (date) => {
    const { start, end } = date;
    dateStart = start;
    dateEnd = end;
  };

  render() {
    const { classes, form } = this.props;
    return (
      <div className={classes.root}>
        <div className={classes.wrapper}>
          <h4 className={classes.title}>Search</h4>
          <DateRange onChange={this.getDate} is />
          <MySelect
            form={form}
            name="Type :"
            outputName="type"
            selectArr={myBalanceType}
            noRequire={false}
            fontSize="sm"
          />
          <MyTextarea
            form={form}
            noRequire={false}
            outputName="desc"
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
