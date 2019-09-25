import React from 'react';
import PropTypes from 'prop-types';
import { inject } from 'mobx-react';

import HeaderContainer from '../utils/header-container';
import NotLeft from '../utils/not-header-left';
import HeaderLeft from '../utils/header-left';
import HeaderRight from '../utils/header-right';

const Header = ({ userStore, history }) => (
  <HeaderContainer
    scroll
    leftComponent={
      userStore.isLogin ? <HeaderLeft history={history} /> : <NotLeft />
    }
    rightComponent={
      userStore.isLogin ? <HeaderRight history={history} /> : null
    }
  />
);

Header.propTypes = {
  userStore: PropTypes.objectOf(PropTypes.object).isRequired,
  history: PropTypes.objectOf(PropTypes.object).isRequired,
};

const Headers = inject('userStore')(Header);

export default Headers;
