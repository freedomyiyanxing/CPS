import { lazy } from 'react';
import uuid from 'uuid';

import FooterNavigation from './footer-navigation';
import NotHeaderNavigation from './not-header-navigation';
import HeaderNavigations from './header-navigation';
import Lost, { Not404 } from '../component/not-404/index';
import ArticleContainers from '../component/article/index';
import ContactUs from '../component/article/contact-us';
import Test from '../component/article/test';
// import NotHome from '../component/home/not-home';

const NotHome = lazy(() => import('../component/home/not-home'));
const Home = lazy(() => import('../component/home/home'));
const ProductSearch = lazy(() => import('../component/product-search/index'));
const MyProducts = lazy(() => import('../component/my-product/index'));
const Login = lazy(() => import('../component/login/login'));
const ForgetPassword = lazy(() => import('../component/login/forget-password'));
const EmailSentPage = lazy(() => import('../component/login/email-sent'));
const ResetPassword = lazy(() => import('../component/login/reset-password'));
const Register = lazy(() => import('../component/register/index'));
const RegisterInfo = lazy(() => import('../component/register/register-info'));
const RegisterWait = lazy(() => import('../component/register/register-wait'));
const AccountBalance = lazy(() => import('../component/account/balance/account-balance'));
const AccountIndex = lazy(() => import('../component/account/index'));
const WibsiteSetting = lazy(() => import('../component/account/wibsite/wibsite-setting'));
const BasicSetting = lazy(() => import('../component/account/basic/basic-setting'));
const AccountPassword = lazy(() => import('../component/account/password/account-password'));
const Payment = lazy(() => import('../component/account/payment/account-payment'));
const Taxes = lazy(() => import('../component/account/taxes/account-taxes'));

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
        component: HeaderNavigations,
        key: uuid(),
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
            path: '/my/own-products',
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
        path: '/article',
        component: ArticleContainers,
        key: uuid(),
        routes: [
          {
            path: '/article/contact-us',
            exact: true,
            component: ContactUs,
            key: uuid(),
          },
          {
            path: '/article/test',
            exact: true,
            component: Test,
            key: uuid(),
          },
          {
            component: Not404,
            key: uuid(),
          },
        ],
      },
      {
        component: Lost,
        key: uuid(),
      },
    ],
  },
];

export default routers;
