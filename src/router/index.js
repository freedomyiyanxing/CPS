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
import AccountBalance from '../component/account/balance/account-balance';
import AccountIndex from '../component/account/index';
import WibsiteSetting from '../component/account/wibsite/wibsite-setting';
import BasicSetting from '../component/account/basic/basic-setting';
import AccountPassword from '../component/account/password/account-password';
import Not404 from '../component/not-404/not-404';

const routers = [
  {
    path: '/',
    component: FooterNavigation,
    key: uuid(),
    routes: [
      {
        path: '/s',
        component: NotHeaderNavigation,
        key: uuid(),
        auth: false,
        routes: [
          {
            path: '/s/index',
            exact: true,
            component: NotHome,
            key: uuid(),
          },
          {
            path: '/s/signin',
            exact: true,
            component: Login,
            key: uuid(),
          },
          {
            path: '/s/password/forgot',
            exact: true,
            component: ForgetPassword,
            key: uuid(),
          },
          {
            path: '/s/password/reset',
            exact: true,
            component: ResetPassword,
            key: uuid(),
          },
          {
            path: '/s/email-sent',
            exact: true,
            component: EmailSentPage,
            key: uuid(),
          },
          {
            path: '/s/signup',
            exact: true,
            component: Register,
            key: uuid(),
          },
          {
            path: '/s/signup/confirm',
            exact: true,
            component: RegisterInfo,
            key: uuid(),
          },
          {
            path: '/*',
          },
        ],
      },
      {
        path: '/my',
        component: HeaderNavigation,
        key: uuid(),
        auth: true,
        routes: [
          {
            path: '/my/index',
            exact: true,
            component: Home,
            key: uuid(),
          },
          {
            path: '/my/product-search',
            exact: true,
            component: ProductSearch,
            key: uuid(),
          },
          {
            path: '/my/my-products',
            exact: true,
            component: MyProducts,
            key: uuid(),
          },
          {
            path: '/my/account-balance',
            exact: true,
            component: AccountBalance,
            key: uuid(),
          },
          {
            path: '/my/account',
            exact: true,
            component: AccountIndex,
            key: uuid(),
          },
          {
            path: '/my/account-profile',
            exact: true,
            component: BasicSetting,
            key: uuid(),
          },
          {
            path: '/my/account-website',
            exact: true,
            component: WibsiteSetting,
            key: uuid(),
          },
          {
            path: '/my/account-password',
            exact: true,
            component: AccountPassword,
            key: uuid(),
          },
          {
            path: '/*',
          },
        ],
      },
      {
        path: '/*',
        component: Not404,
        key: uuid(),
      },
    ],
  },
];

export default routers;
