import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import { createForm, formShape } from 'rc-form';
import CircularProgress from '@material-ui/core/CircularProgress';

import MainContainer from '../../../common/box-container/main-container';
import ToggleSelect from '../../../common/form/toggle-select';
import Container from '../utils/container';
import Paypal from './paypal';
import DirectDeposit from './direct-deposit';
import GoBackBtn from '../../../common/form/go-back';
import SubmitButton from '../../../common/form/submit-button';

import { openNotifications } from '../../../common/prompt-box/prompt-box';
import { paymentPrompt } from '../../../assets/data/prompt-text';
import { getIsForm, getSelectValue } from '../../../assets/js/utils-methods';
import {
  country,
  currencyCode,
  bankAccountTypes,
} from '../../../assets/data/default-data';
import {
  SUCCESS,
  get,
  postRequestBody,
  deleteRequestBody,
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
    this._isMounted = true;

    // 查询绑定的提现账号
    if (!this.isPaypal) {
      this.getWithdraw();
    } else {
      this.getInquirePaypal();
    }
  }

  componentWillUnmount() {
    this._isMounted = false;
  }

  /**
   * 查询绑定的提现账号信息
   */
  getWithdraw() {
    get('/api/payout/binding').then((response) => {
      const resp = response || {};
      const { accountType } = resp;
      if (this._isMounted) {
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
    // 只有切换至银行账户保存 才可以进入提交
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

    const disabled = accountNumber
      ? getIsForm(
        form,
        {
          bankName: accountNumber.bankName,
          bankRoutingNumber: accountNumber.bankRoutingNumber,
          bankAccountName: accountNumber.bankAccountName,
          bankAccountNumber: accountNumber.bankAccountNumber,
          bankAccountCountry: getSelectValue(country, accountNumber.bankAccountCountry),
          currencyCode: getSelectValue(currencyCode, accountNumber.currencyCode),
          bankAccountType: getSelectValue(bankAccountTypes, accountNumber.bankAccountType),
        }, [
          'bankName',
          'bankRoutingNumber',
          'bankAccountName',
          'bankAccountNumber',
          'bankAccountCountry',
          'currencyCode',
          'bankAccountType',
        ],
      )
      : true;

    console.log('genx');
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
            {
              selectIndex !== '2'
                ? (
                  <div className={classes.gobacks}>
                    <GoBackBtn history={history}>
                      Bank
                    </GoBackBtn>
                  </div>
                )
                : (
                  <SubmitButton
                    bank
                    width={180}
                    name="Submit"
                    disabled={disabled}
                    history={history}
                    className={classes.gobacks}
                    handleSubmit={this.handleSubmit}
                  />
                )
            }
          </Container>
        </MainContainer>
      </>
    );
  }
}

Payment.propTypes = {
  form: formShape.isRequired,
  classes: PropTypes.objectOf(PropTypes.object).isRequired,
  history: PropTypes.objectOf(PropTypes.object).isRequired,
};

export default Payment;
