/* eslint-disable */

import React from 'react';
import { createForm, formShape } from 'rc-form';

import SubmitButton from '../../../common/form/submit-button';
import MyUrl from '../../../common/form/my-url';
import MySelect from '../../../common/form/my-select';
import MyTextarea from '../../../common/form/my-textarea';
import Name from '../../../common/form/name';

import {monthlyVisitors, webSiteCagegory} from '../../../asstes/data/default-data';

@createForm()
class WibsiteSetting extends React.Component {
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
      } else {
        ayc = null;
      }
    });
    return ayc;
  };

  render() {
    const { form } = this.props;
    return (
      <>
        <Name
          form={form}
          name="Website Name"
          value="freedom.yi"
        />
        <MyUrl
          form={form}
          value="http://192.168.1.22:8899/yes/account-setting"
        />
        <MySelect
          form={form}
          name="Category"
          outputName="category"
          selectArr={webSiteCagegory}
          value={webSiteCagegory[1]}
        />
        <MySelect
          form={form}
          name="Current Monthly Unique Visitores"
          outputName="monthlyVisitors"
          selectArr={monthlyVisitors}
          value={monthlyVisitors[1]}
        />
        <MyTextarea
          form={form}
          value="this is changsha ?"
        />
        <SubmitButton
          name="Next"
          handleSubmit={this.handleSubmit}
        />
      </>
    );
  }
}

WibsiteSetting.propTypes = {
  form: formShape.isRequired,
};

export default WibsiteSetting;
