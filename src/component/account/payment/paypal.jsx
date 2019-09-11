import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Script from 'react-load-script';
import CircularProgress from '@material-ui/core/CircularProgress';

import PaypalView from '../../../common/paypal/paypal-view';

import { get } from '../../../assets/http/index';

// 根据环境配置的 paypal返回url
const paypalRuturnUrl = process.env.PAYPAL_RETURN_URL || '';

@withStyles(theme => ({
  wrapper: {
    width: '100%',
  },
  paypal: {
    height: 78,
  },
  root: {
    width: 225,
    height: 49,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 5,
    backgroundColor: '#0070BA',
  },
  progress: {
    color: theme.palette.primary[50],
  },
}))
class Paypal extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      paypalBtnStatus: false,
    };
  }

  createPaypalBtn = () => {
    this.setState({
      paypalBtnStatus: true,
    });
  };

  /**
   * 获取系统设置
   */
  getSystemSetting = () => {
    if (!window.__payment__info__) {
      get('/api/common/settings')
        .then((response) => {
          window.__payment__info__ = response;
          this.getPaypalBtn(response);
        });
    }
  };

  /**
   * paypal.js 加载完成时触发
   */
  handleScriptLoad = () => {
    if (window.__payment__info__) {
      this.getPaypalBtn(window.__payment__info__);
    } else {
      this.getSystemSetting();
    }
  };

  getPaypalBtn = (val) => {
    const { data } = this.props;
    const { paypalBtnStatus } = this.state;
    if (data.paypalName && data.paypalEmail) {
      return;
    }
    const { paypal } = window;
    const obj = {
      appid: val.paypal.appId,
      returnurl: paypalRuturnUrl,
      scopes: 'openid email profile https://uri.paypal.com/services/paypalattributes',
      containerid: 'cwppButton',
      responseType: 'id_Token',
      locale: 'en-us',
      buttonShape: 'rectangle',
      buttonSize: 'lg',
      fullPage: 'true',
    };

    if (val.paypal.mode === 'sandbox') {
      obj.authend = 'sandbox';
    }
    paypal.use(['login'], (login) => {
      if (paypalBtnStatus) {
        this.setState({
          paypalBtnStatus: false,
        });
      }
      login.render(obj);
    });
  };

  render() {
    const { classes, data, func } = this.props;
    const { paypalBtnStatus } = this.state;
    return (
      <div id="cwppButton" className={classes.wrapper}>
        {
          data.paypalName && data.paypalEmail
            ? (
              <PaypalView
                className={classes.paypal}
                name={data.paypalName}
                info={data.paypalEmail}
                handleDelete={func}
              />
            )
            : (
              <>
                {
                  paypalBtnStatus
                    ? (
                      <div className={classes.root}>
                        <CircularProgress className={classes.progress} />
                      </div>
                    )
                    : null
                }
                <Script
                  url="https://www.paypalobjects.com/js/external/connect/api.js"
                  onLoad={this.handleScriptLoad}
                  onCreate={this.createPaypalBtn}
                />
              </>
            )
        }
      </div>
    );
  }
}

Paypal.propTypes = {
  classes: PropTypes.objectOf(PropTypes.object).isRequired,
  data: PropTypes.objectOf(PropTypes.object).isRequired,
  func: PropTypes.func.isRequired,
};

export default Paypal;
