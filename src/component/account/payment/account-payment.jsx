import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Script from 'react-load-script';
import { createForm, formShape } from 'rc-form';

import MainContainer from '../../../common/box-container/main-container';
import SubmitButton from '../../../common/form/submit-button';
import MySelect from '../../../common/form/my-select';
import Container from '../utils/container';
import PaypalView from '../../../common/paypal/paypal-view';

import { openNotifications } from '../../../common/prompt-box/prompt-box';
import { paymentPrompt } from '../../../asstes/data/prompt-text';
import {
  get, postRequestBody, deleteRequestBody, SUCCESS,
} from '../../../asstes/http/index';
import { paymentStyle } from '../style';

@withStyles(paymentStyle)
@createForm()
class Payment extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      loading: false,
      isPaypal: null,
    };
  }

  componentDidMount() {
    this._unmount = true;

    // 查询绑定的提现账号
    this.getWithdraw();

    // 查询系统设置
    this.getSystemSetting();
  }

  componentWillUnmount() {
    this._unmount = false;
  }

  /**
   * 查询绑定的提现账号
   */
  getWithdraw = () => {
    const { history } = this.props;
    get('/api/payout/binding')
      .then((response) => {
        if (this._unmount) {
          this.setState({
            isPaypal: response,
            loading: !(history.location.search && !response.id),
          });
        }
        // 说明是从paypal返回进来的,
        if (history.location.search && !response.id) {
          const url = decodeURIComponent(history.location.search);
          const search = url.substr(1, url.length - 1);
          const [name, value] = search.split('&')[0].split('=');
          if (name === 'code') {
            this.setState({
              loading: false,
            });

            postRequestBody('/api/payout/binding/paypal', {
              code: value,
            })
              .then((resp) => {
                if (this._unmount) {
                  this.setState({
                    isPaypal: resp,
                    loading: true,
                  });
                }
                openNotifications.open({
                  message: paymentPrompt.addPaypalSuccess,
                  variant: 'success',
                });
              })
              .catch((err) => {
                console.log(err);
              });

            // 防止傻逼 在请求过程中... 刷新页面, 从而导致多次请求paypal接口
            history.push('/my/account-payment');
          } else {
            openNotifications.open({
              message: paymentPrompt.paypalLoginError,
              variant: 'error',
            });
            this.setState({
              loading: true,
            });
          }
        }
      })
      .catch((err) => {
        console.log(err);
        this.setState({
          loading: true,
        });
      });
  };

  /**
   * 查询系统设置
   */
  getSystemSetting = () => {
    if (!window.__payment__info__) {
      get('/api/common/settings')
        .then((response) => {
          window.__payment__info__ = response;
        })
        .catch((err) => {
          console.log(err);
        });
    }
  };


  /**
   * paypal.js 加载完成时触发
   */
  handleScriptLoad = () => {
    if (window.__payment__info__) {
      const { paypal } = window;
      const obj = {
        appid: window.__payment__info__.paypal.appId,
        returnurl: 'http://192.168.1.22:8899/my/account-payment',
        scopes: 'openid email profile https://uri.paypal.com/services/paypalattributes',
        containerid: 'cwppButton',
        responseType: 'id_Token',
        locale: 'en-us',
        buttonShape: 'rectangle',
        buttonSize: 'lg',
        fullPage: 'true',
      };

      if (window.__payment__info__.paypal.mode === 'sandbox') {
        obj.authend = 'sandbox';
      }
      paypal.use(['login'], (login) => {
        login.render(obj);
      });
    }
  };

  /**
   * 移除paypal账号
   */
  handleDeletePaypal = () => {
    const { history } = this.props;
    const { isPaypal } = this.state;
    history.push('/my/account-payment');
    this.setState({
      loading: false,
    });
    deleteRequestBody(`/api/payout/unbinding/${isPaypal.id}`)
      .then((response) => {
        const { message } = response;
        if (message === SUCCESS) {
          this.setState({
            isPaypal: null,
            loading: true,
          });
          openNotifications.open({
            message: paymentPrompt.deleteSuccess,
            variant: 'success',
          });
        }
      })
      .catch((err) => {
        openNotifications.open({
          message: err.data.message || paymentPrompt.deleteError,
          variant: 'error',
        });
      });
  };

  render() {
    const { classes, form, history } = this.props;
    const { isPaypal, loading } = this.state;
    return (
      <>
        <MainContainer>
          <Container title="Basic Payment">
            <MySelect
              form={form}
              name="Payment Method *"
              outputName="category"
              selectArr={['Paypal']}
              noRequire={false}
              value="Paypal"
            />
            <div id="cwppButton" className={classes.root}>
              {
                // eslint-disable-next-line no-nested-ternary
                loading
                  ? (
                    isPaypal && isPaypal.id
                      ? (
                        <PaypalView
                          data={isPaypal}
                          className={classes.palpay}
                          handleDelete={this.handleDeletePaypal}
                        />
                      )
                      : (
                        <Script
                          url="https://www.paypalobjects.com/js/external/connect/api.js"
                          onLoad={this.handleScriptLoad}
                        />
                      )
                  )
                  : <div>loading...</div>
              }
            </div>
            <SubmitButton
              bank
              width="180"
              name="Submit"
              history={history}
              disabled
              handleSubmit={() => {}}
            />
          </Container>
        </MainContainer>
      </>
    );
  }
}

Payment.propTypes = {
  classes: PropTypes.objectOf(PropTypes.object).isRequired,
  history: PropTypes.objectOf(PropTypes.object).isRequired,
  form: formShape.isRequired,
};

export default Payment;
