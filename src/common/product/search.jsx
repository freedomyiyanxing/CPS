import React from 'react';
import PropTypes from 'prop-types';
import { createForm, formShape } from 'rc-form';
import { withStyles } from '@material-ui/core/styles';

import Name from '../form/name';
import SubmitButton from '../form/submit-button';
import MySelect from '../form/my-select';
import MyPrice from '../form/my-price';
import MyPercentage from '../form/my-percentage';
import { setSearchArg, setCategory } from '../../assets/js/utils-methods';
import { get } from '../../assets/http/index';
import { patterns } from '../../assets/data/pattern';

// 缓存商品分类数据
let __cacheProdCates__ = null;

@withStyles(theme => ({
  root: {
    flex: '0 0 330px',
    marginRight: 10,
  },
  wrapper: {
    padding: 10,
    background: theme.palette.primary[50],
  },
  title: {
    color: theme.palette.text.primary,
    fontSize: theme.typography.h6.fontSize,
    fontWeight: theme.typography.h6.fontWeight,
    lineHeight: theme.typography.h6.lineHeight,
  },
}))
@createForm()
class Search extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      category: null,
    };
  }

  componentDidMount() {
    if (__cacheProdCates__) {
      return;
    }

    // 获取商品分类数据
    get('/api/promotions/prodCates')
      .then((response) => {
        // 缓存起来
        __cacheProdCates__ = response;
        this.setState({
          category: setCategory(response),
        });
      });
  }

  handleSubmit = () => {
    const { form, viewRef, statusArr } = this.props;
    let ayc = null;
    const cate = __cacheProdCates__;
    form.validateFields((error, value) => {
      if (value.category) {
        for (let i = 0; i < cate.length; i += 1) {
          if (cate[i].name === value.category) {
            value.category = cate[i].id;
            break;
          }
        }
      }
      if (statusArr && value.valid) {
        value.valid = value.valid === 'Normal'; // 返回 true || false
      }
      if (!error) {
        ayc = viewRef.current.getData(setSearchArg(value), 1);
      }
    });
    return ayc;
  };

  render() {
    const { classes, form, statusArr } = this.props;
    const { category } = this.state;
    const name = setCategory(__cacheProdCates__);
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
            pattern={patterns.productName}
          />
          {
            statusArr
              ? (
                <MySelect
                  form={form}
                  name="Status :"
                  outputName="valid"
                  selectArr={statusArr}
                  noRequire={false}
                  fontSize="sm"
                />
              )
              : null
          }
          {
            name || category
              ? (
                <MySelect
                  form={form}
                  name="Product Category :"
                  outputName="category"
                  selectArr={name || category}
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
            pattern={patterns.productName}
          />
          {
            statusArr
              ? null
              : (
                <>
                  <MyPrice form={form} />
                  <MyPercentage form={form} />
                </>
              )
          }
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
  statusArr: PropTypes.objectOf(PropTypes.array),
  form: formShape.isRequired,
};

Search.defaultProps = {
  statusArr: null,
};

export default Search;
