import React from 'react';
import PropTypes from 'prop-types';

import HeaderContainer from '../utils/header-container';
import HeaderLeft from '../utils/header-left';
import HeaderRight from '../utils/header-right';


const Header = (props) => {
  const { history } = props;

  return (
    <>
      <HeaderContainer
        leftComponent={<HeaderLeft history={history} />}
        rightComponent={<HeaderRight history={history} />}
      />
    </>
  );
};

Header.propTypes = {
  history: PropTypes.objectOf(PropTypes.object).isRequired,
};


export default Header;
