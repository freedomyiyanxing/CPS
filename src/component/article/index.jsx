import React from 'react';
import PropTypes from 'prop-types';
import { inject } from 'mobx-react';

import LoginHeaders from '../header/login-header/header';
import NotLoginHeaders from '../header/not-login-header/header';
import BoxContainer from '../../common/box-container/index';
import { renderRoutes } from '../../router/render-routes';

const ArticleContainer = (props) => {
  const { history, route, userStore } = props;
  return (
    <>
      {
        userStore.isLogin
          ? <LoginHeaders history={history} />
          : <NotLoginHeaders history={history} />
      }
      <BoxContainer>
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
