import React from 'react';
import PropTypes from 'prop-types';
import { createForm, formShape } from 'rc-form';
import { withStyles } from '@material-ui/core/styles';

import MainContainer from '../../../common/box-container/main-container';
import SubmitButton from '../../../common/form/submit-button';
import MyUrl from '../../../common/form/my-url';
import MySelect from '../../../common/form/my-select';
import MyTextarea from '../../../common/form/my-textarea';
import Name from '../../../common/form/name';
import Container from '../utils/container';
// eslint-disable-next-line no-unused-vars
import { postRequestBody, get } from '../../../asstes/http/index';

import { monthlyVisitors, webSiteCategory } from '../../../asstes/data/default-data';
import { wibstieStyle } from '../style';

@createForm()
@withStyles(wibstieStyle)
class WibsiteSetting extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      data: null,
    };
  }

  componentDidMount() {
    this._unmount = true;
    // 查询个人信息
    setTimeout(() => {
      get('/api/profile/info')
        .then((response) => {
          if (this._unmount) {
            this.setState({
              data: response,
            });
          }
          console.log(response, 'response');
        })
        .catch((err) => {
          console.log(err);
        });
    }, 500);
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
    let ayc = null;
    form.validateFields((error, value) => {
      if (!error) {
        ayc = new Promise((resolve) => {
          setTimeout(() => {
            console.log({ ...value });
            resolve(true);
          }, 1000);
        });
      }
    });
    return ayc;
  };

  render() {
    // eslint-disable-next-line no-unused-vars
    const { form, classes } = this.props;
    const { data } = this.state;
    console.log(data);
    return (
      <MainContainer>
        <Container title="Wibsite Setting">
          <Name
            form={form}
            name="Website Name"
            value="freedom.yi"
            outputName="websiteName"
          />
          <MyUrl
            form={form}
            value="http://192.168.1.22:8899/yes/account-setting"
          />
          <MySelect
            form={form}
            name="Category"
            outputName="category"
            selectArr={webSiteCategory}
            value={webSiteCategory[0]}
          />
          <MySelect
            form={form}
            name="Current Monthly Unique Visitores"
            outputName="monthlyVisitors"
            selectArr={monthlyVisitors}
            value={monthlyVisitors[0]}
          />
          <MyTextarea
            form={form}
            value="this is changsha ?"
          />
          <SubmitButton
            width="200px"
            name="Submit"
            handleSubmit={this.handleSubmit}
          />
        </Container>
      </MainContainer>
    );
  }
}

WibsiteSetting.propTypes = {
  classes: PropTypes.objectOf(PropTypes.object).isRequired,
  form: formShape.isRequired,
};

export default WibsiteSetting;
