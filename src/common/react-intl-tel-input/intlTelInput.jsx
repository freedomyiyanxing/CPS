/* eslint-disable */
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import libphonenumber from 'libphonenumber-js-utils'; // 这个必须得加载
import { withStyles } from '@material-ui/core/styles';
import FormHelperText from '@material-ui/core/FormHelperText';
import FormControl from '@material-ui/core/FormControl';

import AllCountries from './AllCountries';
import FlagDropDown from './FlagDropDown';
import TelInput from './TelInput';
import utils from './utils';
import MyLabel from '../material-ui-compoents/input-label';

import { intTeInputStyle } from './style';

const PHONEERROR = '电话号码错误';
const PHONEREQUIRE = '电话号码是必填的';

@withStyles(intTeInputStyle)
class IntlTelInput extends Component {
  static getDerivedStateFromProps(nextProps, prevState) {
    let newState = null;

    if (
      typeof nextProps.value !== 'undefined' &&
      prevState.value !== nextProps.value
    ) {
      newState = {
        value: nextProps.value,
      };
    }

    return newState;
  }

  constructor(props) {
    super(props);

    this.autoCountry = '';
    this.tempCountry = '';
    this.startedLoadingAutoCountry = false;

    this.preferredCountries = [];
    this.countries = [];
    this.countryCodes = {};

    this.query = '';
    this.selectedCountryData = {};

    this.state = {
      value: props.value || props.defaultValue,
      placeholder: '',
      title: '',
      countryCode: 'us',
    };
  }

  componentDidMount() {
    this.autoHideDialCode = this.props.autoHideDialCode;
    this.nationalMode = this.props.nationalMode;
    // if in nationalMode, disable options relating to dial codes
    if (this.nationalMode) {
      this.autoHideDialCode = false;
    }
    // 处理数据
    this.processCountryData.call(this);

    // 获取默认国家的数据
    // this.tempCountry = this.getTempCountry(this.props.defaultCountry);

    // set the initial state of the input value and the selected flag
    this.setInitialState();
    // utils script, and auto country
    this.initRequests();
  }

  componentDidUpdate(prevProps) {
    if (this.props.value !== prevProps.value) {
      this.updateFlagFromNumber(this.props.value);
    }
  }

  // 处理默认国家数据
  getTempCountry = countryCode => {
    if (countryCode === 'auto') {
      return 'auto';
    }

    let countryData = utils.getCountryData(this.countries, countryCode);
    // check if country is available in the list
    if (!countryData.iso2) {
      if (this.props.preferredCountries.length > 0) {
        countryData = utils.getCountryData(
          this.countries,
          this.props.preferredCountries[0]
        );
      } else {
        countryData = AllCountries.getCountries()[0];
      }
    }
    return countryData.iso2;
  };

  // select the given flag, update the placeholder and the active list item
  // Note: called from setInitialState, updateFlagFromNumber, selectListItem, setCountry
  setFlag = (countryCode, isInit) => {
    const prevCountry = this.selectedCountryData && this.selectedCountryData.iso2
      ? this.selectedCountryData
      : {};

    // do this first as it will throw an error and stop if countryCode is invalid
    this.selectedCountryData = countryCode
      ? utils.getCountryData(
        this.countries,
        countryCode,
        false,
        false,
      )
      : {};
    // update the defaultCountry - we only need the iso2 from now on, so just store that
    if (this.selectedCountryData.iso2) {
      this.defaultCountry = this.selectedCountryData.iso2;
    }

    // update the selected country's title attribute
    const title = countryCode
      ? `${this.selectedCountryData.name}: +${
        this.selectedCountryData.dialCode
        }`
      : 'Unknown';
    let selectedIndex = 0;

    if (countryCode && countryCode !== 'auto') {
      selectedIndex = utils.findIndex(
        this.preferredCountries,
        country => country.iso2 === countryCode
      );
      if (selectedIndex === -1) {
        selectedIndex = utils.findIndex(
          this.countries,
          country => country.iso2 === countryCode
        );
        if (selectedIndex === -1) selectedIndex = 0;
        selectedIndex += this.preferredCountries.length;
      }
    }

    const newNumber = this.updateDialCode(
      this.selectedCountryData.dialCode,
      !isInit
    );

    this.setState(
      {
        value: newNumber,
        countryCode,
        title,
      },
      () => {
        // and the input's placeholder
        this.updatePlaceholder(this.props);

        // 选择国家列表完成时 返回验证信息
        if (
          !isInit &&
          prevCountry.iso2 !== countryCode &&
          typeof this.props.onPhoneNumberChange === 'function'
        ) {
          const currentNumber = this.state.value;

          const fullNumber = this.formatFullNumber(currentNumber);
          if (this.isValidNumber(fullNumber)) {
            this.isValid = undefined;
          } else if(currentNumber) {
            this.isValid = [PHONEERROR];
          }
          // this.isValid = this.isValidNumber(fullNumber) ? undefined : 'error';
          this.props.onPhoneNumberChange(
            this.isValid,
            currentNumber,
            this.selectedCountryData,
            fullNumber,
          );
        }
      }
    );
  };

