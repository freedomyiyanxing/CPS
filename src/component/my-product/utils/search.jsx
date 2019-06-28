import React from 'react';
import PropTypes from 'prop-types';
import { createForm, formShape } from 'rc-form';
import { withStyles } from '@material-ui/core/styles';

import Name from '../../../common/form/name';
import SubmitButton from '../../../common/form/submit-button';
import MySelect from '../../../common/form/my-select';

import { searchStyle } from '../style';

@withStyles(searchStyle)
@createForm()
class Search extends React.Component {
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
        <div className={classes.wrapper}>
          <h4 className={classes.title}>Operating area</h4>
          <Name
            form={form}
            name="Product Name :"
            noRequire={false}
            outputName="ProductName"
            fontSize="sm"
          />
          <MySelect
            form={form}
            name="Status :"
            outputName="Status"
            selectArr={['Normal', 'invalid']}
            noRequire={false}
            fontSize="sm"
          />
          <MySelect
            form={form}
            name="Product Category :"
            outputName="ProductCategory"
            selectArr={['1', '2']}
            noRequire={false}
            fontSize="sm"
          />
          <Name
            form={form}
            name="Belong Store :"
            noRequire={false}
            outputName="BelongStore"
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

Search.propTypes = {
  classes: PropTypes.objectOf(PropTypes.object).isRequired,
  form: formShape.isRequired,
};

export default Search;
