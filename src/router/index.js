import uuid from 'uuid';
import loadable from '@loadable/component';

import FooterNavigation from './footer-navigation';
import NotHeaderNavigation from './not-header-navigation';
import HeaderNavigation from './header-navigation';
import Not404 from '../component/not-404/index';

const Home = loadable(() => import('../component/home/home'));
const ProductSearch = loadable(() => import('../component/product-search/index'));
const MyProducts = loadable(() => import('../component/my-product/index'));
const NotHome = loadable(() => import('../component/home/not-home'));
const Login = loadable(() => import('../component/login/login'));
const ForgetPassword = loadable(() => import('../component/login/forget-password'));
const EmailSentPage = loadable(() => import('../component/login/email-sent'));
const ResetPassword = loadable(() => import('../component/login/reset-password'));
const Register = loadable(() => import('../component/register/index'));
const RegisterInfo = loadable(() => import('../component/register/register-info'));
const RegisterWait = loadable(() => import('../component/register/register-wait'));
const AccountBalance = loadable(() => import('../component/account/balance/account-balance'));
const AccountIndex = loadable(() => import('../component/account/index'));
const WibsiteSetting = loadable(() => import('../component/account/wibsite/wibsite-setting'));
const BasicSetting = loadable(() => import('../component/account/basic/basic-setting'));
const AccountPassword = loadable(() => import('../component/account/password/account-password'));
const Payment = loadable(() => import('../component/account/payment/account-payment'));
const Taxes = loadable(() => import('../component/account/taxes/account-taxes'));

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
        // auth: false,
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
            path: '/s/signup/wait',
            exact: true,
            component: RegisterWait,
            key: uuid(),
          },
          {
            component: Not404,
            key: uuid(),
          },
        ],
      },
      {
        path: '/my',
        component: HeaderNavigation,
        key: uuid(),
        // auth: true,
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
            path: '/my/account-payment',
            exact: true,
            component: Payment,
            key: uuid(),
          },
          {
            path: '/my/account-taxes',
            exact: true,
            component: Taxes,
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