  // format the number to the given format
  getNumber = (number, format) => {
    if (window.intlTelInputUtils) {
      return window.intlTelInputUtils.formatNumber(
        number,
        this.selectedCountryData.iso2,
        format
      );
    }

    return '';
  };

  // Note: returns the raw string inc plus character and any whitespace/dots etc
  getDialCode = number => {
    let dialCode = '';

    // only interested in international numbers (starting with a plus)
    if (number.charAt(0) === '+') {
      let numericChars = '';

      // iterate over chars
      for (let i = 0, max = number.length; i < max; i++) {
        const c = number.charAt(i);

        // if char is number
        if (utils.isNumeric(c)) {
          numericChars += c;
          // if current numericChars make a valid dial code
          if (this.countryCodes[numericChars]) {
            // store the actual raw string (useful for matching later)
            dialCode = number.substr(0, i + 1);
          }
          // longest dial code is 4 chars
          if (numericChars.length === 4) {
            break;
          }
        }
      }
    }

    return dialCode;
  };

  // check if the given number contains an unknown area code from
  // the North American Numbering Plan i.e. the only dialCode that
  // could be extracted was +1 but the actual number's length is >=4
  isUnknownNanp = (number, dialCode) => {
    return dialCode === '+1' && utils.getNumeric(number).length >= 4;
  };

  // add a country code to countryCodes
  addCountryCode = (countryCodes, iso2, dialCode, priority) => {
    if (!(dialCode in countryCodes)) {
      countryCodes[dialCode] = [];
    }

    const index = priority || 0;

    countryCodes[dialCode][index] = iso2;

    return countryCodes;
  };

  // process the countryCodes map
  processCountryCodes = () => {
    this.countryCodes = {};
    for (let i = 0; i < this.countries.length; i++) {
      const c = this.countries[i];
      this.addCountryCode(this.countryCodes, c.iso2, c.dialCode, c.priority);
      // area codes
      if (c.areaCodes) {
        for (let j = 0; j < c.areaCodes.length; j++) {
          // full dial code is country code + dial code
          this.addCountryCode(
            this.countryCodes,
            c.iso2,
            c.dialCode + c.areaCodes[j]
          );
        }
      }
    }
  };

  // process preferred countries - iterate through the preferences,
  // fetching the country data for each one
  processPreferredCountries = () => {
    this.preferredCountries = [];
    for (let i = 0, max = this.props.preferredCountries.length; i < max; i++) {
      const countryCode = this.props.preferredCountries[i].toLowerCase();
      const countryData = utils.getCountryData(
        this.countries,
        countryCode,
        true
      );
      if (countryData) {
        this.preferredCountries.push(countryData);
      }
    }
  };

