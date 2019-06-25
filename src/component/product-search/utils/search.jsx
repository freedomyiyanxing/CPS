import React from 'react';
import PropTypes from 'prop-types';
import { createForm, formShape } from 'rc-form';
import { withStyles } from '@material-ui/core/styles';

import Name from '../../../common/form/name';
import SubmitButton from '../../../common/form/submit-button';
import MySelect from '../../../common/form/my-select';
import MyPrice from '../../../common/form/my-price';
import MyPercentage from '../../../common/form/my-percentage';

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
        <h4 className={classes.title}>Search</h4>
        <Name
          form={form}
          name="Product Name :"
          noRequire={false}
          outputName="ProductName"
        />
        <MySelect
          form={form}
          name="Product Category :"
          outputName="ProductCategory"
          selectArr={['1', '2']}
          noRequire={false}
        />
        <Name
          form={form}
          name="Belong Store :"
          noRequire={false}
          outputName="BelongStore"
        />
        <MyPrice form={form} />
        <MyPercentage form={form} />
        <SubmitButton
          name="Apply"
          handleSubmit={this.handleSubmit}
        />
      </div>
    );
  }
}

Search.propTypes = {
  classes: PropTypes.objectOf(PropTypes.object).isRequired,
  form: formShape.isRequired,
};

export default Search;
