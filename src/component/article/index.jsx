import React from 'react';
import PropTypes from 'prop-types';
import { inject } from 'mobx-react';

import HeaderLogin from '../header/header-login';
import HeaderNotLogin from '../header/header-not-login';
import BoxContainer from '../../common/box-container/index';
import { renderRoutes } from '../../router/render-routes';

const ArticleContainer = (props) => {
  const { history, route, userStore } = props;
  return (
    <>
      {
        userStore.isLogin
          ? <HeaderLogin history={history} />
          : <HeaderNotLogin history={history} />
      }
      <BoxContainer marginTop={userStore.isLogin ? 112 : 68}>
        {
          renderRoutes(route.routes)
        }
      </BoxContainer>
    </>
  );
};

ArticleContainer.propTypes = {
  userStore: PropTypes.objectOf(PropTypes.object).isRequired,
  history: PropTypes.objectOf(PropTypes.object).isRequired,
  route: PropTypes.objectOf(PropTypes.object).isRequired,
};

const ArticleContainers = inject('userStore')(ArticleContainer);

export default ArticleContainers;