  // set the initial state of the input value and the selected flag
  setInitialState = () => {
    const val = this.props.value || this.props.defaultValue || '';

    // if we already have a dial code we can go ahead and set the flag, else fall back to default
    if (this.getDialCode(val)) {
      this.updateFlagFromNumber(val, true);
    } else if (this.tempCountry !== 'auto') {
      // see if we should select a flag
      if (this.tempCountry) {
        this.setFlag(this.tempCountry, true);
      } else {
        // no dial code and no tempCountry, so default to first in list
        this.defaultCountry = this.preferredCountries.length
          ? this.preferredCountries[0].iso2
          : this.countries[0].iso2;
        if (!val) {
          this.setFlag(this.defaultCountry, true);
        }
      }
      // if empty and no nationalMode and no autoHideDialCode then insert the default dial code
      if (!val && !this.nationalMode && !this.autoHideDialCode) {
        this.setState({
          value: `+${this.selectedCountryData.dialCode}`,
        });
      }
    }

    // NOTE: if tempCountry is set to auto, that will be handled separately
    // format
    if (val) {
      this.updateValFromNumber(val);
    }
  };

  initRequests = () => {
    if (this.tempCountry === 'auto') {
      this.loadAutoCountry();
    }
  };

  loadAutoCountry = () => {
    // check for localStorage
    const lsAutoCountry =
      window.localStorage !== undefined
        ? window.localStorage.getItem('itiAutoCountry')
        : '';

    if (lsAutoCountry) {
      this.autoCountry = lsAutoCountry;
    }

    // 3 options:
    // 1) already loaded (we're done)
    // 2) not already started loading (start)
    // 3) already started loading (do nothing - just wait for loading callback to fire)
    if (this.autoCountry) {
      this.autoCountryLoaded();
    } else if (!this.startedLoadingAutoCountry) {
      // don't do this twice!
      this.startedLoadingAutoCountry = true;
    }
  };

  cap = number => number;

  formatNumber = number => {
    if (window.intlTelInputUtils && this.selectedCountryData) {
      let format = window.intlTelInputUtils.numberFormat.INTERNATIONAL;

      if (
        /* eslint-disable no-mixed-operators */
        (this.nationalMode) ||
        number.charAt(0) !== '+'
      /* eslint-enable no-mixed-operators */
      ) {
        format = window.intlTelInputUtils.numberFormat.NATIONAL;
      }

      number = window.intlTelInputUtils.formatNumber(
        number,
        this.selectedCountryData.iso2,
        format
      );
    }
    return number;
  };

  // update the input's value to the given val (format first if possible)
  // if doNotify is true, calls notifyPhoneNumberChange with the formatted value
  // NOTE: this is called from _setInitialState, handleUtils and setNumber
  updateValFromNumber = (number) => {
    if (window.intlTelInputUtils && this.selectedCountryData) {
      const format = this.nationalMode || number.charAt(0) !== '+'
          ? window.intlTelInputUtils.numberFormat.NATIONAL
          : window.intlTelInputUtils.numberFormat.INTERNATIONAL;

      number = window.intlTelInputUtils.formatNumber(
        number,
        this.selectedCountryData.iso2,
        format
      );
    }

    number = this.beforeSetNumber(number);

    this.setState({
      value: number,
    });
  };

  // check if need to select a new flag based on the given number
  // Note: called from _setInitialState, keyup handler, setNumber
  updateFlagFromNumber = (number, isInit) => {
    // if we're in nationalMode and we already have US/Canada selected,
    // make sure the number starts with a +1 so getDialCode will be
    // able to extract the area code
    // update: if we dont yet have selectedCountryData,
    // but we're here (trying to update the flag from the number),
    // that means we're initialising the plugin with a number that already
    // has a dial code, so fine to ignore this bit
    if (
      number &&
      this.nationalMode &&
      this.selectedCountryData &&
      this.selectedCountryData.dialCode === '1' &&
      number.charAt(0) !== '+'
    ) {
      if (number.charAt(0) !== '1') {
        number = `1${number}`;
      }
      number = `+${number}`;
    }

    // try and extract valid dial code from input
    const dialCode = this.getDialCode(number);
    let countryCode = null;

    if (dialCode) {
      // check if one of the matching countries is already selected
      const countryCodes = this.countryCodes[utils.getNumeric(dialCode)];
      const alreadySelected =
        this.selectedCountryData &&
        countryCodes.indexOf(this.selectedCountryData.iso2) !== -1;

      // if a matching country is not already selected
      // (or this is an unknown NANP area code): choose the first in the list
      if (!alreadySelected || this.isUnknownNanp(number, dialCode)) {
        // if using onlyCountries option, countryCodes[0] may be empty,
        // so we must find the first non-empty index
        for (let j = 0; j < countryCodes.length; j++) {
          if (countryCodes[j]) {
            countryCode = countryCodes[j];
            break;
          }
        }
      }
    } else if (number.charAt(0) === '+' && utils.getNumeric(number).length) {
      // invalid dial code, so empty
      // Note: use getNumeric here because the number has not been
      // formatted yet, so could contain bad chars
      countryCode = null;
    }

    if (countryCode !== null) {
      this.setFlag(countryCode, isInit);
    }
  };

