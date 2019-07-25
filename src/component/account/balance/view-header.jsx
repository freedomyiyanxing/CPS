/* eslint-disable */
import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles/index';
import { createForm, formShape } from 'rc-form';
import { Link } from 'react-router-dom';

import DialogIndex from '../../../common/dialog/dialog-index';
import DialogHeader from '../../../common/dialog/dialog-header';
import DialogFooter from '../../../common/dialog/dialog-footer';
import MyButton from '../../../common/material-ui-component/button';
import Password from '../../../common/form/password';
import Withdraw from './withdraw';

import { getCurrentDatePaypal } from '../../../asstes/js/utils-methods';
import { get, postRequestBody } from '../../../asstes/http/index';
import { openNotifications } from '../../../common/prompt-box/prompt-box';
import { errorText, validPasswordPrompt } from '../../../asstes/data/prompt-text';
import { viewHeader } from './style';

const dates = '5,';

const PaymentJsx = (props) => (
  <div {...props}>
    <p>You must submit Payment information to be able to withdraw funds.</p>
    <Link to="/my/account-payment">Go to set paypal</Link>
  </div>
);

@withStyles(viewHeader)
@createForm()
class ViewHeight extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      open: false,
      btnLoading: false,
      psdValid: true,
      paypalAccount: null,
      systemInfo: window.__payment__info__ || null,
      isSubmit: false,
    };
  }

  // 获取 paypal账户信息 和 系统设置信息
  getInfo = () => {
    Promise.all([
      new Promise((resolve) => {
        if (!window.__payment__info__) {
          get('/api/common/settings')
            .then((response) => {
              resolve(response)
            })
            .catch((err) => {
              console.log(err);
            });
        } else {
          resolve(window.__payment__info__);
        }
      }),
      new Promise((resolve) => {
        get('/api/payout/binding')
          .then((response) => {
            resolve(response);
          })
          .catch((err) => {
            console.log(err);
          })
      }),
    ])
      .then((response) => {
        const [systemInfo, paypalAccount] = response;
        this.setState({
          paypalAccount,
          systemInfo: window.__payment__info__ = systemInfo,
          isSubmit: !(getCurrentDatePaypal(dates).isWithdrow && !!paypalAccount.id)
        });
      })
      .catch((err) => {
        console.log(err);
      })
  };

    // 点击提现按钮
  handleClick = () => {
    this.setState({
      open: true,
    });
    this.getInfo();
  };

  handleChangeWithdraw = () => {
    const { form, userInfo } = this.props;
    const { isSubmit } = this.state;
    if (isSubmit) {
      return;
    }
    form.validateFields((error, value) => {
      if (!error) {
        //Number(value.withdraw).toFixed(2)
        postRequestBody('/api/balance/payout', {
          payoutId: userInfo.id,
          amount: Number(value.withdraw).toFixed(2),
        })
          .then((response) => {
            console.log(response);
          })
      }
    });
    console.log('提额了')
  };

  // 点击提交密码
  handleChangePsd = () => {
    const { form } = this.props;
    const { isSubmit } = this.state;
    if (isSubmit) {
      return;
    }
    form.validateFields((error, value) => {
        if (!error) {
          this.setState({
            btnLoading: true,
          });
          postRequestBody('/api/profile/password/validate', {
            password: value.password,
          })
            .then((response) => {
              const { valid } = response;
              if (valid) {
                this.setState({
                  psdValid: valid,
                });
              } else {
                openNotifications.open({
                  message: validPasswordPrompt.validPasswordError,
                  variant: 'error',
                  duration: 5,
                });
              }
              this.setState({
                btnLoading: false,
              });
            })
            .catch((err) => {
              console.log(err);
              this.setState({
                btnLoading: false,
              });
            });
        }
      })
  };

  // 关闭弹出框
  handleClose = () => {
    this.setState({
      open: false,
    });
  };

  render() {
    const { classes, userInfo, form } = this.props;
    const {
      open, systemInfo, paypalAccount, btnLoading, psdValid, isSubmit
    } = this.state;
    const { balance } = userInfo;
    let getPaypal = null;
    if (systemInfo) {
      getPaypal = getCurrentDatePaypal(dates);
    }
    let withdraw = {};
    if (systemInfo && paypalAccount && paypalAccount.id) {
      withdraw = {
        max: balance,
        min: systemInfo.payout.min,
      }
    }
    return (
      <>
        <div className={classes.header}>
          <span>Balance :</span>
          <span className={classes.price}>
            $
            {balance && balance.toFixed(2)}
          </span>
          <MyButton
            variant="contained"
            color="primary"
            className={classes.headerBtn}
            onClick={this.handleClick}
          >
            Withdraw
          </MyButton>
        </div>
        <DialogIndex
          open={open}
          onClose={this.handleClose}
          wrapperCls={classes.dialogWrapper}
          header={<DialogHeader title="Withdraw" />}
          footer={(
            <DialogFooter
              handleChange={
                psdValid ? this.handleChangeWithdraw : this.handleChangePsd
              }
              handleDelete={this.handleClose}
              disabled={isSubmit}
              loading={btnLoading}
              title={{
                ok: 'Submit',
                delete: 'Back',
              }}
            />
          )}
        >
          {
            (getPaypal && paypalAccount)
              ? !getPaypal.isWithdrow
                ? <span className={classes.paypal}>{getPaypal.text}</span>
                : paypalAccount && !paypalAccount.id
                  ? <PaymentJsx className={classes.paymentPrompt} />
                  : psdValid
                    ? <Withdraw form={form} data={withdraw} />
                    : <div className={classes.psd}><Password form={form} name="Password" /></div>
              : 'loading...'
          }
        </DialogIndex>
      </>
    );
  }
}

ViewHeight.propTypes = {
  classes: PropTypes.objectOf(PropTypes.object).isRequired,
  userInfo: PropTypes.objectOf(PropTypes.object).isRequired,
  form: formShape.isRequired,
};

export default ViewHeight;
