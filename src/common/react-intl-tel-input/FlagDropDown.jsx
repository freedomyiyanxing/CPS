/* eslint-disable */

import React, {Component} from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Select from '@material-ui/core/Select';
import MenuItem from '@material-ui/core/MenuItem';

import { countryListStyle } from './style';

@withStyles(countryListStyle)
class CountryList extends Component {
  static propTypes = {
    setFlag: PropTypes.func,
    countryCode: PropTypes.string.isRequired,
    countries: PropTypes.arrayOf(PropTypes.object).isRequired,
    preferredCountries: PropTypes.arrayOf(PropTypes.object).isRequired,
    classes: PropTypes.objectOf(PropTypes.object).isRequired,
  };

  handleChange = e => {
    this.props.setFlag(e.target.value);
    console.log(e.target.value);
  };

  appendListItem = (countries, isPreferred = false) => {
    const { classes } = this.props;
    return countries.map(country => {
      const keyPrefix = isPreferred ? 'pref-' : '';
      return (
        <MenuItem
          key={`${keyPrefix}${country.iso2}`}
          data-dial-code={country.dialCode}
          data-country-code={country.iso2}
          value={country.iso2}
          className={classes.items}
        >
          <span
            className={`${classes.itiFlag} flag flag-${country.iso2}`}
          />
          <span className="country-name">{country.name}</span>
          <span className="dial-code">+{country.dialCode}</span>
        </MenuItem>
      );
    });
  };

  render() {
    const {
      classes, preferredCountries, countries, countryCode
    } = this.props;
    let preferredOptions = null;
    let divider = null;
    if (preferredCountries.length) {
      preferredOptions = this.appendListItem(preferredCountries, true);
      divider = <div className={classes.line} />;
    }

    let options = this.appendListItem(countries);
    return (
      <>
        <span
          role="button"
          tabIndex={0}
          className={`${classes.flag} ${classes.itiFlag} flag flag-${countryCode}`}
        />
        <Select
          className={classes.root}
          onChange={this.handleChange}
          MenuProps={{
            PaperProps: {
              className: classes.menu,
            },
          }}
        >
          {preferredOptions}
          {divider}
          {options}
        </Select>
      </>
    );
  }
}

export default CountryList;
