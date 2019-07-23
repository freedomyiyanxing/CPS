/* eslint-disable */
import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Script from 'react-load-script';
import { createForm, formShape } from 'rc-form';
import IconButton from '@material-ui/core/IconButton';

import MainContainer from '../../../common/box-container/main-container';
import SubmitButton from '../../../common/form/submit-button';
import MySelect from '../../../common/form/my-select';
import Container from '../utils/container';

import {
  MySvgIconSocialPaypal,
  MySvgIconDelete,
} from '../../../common/material-ui-component/svg-icon';
import { get, SUCCESS } from '../../../asstes/http/index';
import { paymentStyle } from '../style';


@withStyles(paymentStyle)
@createForm()
class Payment extends React.Component{
  constructor(props) {
    super(props);
    this.state = {
      loading: false,
      isPaypal: null,
    }
  }

  componentDidMount() {
    // 查询绑定的提现账号
    get('/api/payout/binding')
      .then((response) => {
        this.setState({
          isPaypal: response,
          loading: true,
        });
        // console.log(response);
      })
      .catch((err) => {
        console.log(err);
        this.setState({
          loading: true,
        })
      });

    get('/api/common/settings')
      .then((response) => {
        window.__payment__info__ = response;
        console.log(window.__payment__info__);
      })
      .catch((err) => {
        console.log(err);
      })
  }

  /**
   * 提交事件
   * @returns {*} 验证正确的情况下返回一个 promise对象
   */
  handleSubmit = () => new Promise((resolve) => {
  });

  // paypal.js 加载完成时触发
  handleScriptLoad = () => {
    console.log(window.__payment__info__.paypal);
    paypal.use( ['login'], function (login) {
      login.render ({
        'appid': window.__payment__info__.paypal.appId,
        'authend': window.__payment__info__.paypal.mode,
        'returnurl': 'http://192.168.1.20:8800/my/account-payment', //window.__payment__info__.paypal.returnUrl,
        'scopes': 'openid email profile https://uri.paypal.com/services/paypalattributes',
        'containerid': 'cwppButton',
        'responseType': 'code',
        'locale': 'en-us',
        'buttonType': 'CWP',
        'buttonShape': 'rectangle',
        'buttonSize': 'lg',
        'fullPage': 'true',
      });
    });
  };

  render() {
    const { classes, form, history } = this.props;
    const { loading, isPaypal } = this.state;
    return (
      <>
        <MainContainer>
          <Container title="Basic Payment">
            <MySelect
              form={form}
              name="Payment Method *"
              outputName="category"
              selectArr={['paypal']}
              noRequire={false}
              value="paypal"
            />
            <div className={classes.root} id='cwppButton'>
            {
              loading
                ? (
                isPaypal
                  ? (
                      <div className={classes.palpayWrapper}>
                        <MySvgIconSocialPaypal className={classes.paypalIcon} />
                        <div className={classes.textWrapper}>
                          <h2>Alex Huang</h2>
                          <p>Alex Huang@gmail.com</p>
                        </div>
                        <IconButton className={classes.iconButton}>
                          <MySvgIconDelete className={classes.icon} />
                        </IconButton>
                      </div>
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
              handleSubmit={this.handleSubmit}
            />
          </Container>
        </MainContainer>
      </>
    )
  }
}

Payment.propTypes = {
  classes: PropTypes.objectOf(PropTypes.object).isRequired,
  history: PropTypes.objectOf(PropTypes.object).isRequired,
  form: formShape.isRequired,
};

export default Payment;
