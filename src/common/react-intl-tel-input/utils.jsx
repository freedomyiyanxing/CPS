/* eslint-disable */
import AllCountries from './AllCountries';

export default {
  trim(str) {
    // Make sure we trim BOM and NBSP
    const rtrim = /^[\s\uFEFF\xA0]+|[\s\uFEFF\xA0]+$/g;

    if (!str) {
      return '';
    }

    return str.replace(rtrim, '');
  },

  isNumeric(obj) {
    return obj - parseFloat(obj) >= 0;
  },

  // extract the numeric digits from the given string
  getNumeric(s) {
    return s.replace(/\D/g, '');
  },

  // find the country data for the given country code
  // the ignoreOnlyCountriesOption is only used during init()
  // while parsing the onlyCountries array
  getCountryData(
    countries,
    countryCode,
    ignoreOnlyCountriesOption,
    allowFail,
    errorHandler
  ) {
    const countryList = ignoreOnlyCountriesOption
      ? AllCountries.getCountries()
      : countries;

    for (let i = 0; i < countryList.length; i++) {
      if (countryList[i].iso2 === countryCode) {
        return countryList[i];
      }
    }

    if (allowFail) {
      return null;
    }

    if (typeof errorHandler === 'function') {
      errorHandler(countryCode);
    }

    return {};
  },


  findIndex(items, predicate) {
    let index = -1;

    items.some((item, i) => {
      if (predicate(item)) {
        index = i;

        return true;
      }
    });

    return index;
  },

  // Get the location of cursor after formatting is done on the phone number
  getCursorPositionAfterFormating(prevBeforeCursor, prev, next) {
    if (prev === next) {
      return prevBeforeCursor.length;
    }
    let cursorShift = 0;

    if (prev.length > next.length) {
      for (
        let i = 0, j = 0;
        i < prevBeforeCursor.length && j < next.length;
        i += 1
      ) {
        if (prevBeforeCursor[i] !== next[j]) {
          if (isNaN(next[j]) && !isNaN(prevBeforeCursor[i])) {
            i -= 1;
            j += 1;
            cursorShift += 1;
          } else {
            cursorShift -= 1;
          }
        } else {
          j += 1;
        }
      }
    } else {
      for (
        let i = 0, j = 0;
        i < prevBeforeCursor.length && j < next.length;
        j += 1
      ) {
        if (prevBeforeCursor[i] !== next[j]) {
          if (isNaN(prevBeforeCursor[i]) && !isNaN(next[j])) {
            j -= 1;
            i += 1;
            cursorShift -= 1;
          } else {
            cursorShift += 1;
          }
        } else {
          i += 1;
        }
      }
    }

    return prevBeforeCursor.length + cursorShift;
  },
};


