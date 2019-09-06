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
import { getSelectValue } from '../../../assets/js/utils-methods';
import { bankAccountTypes, country } from '../../../assets/data/default-data';

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
    const stateObj = {
      // 查询提现账号信息
      accountNumber: null,
      // 当前选项卡下标 string 类型
      selectIndex: '0',
      selectCurrentVal: selectArr['0'],
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
  getWithdraw() {
    get('/api/payout/binding').then((response) => {
      const resp = response || {};
      const { accountType } = resp;
      if (this._unmount) {
        this.setState({
          accountNumber: resp,
          selectIndex: accountType || '0',
          selectCurrentVal: selectArr[accountType || '0'],
        });
      }
    });
  }

  /**
   * 提交paypal账户绑定
   */
  getInquirePaypal = () => {
    const { history } = this.props;
    const [name, value] = this.searchCode.split('&')[0].split('=');
    if (name === 'code') {
      postRequestBody('/api/payout/binding/paypal', {
        code: value,
      })
        .then((response) => {
          this.setState({
            accountNumber: response,
          });
          openNotifications.open({
            message: paymentPrompt.addPaypalSuccess,
            variant: 'success',
          });
        })
        .catch(() => {
          this.setState({
            accountNumber: {},
          });
        });

      // 防止傻逼 在请求过程中... 刷新页面, 从而导致多次请求paypal接口
      history.push('/my/account-payment');
    } else {
      openNotifications.open({
        message: paymentPrompt.paypalLoginError,
        variant: 'error',
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
            selectCurrentVal: selectArr[0],
          });
          openNotifications.open({
            message: paymentPrompt.deleteSuccess,
            variant: 'success',
          });
        }
      });
  };


  // 绑定账户方式选择 (select)
  handleChange = (value) => {
    let i;
    switch (value) {
      case 'Paypal':
        i = '1';
        break;
      case 'Direct Deposit':
        i = '2';
        break;
      default:
        i = '0';
    }

    this.setState({
      selectIndex: i,
      selectCurrentVal: value,
    });
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
      return;
    }
    let ayc = null;
    form.validateFields((error, value) => {
      if (!error) {
        const obj = Object.assign({}, value, {
          bankAccountType: getSelectValue(bankAccountTypes, value.bankAccountType, true),
          bankAccountCountry: getSelectValue(country, value.bankAccountCountry, true),
        });
        ayc = postRequestBody('/api/payout/binding/bank', obj).then((response) => {
          const { message } = response;
          if (message === SUCCESS) {
            openNotifications.open({
              message: paymentPrompt.addDirectSuccess,
              variant: 'success',
            });
            this.getWithdraw();
          }
        });
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
          return null;
      }
    };
    return (
      <>
        <MainContainer>
          <Container title="Basic Payment" history={history}>
            <ToggleSelect
              name="Payment Method"
              selectArr={selectArr}
              value={selectCurrentVal}
              handleChange={this.handleChange}
              disabled={!accountNumber}
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
              width={180}
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
