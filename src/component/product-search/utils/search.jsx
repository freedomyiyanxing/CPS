/* eslint-disable */
import React from 'react';
import PropTypes from 'prop-types';
import { createForm, formShape } from 'rc-form';
import { withStyles } from '@material-ui/core/styles';

import Name from '../../../common/form/name';
import SubmitButton from '../../../common/form/submit-button';
import MySelect from '../../../common/form/my-select';
import MyPrice from '../../../common/form/my-price';
import MyPercentage from '../../../common/form/my-percentage';
import { setSearchArg, setCategory } from '../../../asstes/js/utils-methods';
import { get } from '../../../asstes/http/index';

import { searchStyle } from '../style';

@withStyles(searchStyle)
@createForm()
class Search extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      category: null,
    };
    this.cate = null;
  }

  componentDidMount() {
    get('/api/promotions/prodCates')
      .then((response) => {
        this.cate = response;
        this.setState({
          category: setCategory(response),
        });
      })
  }

  handleSubmit = () => {
    const { form, viewRef } = this.props;
    let ayc = null;
    form.validateFields((error, value) => {
      if (value.category) {
        for (let i = 0; i < this.cate.length; i += 1) {
          if (this.cate[i].name === value.category) {
            value.category = this.cate[i].id;
            break;
          }
        }
      }
      if (!error) {
        ayc = viewRef.current.getData(setSearchArg(value), 1);
      }
    });
    return ayc;
  };

  render() {
    const { classes, form } = this.props;
    const { category } = this.state;
    return (
      <div className={classes.root}>
        <div className={classes.wrapper}>
          <h4 className={classes.title}>Search</h4>
          <Name
            form={form}
            name="Product Name :"
            noRequire={false}
            outputName="name"
            fontSize="sm"
          />
          {
            category
              ? (
                <MySelect
                  form={form}
                  name="Product Category :"
                  outputName="category"
                  selectArr={category}
                  noRequire={false}
                  fontSize="sm"
                />
              )
              : null
          }
          <Name
            form={form}
            name="Belong Store :"
            noRequire={false}
            outputName="store"
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
  viewRef: PropTypes.objectOf(PropTypes.object).isRequired,
  form: formShape.isRequired,
};

export default Search;
