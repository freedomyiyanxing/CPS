import React from 'react';
import PropTypes from 'prop-types';

import MySelect from '../../../common/form/my-select';
import Name from '../../../common/form/name';

import { getSelectValue } from '../../../assets/js/utils-methods';

import {
  country,
  currencyCode,
  bankAccountTypes,
} from '../../../assets/data/default-data';

const DirectDeposit = (props) => {
  const {
    form, data,
  } = props;
  return (
    <>
      <MySelect
        form={form}
        name="Bank Location"
        outputName="bankAccountCountry"
        selectArr={country}
        value={getSelectValue(country, 'US')} // 暂时只有US 所以先固定值
      />
      <MySelect
        form={form}
        name="Bank Currency"
        outputName="currencyCode"
        selectArr={currencyCode}
        value={getSelectValue(currencyCode, 'USD')} // 暂时只有USD 所以先固定值
      />
      <Name
        form={form}
        name="Account Holder's Name"
        outputName="bankAccountName"
        value={data.bankAccountName}
      />
      <MySelect
        form={form}
        name="Account Type"
        outputName="bankAccountType"
        selectArr={bankAccountTypes}
        value={getSelectValue(bankAccountTypes, data.bankAccountType)}
      />
      <Name
        form={form}
        name="Account Number"
        outputName="bankAccountNumber"
        value={data.bankAccountNumber}
        pattern={/^[A-Za-z0-9]{2,30}$/}
      />
      <Name
        form={form}
        name="Bank Name"
        outputName="bankName"
        value={data.bankName}
      />
      <Name
        form={form}
        name="Bank Routing Number/Sort Code"
        outputName="bankRoutingNumber"
        value={data.bankRoutingNumber}
        pattern={/^[A-Za-z0-9]{2,30}$/}
      />
    </>
  );
};

DirectDeposit.propTypes = {
  form: PropTypes.objectOf(PropTypes.object).isRequired,
  data: PropTypes.objectOf(PropTypes.object).isRequired,
};

export default DirectDeposit;
