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

import { getCurrentDatePaypal } from '../../../assets/js/utils-methods';
import { get, postRequestBody, SUCCESS } from '../../../assets/http/index';
import { openNotifications } from '../../../common/prompt-box/prompt-box';
import { withdrawPrompt, validPasswordPrompt } from '../../../assets/data/prompt-text';
import { viewHeader } from './style';

@withStyles(viewHeader)
@createForm()
class ViewHeight extends React.Component {
  constructor(props) {
    super(props);
    const a = window.__payout__account__;
    this.state = {
      open: false, // 控制模态框
      loading: false, // 控制加载过程动画
      accountType: a ? a.accountType : null,
      systemInfo: window.__payment__info__ || null,
      btnLoading: false, // 提示时的loading
      psdValid: true, // 控制当前Submit是提交输入密码 还是提交提现
      paypalAccount: null,
      isSubmit: false, // 控制是否可点击提交按钮
    };
  }

  /**
   * 获取提现账户信息 获取系统设置
   */
  getInfoData = () => {
    Promise.all([
      new Promise((resolve) => {
        if (!window.__payout__account__) {
          this.setState({
            loading: true,
          });
          get('/api/payout/binding')
            .then((response) => {
              resolve(response);
            });
        }
      }),
      new Promise((resolve) => {
        if (!window.__payment__info__) {
          this.setState({
            loading: true,
          });
          get('/api/common/settings')
            .then((response) => {
              resolve(response)
            });
        }
      })
    ]).then((data) => {
      const [withdrawInfo, systemSetting] = data;
      const withdrawInfos = withdrawInfo || {};
      window.__payout__account__ = withdrawInfos;
      this.setState({
        accountType: withdrawInfos.accountType,
        systemInfo: window.__payment__info__ = systemSetting,
        loading: false,
      });
      // console.log(withdrawInfo, systemSetting)
    })
  };

