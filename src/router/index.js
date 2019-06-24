import uuid from 'uuid';

import FooterNavigation from './footer-navigation';
import NotHeaderNavigation from './not-header-navigation';
import HeaderNavigation from './header-navigation';
import Home from '../component/home/home';
import ProductSearch from '../component/product-search/index';
import MyProducts from '../component/my-product/index';

import NotHome from '../component/home/not-home';
import Login from '../component/login/login';
import ForgetPassword from '../component/login/forget-password';
import EmailSentPage from '../component/login/email-sent';
import ResetPassword from '../component/login/reset-password';
import Register from '../component/register/index';
import RegisterInfo from '../component/register/register-info';
import AccountSetting from '../component/account/setting/account-setting';
import AccountBalance from '../component/account/balance/account-balance';
import AccountPassword from '../component/account/set-password/account-password';
import Not404 from '../component/not-404/not-404';

const routers = [
  {
    path: '/',
    component: FooterNavigation,
    key: uuid(),
    routes: [
      {
        path: '/not',
        component: NotHeaderNavigation,
        key: uuid(),
        routes: [
          {
            path: '/not/index',
            exact: true,
            component: NotHome,
            key: uuid(),
          },
          {
            path: '/not/login',
            exact: true,
            component: Login,
            key: uuid(),
          },
          {
            path: '/not/forget-password',
            exact: true,
            component: ForgetPassword,
            key: uuid(),
          },
          {
            path: '/not/email-sent',
            exact: true,
            component: EmailSentPage,
            key: uuid(),
          },
          {
            path: '/not/reset-password',
            exact: true,
            component: ResetPassword,
            key: uuid(),
          },
          {
            path: '/not/register',
            exact: true,
            component: Register,
            key: uuid(),
          },
          {
            path: '/not/register-info',
            exact: true,
            component: RegisterInfo,
            key: uuid(),
          },
          {
            component: Not404,
            key: uuid(),
          },
        ],
      },
      {
        path: '/yes',
        component: HeaderNavigation,
        key: uuid(),
        routes: [
          {
            path: '/yes/index',
            exact: true,
            component: Home,
            key: uuid(),
          },
          {
            path: '/yes/product-search',
            exact: true,
            component: ProductSearch,
            key: uuid(),
          },
          {
            path: '/yes/my-products',
            exact: true,
            component: MyProducts,
            key: uuid(),
          },
          {
            path: '/yes/account-setting',
            exact: true,
            component: AccountSetting,
            key: uuid(),
          },
          {
            path: '/yes/account-balance',
            exact: true,
            component: AccountBalance,
            key: uuid(),
          },
          {
            path: '/yes/account-password',
            exact: true,
            component: AccountPassword,
            key: uuid(),
          },
          {
            component: Not404,
            key: uuid(),
          },
        ],
      },
      {
        component: Not404,
        key: uuid(),
      },
    ],
  },
];

export default routers;
