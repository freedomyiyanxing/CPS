import FooterNavigation from './footer-navigation';
import NotHeaderNavigation from './not-header-navigation';
import HeaderNavigation from './header-navigation';
import Home from '../component/home/home';
import NotHome from '../component/home/not-home';
import Login from '../component/login/login';
import ForgetPassword from '../component/login/forget-password';
import EmailSentPage from '../component/login/email-sent';
import ResetPassword from '../component/login/reset-password';
import Register from '../component/register/index';
import RegisterInfo from '../component/register/register-info';
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
            path: '/not/forget-password',
            exact: true,
            component: ForgetPassword,
            key: 'forget-password-router',
          },
          {
            path: '/not/email-sent',
            exact: true,
            component: EmailSentPage,
            key: 'email-sent-router',
          },
          {
            path: '/not/reset-password',
            exact: true,
            component: ResetPassword,
            key: 'reset-password-router',
          },
          {
            path: '/not/register',
            exact: true,
            component: Register,
            key: 'register-router',
          },
          {
            path: '/not/register-info',
            exact: true,
            component: RegisterInfo,
            key: 'register-info-router',
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
