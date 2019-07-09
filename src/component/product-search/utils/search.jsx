import React from 'react';
import PropTypes from 'prop-types';
import { createForm, formShape } from 'rc-form';
import { withStyles } from '@material-ui/core/styles';

import Name from '../../../common/form/name';
import SubmitButton from '../../../common/form/submit-button';
import MySelect from '../../../common/form/my-select';
import MyPrice from '../../../common/form/my-price';
import MyPercentage from '../../../common/form/my-percentage';
import { setSearchArg } from '../../../asstes/js/utils-methods';

import { searchStyle } from '../style';

@withStyles(searchStyle)
@createForm()
class Search extends React.Component {
  handleSubmit = () => {
    const { form, onChange } = this.props;
    let ayc = null;
    form.validateFields((error, value) => {
      if (!error) {
        const arg = setSearchArg(value);
        // 如果没有搜索内容 则直接 return
        if (!Object.keys(arg).length) {
          return null;
        }
        ayc = new Promise((resolve) => {
          setTimeout(() => {
            onChange(arg);
            resolve(true);
          }, 1000);
        });
      }
    });
    return ayc;
  };

  render() {
    const { classes, form } = this.props;
    return (
      <div className={classes.root}>
        <div className={classes.wrapper}>
          <h4 className={classes.title}>Search</h4>
          <Name
            form={form}
            name="Product Name :"
            noRequire={false}
            outputName="productName"
            fontSize="sm"
          />
          <MySelect
            form={form}
            name="Product Category :"
            outputName="ProductCategory"
            selectArr={['1', '2']} // 商品分类需要调用接口
            noRequire={false}
            fontSize="sm"
          />
          <Name
            form={form}
            name="Belong Store :"
            noRequire={false}
            outputName="belongStore"
            fontSize="sm"
          />
          <MyPrice form={form} />
          <MyPercentage form={form} />
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
  onChange: PropTypes.func.isRequired,
  form: formShape.isRequired,
};

export default Search;
