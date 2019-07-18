import React, { createRef } from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';

import MainContainer from '../../common/box-container/main-container';
import Search from './utils/search';
import View from './utils/view';

import { indexStyle } from './style';

@withStyles(indexStyle)
class ProductSearch extends React.Component {
  constructor(props) {
    super(props);
    this.viewRef = createRef();
  }

  render() {
    const { classes } = this.props;
    return (
      <MainContainer className={classes.root}>
        <Search viewRef={this.viewRef} />
        <View ref={this.viewRef} />
      </MainContainer>
    );
  }
}

ProductSearch.propTypes = {
  classes: PropTypes.objectOf(PropTypes.object).isRequired,
};

export default ProductSearch;
