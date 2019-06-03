import FooterNavigation from './footer-navigation';
import NotHeaderNavigation from './not-header-navigation';
import HeaderNavigation from './header-navigation';
import Home from '../component/home/home';
import NotHome from '../component/home/not-home';
import Login from '../component/login/login';
import Not404 from '../component/not-404/not-404';

const routers = [
  {
    path: '/',
    component: FooterNavigation,
    key: 'footer-navigation-router',
    routes: [
      {
        path: '/not',
        component: NotHeaderNavigation,
        key: 'not-header-navigation-router',
        routes: [
          {
            path: '/not/index',
            exact: true,
            component: NotHome,
            key: 'home-router',
          },
          {
            path: '/not/login',
            exact: true,
            component: Login,
            key: 'login-router',
          },
          {
            component: Not404,
            key: 'no-match-router',
          },
        ],
      },
      {
        path: '/yes',
        component: HeaderNavigation,
        key: 'header-navigation-router',
        routes: [
          {
            path: '/yes/index',
            exact: true,
            component: Home,
            key: 'home-router',
          },
          {
            component: Not404,
            key: 'no-match-router',
          },
        ],
      },
      {
        component: Not404,
        key: 'all-no-match-router',
      },
    ],
  },
];

export default routers;