  // 获取 paypal账户信息 和 系统设置信息
  getInfo = () => {
    Promise.all([
      new Promise((resolve) => {
        if (!window.__payment__info__) {
          get('/api/common/settings')
            .then((response) => {
              resolve(response);
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
          });
      }),
    ])
      .then((response) => {
        const [systemInfo, paypalAccount] = response;
        this.setState({
          paypalAccount,
          systemInfo: window.__payment__info__ = systemInfo,
          isSubmit: !(
            getCurrentDatePaypal(systemInfo.payout.date).isWithdrow && !!paypalAccount.id
          ),
        });
      })
      .catch((err) => {
        console.log(err);
      });
  };

  // 点击提现按钮
  handleClick = () => {
    this.setState({
      open: true,
    });
    // this.getWithdrawInfo();
    this.getInfoData();
    // this.getInfo();
  };

  // 点击提现
  handleChangeWithdraw = () => {
    const { form, getUserInfo } = this.props;
    const { isSubmit, paypalAccount } = this.state;
    if (isSubmit) {
      return;
    }
    form.validateFields((error, value) => {
      if (!error) {
        this.setState({
          btnLoading: true,
        });
        postRequestBody('/api/balance/payout', {
          payoutId: paypalAccount.id,
          amount: Math.abs(value.withdraw).toFixed(2),
        })
          .then((response) => {
            const { message } = response;
            if (message === SUCCESS) {
              openNotifications.open({
                message: withdrawPrompt.withdrawSuccess,
                variant: 'success',
              });
              this.setState({
                open: false,
                btnLoading: false,
              });
              // 提现完成以后 更新数据
              getUserInfo();
            }
          })
          .catch((err) => {
            openNotifications.open({
              message: err.data.message || withdrawPrompt.withdrawError,
              variant: 'error',
            });
            this.setState({
              open: false,
              btnLoading: false,
            });
          });
      }
    });
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
        setTimeout(() => {
          this.setState({
            btnLoading: false,
          });
        }, 2000)
        // postRequestBody('/api/profile/password/validate', {
        //   password: value.password,
        // })
        //   .then((response) => {
        //     const { valid } = response;
        //     if (valid) {
        //       this.setState({
        //         psdValid: valid,
        //       });
        //       openNotifications.open({
        //         message: validPasswordPrompt.validPasswordSuccess,
        //         variant: 'success',
        //       });
        //     } else {
        //       openNotifications.open({
        //         message: validPasswordPrompt.validPasswordError,
        //         variant: 'error',
        //       });
        //     }
        //     this.setState({
        //       btnLoading: false,
        //     });
        //   })
        //   .catch((err) => {
        //     console.log(err);
        //     this.setState({
        //       btnLoading: false,
        //     });
        //   });
      }
    });
  };

  // 关闭弹出框
  handleClose = () => {
    this.setState({
      open: false,
    });
  };

  // 渲染模态框内容
  renderingDialogContent = (classes, getPaypal, paypalAccount, form, psdValid, withdraw) => {
    if (getPaypal && paypalAccount) {
      if (!getPaypal.isWithdrow) { // 判断当前日期是否是在可允许的时间范围内
        return <span className={classes.paypal}>{getPaypal.text}</span>;
      }
      if (paypalAccount && !paypalAccount.id) { // 判断是否有paypal账户
        return (
          <div className={classes.paymentPrompt}>
            <p>You must submit Payment information to be able to withdraw funds.</p>
            <Link to="/my/account-payment">Go to set paypal</Link>
          </div>
        );
      }

      if (psdValid) { // 判断当前是否已经验证完密码
        return <Withdraw form={form} data={withdraw} />;
      }
      return <div className={classes.psd}><Password form={form} name="Password" /></div>;
    }

    return 'loading...';
  };

  renderView = (classes, loading, accountType, systemInfo, psdValid, form, balance) => {
    if (loading) {
      return 'loading...'
    }
    if (!accountType) {
      return (
        <div className={classes.paymentPrompt}>
          <p>You must submit Payment information to be able to withdraw funds.</p>
          <Link to="/my/account-payment">Go to set paypal</Link>
        </div>
      )
    }
    if (accountType) {
      const obj = accountType === '1' ? 'paypal' : 'bank';
      const payout = systemInfo.payout[obj];
      const isWithdraw = getCurrentDatePaypal(payout.date);
      // 判断当前日期 是否在可提现的日期范围内
      if (!isWithdraw.isWithdrow) {
        return <span className={classes.paypal}>{isWithdraw.text}</span>;
      }

      // 获取系统设置
      let systemSetting = {
        max: balance,
        min: payout.min,
        // paypalName: paypalAccount.paypalName,
        // paypalEmail: paypalAccount.paypalEmail,
      };
      console.log(systemSetting)

      if (psdValid) { // 判断当前是否已经验证完密码
        return <Withdraw form={form} data={systemSetting} />;
      }
      return <div className={classes.psd}><Password form={form} name="Password" /></div>;
    }
  };

  render() {
    const { classes, userInfo, form } = this.props;
    const {
      open, systemInfo, paypalAccount, btnLoading, psdValid, isSubmit, accountType, loading,
    } = this.state;
    const { balance } = userInfo; // 获取当前账号的可提余额数量
    let getPaypal = null;
    // if (systemInfo) {
    //   getPaypal = getCurrentDatePaypal(systemInfo.payout.date);
    // }
    let withdraw = {};
    // if (systemInfo && paypalAccount && paypalAccount.id) {
    //   withdraw = {
    //     max: balance,
    //     min: systemInfo.payout.min,
    //     paypalName: paypalAccount.paypalName,
    //     paypalEmail: paypalAccount.paypalEmail,
    //   };
    // }

    console.log(window.__payout__account__, 'accountType', systemInfo);
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
            this.renderView(classes, loading, accountType, systemInfo, psdValid, form, balance)
            // this.renderingDialogContent(classes, getPaypal, paypalAccount, form, psdValid, withdraw)
          }
        </DialogIndex>
      </>
    );
  }
}

ViewHeight.propTypes = {
  classes: PropTypes.objectOf(PropTypes.object).isRequired,
  userInfo: PropTypes.objectOf(PropTypes.object).isRequired,
  getUserInfo: PropTypes.func.isRequired,
  form: formShape.isRequired,
};

export default ViewHeight;