  // prepare all of the country data, including onlyCountries and preferredCountries options
  processCountryData = () => {
    // format countries data to what is necessary for component function
    // to data defined in `AllCountries`
    AllCountries.initialize();

    // 获取数据
    this.countries = AllCountries.getCountries();

    // process the countryCodes map
    // 处理区号
    this.processCountryCodes.call(this);

    // 处理首选国家的数据
    this.processPreferredCountries.call(this);
  };

  // 将输入占位符更新为 来自当前所选国家/地区的示例号码
  updatePlaceholder = (props = this.props) => {
    if (
      window.intlTelInputUtils &&
      props.autoPlaceholder &&
      this.selectedCountryData
    ) {
      const numberType = window.intlTelInputUtils.numberType['MOBILE'];
      let placeholder = this.selectedCountryData.iso2
        ? window.intlTelInputUtils.getExampleNumber(
          this.selectedCountryData.iso2,
          this.nationalMode,
          numberType
        )
        : '';

      this.setState({
        placeholder,
      });
    }
  };

  // replace any existing dial code with the new one
  // Note: called from _setFlag
  updateDialCode = (newDialCode, hasSelectedListItem) => {
    const currentNumber = this.state.value;

    if (!newDialCode) {
      return currentNumber;
    }
    let newNumber = currentNumber;

    // save having to pass this every time
    newDialCode = `+${newDialCode}`;

    if (currentNumber.charAt(0) === '+') {
      // there's a plus so we're dealing with a replacement (doesn't matter if nationalMode or not)
      const prevDialCode = this.getDialCode(currentNumber);

      if (prevDialCode) {
        // current number contains a valid dial code, so replace it
        newNumber = currentNumber.replace(prevDialCode, newDialCode);
      } else {
        // current number contains an invalid dial code, so ditch it
        // (no way to determine where the invalid dial code ends and the rest of the number begins)
        newNumber = newDialCode;
      }
    } else if (this.nationalMode) {
      // don't do anything
    } else if (currentNumber) {
      // nationalMode is disabled
      // there is an existing value with no dial code: prefix the new dial code
      newNumber = newDialCode + currentNumber;
    } else if (hasSelectedListItem || !this.autoHideDialCode) {
      // no existing value and either they've just selected a list item, or autoHideDialCode is disabled: insert new dial code
      newNumber = newDialCode;
    }
    return newNumber;
  };

  // validate the input val - assumes the global function isValidNumber (from libphonenumber)
  isValidNumber = number => {
    const val = utils.trim(number);
    const countryCode = this.nationalMode ? this.selectedCountryData.iso2 : '';
    if (window.intlTelInputUtils) {
      return window.intlTelInputUtils.isValidNumber(val, countryCode);
    }

    return false;
  };

  // 格式化数据 加上 区号
  formatFullNumber = number => {
    return window.intlTelInputUtils
      ? this.getNumber(
        number,
        window.intlTelInputUtils.numberFormat.INTERNATIONAL
      )
      : number;
  };

  // remove the dial code if separateDialCode is enabled
  beforeSetNumber = (number) => this.cap(number);

  // Either notify phoneNumber changed if component is controlled
  // or udpate the state and notify change if component is uncontrolled
  handleInputChange = e => {
    const value = this.formatNumber(e.target.value);
    if (this.props.value === undefined) {
      this.setState({value}, () => {
        this.updateFlagFromNumber(value);
      });
    }
  };

