import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';

import MainContainer from '../../common/box-container/main-container';
import Search from './utils/search';
import View from './utils/view';

import { promotions } from '../../../data/data';
import { get } from '../../asstes/http/index';

import { indexStyle } from './style';


@withStyles(indexStyle)
class ProductSearch extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      data: null,
    };
  }

  componentDidMount() {
    this._unmount = true;
    this.getData({ page: 0, size: 10 });
  }

  componentWillUnmount() {
    this._unmount = false;
  }

  getData(value) {
    get('/api/promotions/all', { ...value })
      .then((response) => {
        if (this._unmount) {
          this.setState({
            data: response,
          });
        }
      })
      .catch((err) => {
        console.log(err);
      });
  }

  handleSearch = (value) => {
    console.log(value);
    // this.getData({ page: 0, size: 10, ...value });
  };

  render() {
    const { classes } = this.props;
    const { data } = this.state;
    console.log(data);
    return (
      <MainContainer className={classes.root}>
        <Search onChange={this.handleSearch} />
        <View data={promotions} />
      </MainContainer>
    );
  }
}

ProductSearch.propTypes = {
  classes: PropTypes.objectOf(PropTypes.object).isRequired,
};

export default ProductSearch;
