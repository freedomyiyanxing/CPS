import React from 'react';
import PropTypes from 'prop-types';
import { createForm, formShape } from 'rc-form';

import MainContainer from '../../../common/box-container/main-container';
import SubmitButton from '../../../common/form/submit-button';
import MyUrl from '../../../common/form/my-url';
import MySelect from '../../../common/form/my-select';
import MyTextarea from '../../../common/form/my-textarea';
import Name from '../../../common/form/name';
import Container from '../utils/container';

import { postRequestBody, get, SUCCESS } from '../../../asstes/http/index';
import { monthlyVisitors, webSiteCategory } from '../../../asstes/data/default-data';
import { openNotifications } from '../../../common/prompt-box/prompt-box';
import { userInfoPrompt } from '../../../asstes/data/prompt-text';
import { getIsForm, getSelectIndex } from '../../../asstes/js/utils-methods';

let userDate = null;

@createForm()
class WibsiteSetting extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      data: userDate || null,
    };
  }

  componentDidMount() {
    this._unmount = true;
    if (userDate) {
      return;
    }

    // 查询个人信息
    get('/api/profile/info')
      .then((response) => {
        if (this._unmount) {
          this.setState({
            data: userDate = response,
          });
        }
        // console.log(response, 'response');
      })
      .catch((err) => {
        console.log(err);
      });
  }

  componentWillUnmount() {
    this._unmount = false;
  }

  /**
   * 提交事件
   * @returns {*} 验证正确的情况下返回一个 promise对象
   */
  handleSubmit = () => {
    const { form } = this.props;
    const { data } = this.state;
    let ayc = null;
    form.validateFields((error, value) => {
      if (!error) {
        const obj = Object.assign(data, value, {
          monthlyVisits: getSelectIndex(value.monthlyVisits, monthlyVisitors),
          websiteCategory: getSelectIndex(value.websiteCategory, webSiteCategory),
        });
        ayc = new Promise((resolve) => {
          postRequestBody('/api/profile/update', obj)
            .then((response) => {
              if (response.message === SUCCESS) {
                openNotifications.open({
                  message: userInfoPrompt.successText,
                  variant: 'success',
                  duration: 5, // null 表示永远不移除
                });
              }
              resolve(true);
            })
            .catch((err) => {
              openNotifications.open({
                message: err.data.message || userInfoPrompt.errorText,
                variant: 'error',
                duration: 10, // null 表示永远不移除
              });
              resolve(true);
            });
        });
      }
    });
    return ayc;
  };

  render() {
    const { form, history } = this.props;
    const { data } = this.state;
    const disabled = data
      ? getIsForm(
        form,
        {
          websiteName: data.websiteName,
          websiteUrl: data.websiteUrl,
          websiteDesc: data.websiteDesc,
          websiteCategory: webSiteCategory[data.websiteCategory - 1],
          monthlyVisits: monthlyVisitors[data.monthlyVisits - 1],
        }, [
          'websiteName',
          'websiteUrl',
          'websiteCategory',
          'monthlyVisits',
          'websiteDesc',
        ],
      )
      : true;
    return (
      <MainContainer>
        {
          data
            ? (
              <Container title="Wibsite Setting">
                <Name
                  form={form}
                  name="Website Name"
                  value={data.websiteName}
                  outputName="websiteName"
                />
                <MyUrl
                  form={form}
                  value={data.websiteUrl}
                />
                <MySelect
                  form={form}
                  name="Category"
                  outputName="websiteCategory"
                  selectArr={webSiteCategory}
                  value={webSiteCategory[data.websiteCategory - 1]}
                />
                <MySelect
                  form={form}
                  name="Current Monthly Unique Visitores"
                  outputName="monthlyVisits"
                  selectArr={monthlyVisitors}
                  value={monthlyVisitors[data.monthlyVisits - 1]}
                />
                <MyTextarea
                  form={form}
                  value={data.websiteDesc}
                />
                <SubmitButton
                  bank
                  width="180"
                  name="Submit"
                  disabled={disabled}
                  history={history}
                  handleSubmit={this.handleSubmit}
                />
              </Container>
            )
            : <div>loading....</div>
        }
      </MainContainer>
    );
  }
}

WibsiteSetting.propTypes = {
  history: PropTypes.objectOf(PropTypes.object).isRequired,
  form: formShape.isRequired,
};

export default WibsiteSetting;
