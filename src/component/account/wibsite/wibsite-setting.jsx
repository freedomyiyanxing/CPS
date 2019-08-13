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

import { postRequestBody, get, SUCCESS } from '../../../assets/http/index';
import { monthlyVisitors, webSiteCategory } from '../../../assets/data/default-data';
import { openNotifications } from '../../../common/prompt-box/prompt-box';
import { userInfoPrompt } from '../../../assets/data/prompt-text';
import { getIsForm, getSelectValue } from '../../../assets/js/utils-methods';

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
          monthlyVisits: getSelectValue(monthlyVisitors, value.monthlyVisits, true),
          websiteCategory: getSelectValue(webSiteCategory, value.websiteCategory, true),
        });
        ayc = postRequestBody('/api/profile/update', obj).then((response) => {
          const { message } = response;
          if (message === SUCCESS) {
            openNotifications.open({
              message: userInfoPrompt.successText,
              variant: 'success',
            });
          }
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
          websiteCategory: getSelectValue(webSiteCategory, data.websiteCategory),
          monthlyVisits: getSelectValue(monthlyVisitors, data.monthlyVisits),
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
                  liLen={8.5}
                  name="Category"
                  outputName="websiteCategory"
                  selectArr={webSiteCategory}
                  value={getSelectValue(webSiteCategory, data.websiteCategory)}
                />
                <MySelect
                  form={form}
                  name="Current Monthly Unique Visitores"
                  outputName="monthlyVisits"
                  selectArr={monthlyVisitors}
                  value={getSelectValue(monthlyVisitors, data.monthlyVisits)}
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
