import React from 'react';
import PropTypes from 'prop-types';
import { createForm, formShape } from 'rc-form';
import { withStyles } from '@material-ui/core/styles/index';

import MyTextarea from '../../../common/form/my-textarea';
import MySelect from '../../../common/form/my-select';
import SubmitButton from '../../../common/form/submit-button';

import { searchStyle } from './style';

const arr = ['Get Earning', 'Withdraw'];

@withStyles(searchStyle)
@createForm()
class SearchLeft extends React.Component {
  handleSubmit = () => {
    const { form } = this.props;
    let ayc = null;
    form.validateFields((error, value) => {
      if (!error) {
        ayc = new Promise((resolve) => {
          setTimeout(() => {
            console.log({ ...value });
            resolve(true);
          }, 1000);
        });
      } else {
        ayc = null;
      }
    });
    return ayc;
  };

  render() {
    const { classes, form } = this.props;
    return (
      <div className={classes.root}>
        <h4 className={classes.title}>Search</h4>
        <MySelect
          form={form}
          name="Type :"
          outputName="type"
          selectArr={arr}
          noRequire={false}
        />
        <MyTextarea
          form={form}
          noRequire={false}
          name="Description :"
        />
        <SubmitButton
          name="Apply"
          handleSubmit={this.handleSubmit}
        />
      </div>
    );
  }
}

SearchLeft.propTypes = {
  classes: PropTypes.objectOf(PropTypes.object).isRequired,
  form: formShape.isRequired,
};

export default SearchLeft;
