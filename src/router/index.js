import FooterNavigation from './footer-navigation';
import HeaderNavigation from './header-navigation';
import Home from '../component/home/home';
import Login from '../component/login/login';

const routers = [
  {
    path: '/',
    component: FooterNavigation,
    key: 'footer-navigation-router',
    routes: [
      {
        path: '/not',
        component: HeaderNavigation,
        key: 'header-navigation-router',
        routes: [
          {
            path: '/not/index',
            exact: true,
            component: Home,
            key: 'home-router',
          },
          {
            path: '/not/login',
            exact: true,
            component: Login,
            key: 'login-router',
          },
        ],
      },
    ],
  },
];

export default routers;
