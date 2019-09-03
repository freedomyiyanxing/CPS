import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles/index';
import { createForm, formShape } from 'rc-form';
import { Link } from 'react-router-dom';
import CircularProgress from '@material-ui/core/CircularProgress';

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

// 在当前页面缓存当前提现账号的信息
let cacheWithdrawInfo;

@withStyles(viewHeader)
@createForm()
class ViewHeight extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      open: false, // 控制模态框
      loading: false, // 控制加载过程动画
      accountType: null, // 当前提现账号的类型
      withdrawInfo: null, // 当前提现账号的信息
      systemInfo: window.__payment__info__ || null, // 获取系统设置的信息
      btnLoading: false, // 控制提交时按钮的loading
      psdValid: false, // 控制当前Submit是提交输入密码 还是提交提现
      isSubmit: true, // 控制是否可点击提交按钮
    };
  }

  componentWillUnmount() {
    cacheWithdrawInfo = null;
  }

  /**
   * 获取提现账户信息 获取系统设置
   */
  getInfoData = () => {
    Promise.all([
      new Promise((resolve) => {
        if (!cacheWithdrawInfo) {
          this.setState({
            loading: true,
          });
          get('/api/payout/binding')
            .then((response) => {
              cacheWithdrawInfo = response;
              resolve(response);
            });
        } else {
          resolve(cacheWithdrawInfo);
        }
      }),
      new Promise((resolve) => {
        if (!window.__payment__info__) {
          this.setState({
            loading: true,
          });
          get('/api/common/settings')
            .then((response) => {
              window.__payment__info__ = response;
              resolve(response);
            });
        } else {
          resolve(window.__payment__info__);
        }
      }),
    ]).then((data) => {
      const [withdrawInfo, systemSetting] = data;
      const withdrawInfos = withdrawInfo || {};

      let isBtn = true;
      if (withdrawInfos.accountType) {
        const obj = withdrawInfos.accountType === '1' ? 'paypal' : 'bank';
        const payout = systemSetting.payout[obj];
        const withdraw = getCurrentDatePaypal(payout.date);
        isBtn = !withdraw.isWithdrow;
      }

      this.setState({
        withdrawInfo,
        accountType: withdrawInfos.accountType,
        systemInfo: systemSetting,
        loading: false,
        isSubmit: isBtn,
      });
    });
  };

  // 点击提现按钮
  handleClick = () => {
    this.setState({
      open: true,
    });
    this.getInfoData();
  };

  // 点击提现
  handleChangeWithdraw = () => {
    const { form, getUserInfo } = this.props;
    const { isSubmit, withdrawInfo } = this.state;
    if (isSubmit) {
      return;
    }
    form.validateFields((error, value) => {
      if (!error) {
        this.setState({
          btnLoading: true,
        });
        postRequestBody('/api/balance/payout', {
          payoutId: withdrawInfo.id,
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
              });
            }
            this.setState({
              btnLoading: false,
            });
          })
          .catch(() => {
            this.setState({
              btnLoading: false,
            });
          });
      }
    });
  };

  // 关闭弹出框
  handleClose = () => {
    this.setState({
      open: false,
    });
  };

  /**
   * 渲染模态框内容
   * @param classes
   * @param loading
   * @param accountType 提现账号类型: 1 - paypal, 2 - 银行账号
   * @param systemInfo 系统设置信息
   * @param psdValid 是否需要验证密码
   * @param form 表单对象
   * @param balance 当前账户余额
   * @param withdrawInfo 绑定提现账户信息
   * @returns {string|*}
   */
  renderView = (
    classes, loading, accountType, systemInfo, psdValid, form, balance, withdrawInfo,
  ) => {
    if (loading) {
      return <CircularProgress />;
    }

    // 是否有绑定银行或paypal提现账户
    if (!accountType) {
      return (
        <div className={classes.paymentPrompt}>
          <p>You must submit Payment information to be able to withdraw funds.</p>
          <Link to="/my/account-payment">Go to set paypal</Link>
        </div>
      );
    }

    // 已经绑定提现账户
    if (accountType) {
      const obj = accountType === '1' ? 'paypal' : 'bank';
      const payout = systemInfo.payout[obj];
      const withdraw = getCurrentDatePaypal(payout.date);

      // 当前日期是否可提现
      if (!withdraw.isWithdrow) {
        return <span className={classes.paypal}>{withdraw.text}</span>;
      }

      // 验证密码
      if (!psdValid) {
        return <div className={classes.psd}><Password form={form} name="Password" /></div>;
      }

      // 获取系统设置 与 卡用户信息
      const systemSetting = {
        max: balance,
        min: payout.min,
        tax: payout.tax,
        accountType,
      };

      if (accountType === '1') {
        systemSetting.name = withdrawInfo.paypalName;
        systemSetting.cardNumber = withdrawInfo.paypalEmail;
      } else {
        systemSetting.name = withdrawInfo.bankAccountName;
        systemSetting.cardNumber = withdrawInfo.bankAccountNumber;
      }

      // 提现操作
      return <Withdraw form={form} data={systemSetting} />;
    }
  };

  render() {
    const { classes, userInfo, form } = this.props;
    const {
      open, systemInfo, btnLoading, psdValid,
      isSubmit, accountType, loading, withdrawInfo,
    } = this.state;
    const { balance } = userInfo; // 获取当前账号的可提余额数量

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
          <div className={classes.wrapper}>
            {
              this.renderView(
                classes, loading, accountType, systemInfo, psdValid, form, balance, withdrawInfo,
              )
            }
          </div>
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