  // this is called when the geoip call returns
  autoCountryLoaded = () => {
    if (this.tempCountry === 'auto') {
      this.tempCountry = this.autoCountry;
    }
  };

  // 验证电话号码
  validatorPhone = (rule, value, callback) => {
    const val = this.formatFullNumber(value || this.state.value);
    // 防止在传递了默认电话号码时  value 为空的情况
    console.log(this.state.value);

    if(this.isValidNumber(val)) {
      callback();
      this.props.onPhoneNumberChange(this.isValid = undefined);
    } else {
      callback(PHONEERROR);
    }
  };

  // 验证电话号码必填
  isRequiredPhone = (rule, value, callback) => {
    // 防止在传递了默认电话号码时  value 为空的情况 且 防止直接清除值
    // this.setState({
    //   value: this.formatFullNumber(value || this.state.value),
    // });
    if (value || this.state.value) {
      callback();
    } else {
      callback(PHONEREQUIRE);
    }
  };

  render() {
    const { classes, form } = this.props;
    const { getFieldProps, getFieldError } = form;
    const errors = getFieldError('mobile');

    // const value = this.props.value !== undefined
    //   ? this.formatNumber(this.props.value)
    //   : this.state.value;
    const value = this.props.value !== undefined
      ? this.formatNumber(this.props.value)
      : this.state.value;

    const isValue = errors || this.isValid;
    return (
      <FormControl
        fullWidth
        required
        error={isValue}
        margin="normal"
        {...getFieldProps('mobile', {
          validateFirst: true, // 如果第一个规则错了 就不验证 后面的规则
          initialValue: value,
          trigger: 'onChange',
          rules: [
            {
              validator: this.isRequiredPhone, // 自定义验证必填规则
            },
            {
              validator: this.validatorPhone, // 自定义验证错误规则
            },
          ],
        })}
      >
        <MyLabel fontSize="sm" shrink>Phone *</MyLabel>
        <div className={classes.wrapper}>
          <FlagDropDown
            setFlag={this.setFlag}
            countries={this.countries}
            countryCode={this.state.countryCode}
            preferredCountries={this.preferredCountries}
          />
          <TelInput
            value={value}
            handleInputChange={this.handleInputChange}
            placeholder={this.state.placeholder}
          />
        </div>
        {
          isValue
            ? <FormHelperText>{isValue.join(',')}</FormHelperText>
            : null
        }
      </FormControl>
    );
  }
}

IntlTelInput.propTypes = {
  classes: PropTypes.objectOf(PropTypes.object).isRequired,
  // rc-form 验证
  form: PropTypes.objectOf(PropTypes.object).isRequired,
  /** The value of the input field. Useful for making input value controlled from outside the component. */
  value: PropTypes.string,
  /** The value used to initialize input. This will only work on uncontrolled component. */
  defaultValue: PropTypes.string,
  /** If there is just a dial code in the input: remove it on blur, and re-add it on focus. */
  autoHideDialCode: PropTypes.bool,
  /** Add or remove input placeholder with an example number for the selected country. */
  autoPlaceholder: PropTypes.bool, // eslint-disable-line react/no-unused-prop-types
  /** Default country. */
  // defaultCountry: PropTypes.string,
  /** Don't insert international dial codes. */
  nationalMode: PropTypes.bool,
  /** The countries at the top of the list. defaults to United States and United Kingdom. */
  preferredCountries: PropTypes.arrayOf(PropTypes.string),

  //
  onPhoneNumberChange: PropTypes.func,
};

IntlTelInput.defaultProps = {
  defaultValue: '',
  // define the countries that'll be present in the dropdown
  // if there is just a dial code in the input: remove it on blur, and re-add it on focus
  autoHideDialCode: true,
  // add or remove input placeholder with an example number for the selected country
  autoPlaceholder: true,
  // default country
  // defaultCountry: 'us',
  // don't insert international dial codes
  nationalMode: true,
  // the countries at the top of the list. defaults to united states and united kingdom
  preferredCountries: ['us', 'cn', 'gb'],

  onPhoneNumberChange: null,
};

export default IntlTelInput;
