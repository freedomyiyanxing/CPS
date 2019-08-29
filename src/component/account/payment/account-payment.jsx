/* eslint-disable */
import React from 'react';
import PropTypes from 'prop-types';
import { createForm, formShape } from 'rc-form';
import { withStyles } from '@material-ui/core/styles';
import CircularProgress from '@material-ui/core/CircularProgress';

import MainContainer from '../../../common/box-container/main-container';
import SubmitButton from '../../../common/form/submit-button';
import ToggleSelect from '../../../common/form/toggle-select';
import Container from '../utils/container';
import Paypal from './paypal';
import DirectDeposit from './direct-deposit';

import { openNotifications } from '../../../common/prompt-box/prompt-box';
import { paymentPrompt } from '../../../assets/data/prompt-text';
import {
  get, postRequestBody, deleteRequestBody, SUCCESS,
} from '../../../assets/http/index';
import { paymentStyle } from '../style';

const selectArr = ['Please Select', 'Paypal', 'Direct Deposit'];

@withStyles(paymentStyle)
@createForm()
class Payment extends React.Component {
  constructor(props) {
    super(props);

    const { history } = props;
    const search = decodeURIComponent(history.location.search);
    this.searchCode = search.slice(1, search.length - 1);
    this.isPaypal = this.searchCode.startsWith('code=');
    const t = window.__payout__account__;
    const stateObj = {
      loading: false,
      // 查询提现账号信息
      accountNumber: t || null,
      // 当前选项卡下标 string 类型
      selectIndex: t ? (t.accountType || '0') : '0',
      selectCurrentVal: selectArr[t ? (t.accountType || '0') : '0'] // selectArr[0]
    };

    if (this.isPaypal) {
      stateObj.selectIndex = '1';
      stateObj.selectCurrentVal = selectArr[stateObj.selectIndex];
    }
    this.state = stateObj;
  }

  componentDidMount() {
    this._unmount = true;

    // 查询绑定的提现账号
    if (!this.isPaypal) {
      this.getWithdraw();
    } else {
      this.getInquirePaypal();
    }
  }

  componentWillUnmount() {
    this._unmount = false;
  }

  /**
   * 查询绑定的提现账号信息
   */
  getWithdraw = () => {
    if (!window.__payout__account__) {
      get('/api/payout/binding')
        .then((response) => {
          const { accountType } = response = response || {};
          if (this._unmount) {
            window.__payout__account__ = response;
            this.setState({
              accountNumber: response,
              selectIndex: accountType || '0',
              selectCurrentVal: selectArr[accountType || '0']
            });
          }
        })
    }
  };

  /**
   * 提交paypal账户绑定
   */
  getInquirePaypal = () => {
    const { history } = this.props;
    const [name, value] = this.searchCode.split('&')[0].split('=');
    if (name === 'code') {
      this.setState({
        loading: false,
      });

      postRequestBody('/api/payout/binding/paypal', {
        code: value,
      })
        .then((response) => {
          console.log(response, 'resp');
          this.setState({
            accountNumber: response
          });
          openNotifications.open({
            message: paymentPrompt.addPaypalSuccess,
            variant: 'success',
          });
        })
        .catch((err) => {
          console.log(err);
          this.setState({
            accountNumber: {}
          });
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
  };


  /**
   * 移除paypal账号
   */
  handleDeletePaypal = () => {
    const { accountNumber } = this.state;
    deleteRequestBody(`/api/payout/unbinding/${accountNumber.id}`)
      .then((response) => {
        const { message } = response;
        if (message === SUCCESS) {
          this.setState({
            accountNumber: {},
            selectIndex: '0', // 当前选项卡下标 string 类型
            selectCurrentVal: selectArr[0]
          });
          openNotifications.open({
            message: paymentPrompt.deleteSuccess,
            variant: 'success',
          });
        }
      })
  };


  // 绑定账户方式选择 (select)
  handleChange = (value) => {
    let i = '0';
    switch (value) {
      case 'Paypal':
        i = '1';
        break;
      case 'Direct Deposit':
        i = '2';
        break
    }

    this.setState({
      selectIndex: i,
      selectCurrentVal: value,
    })
  };

  /**
   * 银行账号绑定提交事件
   * @returns {*} 验证正确的情况下返回一个 promise对象
   */
  handleSubmit = () => {
    const { form } = this.props;
    const { selectIndex } = this.state;
    // 只有切换至银行账户保存 才可以进入提交
    if (selectIndex !== '2') {
      return
    }
    let ayc = null;
    form.validateFields((error, value) => {
      if (!error) {
        console.log(value)
      }
    });
    return ayc;
  };

  render() {
    const { classes, history, form } = this.props;
    const { accountNumber, selectIndex, selectCurrentVal } = this.state;

    const setView = () => {
      switch (selectIndex) {
        case '1':
          return <Paypal data={accountNumber} func={this.handleDeletePaypal} />;
        case '2':
          return <DirectDeposit data={accountNumber} form={form} />;
        default:
          return null
      }
    };
    console.log(window.__payout__account__, '222222');
    // console.log(selectIndex, '33333', selectCurrentVal);
    return (
      <>
        <MainContainer>
          <Container title="Basic Payment">
            <ToggleSelect
              name="Payment Method"
              selectArr={selectArr}
              value={selectCurrentVal}
              handleChange={this.handleChange}
              disabled={!Boolean(accountNumber)}
            />
            <div className={classes.root}>
              {
                accountNumber
                  ? setView()
                  : <CircularProgress />
              }
            </div>
            <SubmitButton
              bank
              width="180"
              name="Submit"
              history={history}
              disabled={selectIndex === '0'}
              handleSubmit={this.handleSubmit}
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
