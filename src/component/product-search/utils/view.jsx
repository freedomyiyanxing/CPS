/* eslint-disable */
import React, { useState } from 'react';
import PropTypes from 'prop-types';
import uuid from 'uuid';
import { makeStyles, withStyles } from '@material-ui/core/styles';
import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';
import OutlinedInput from '@material-ui/core/OutlinedInput';

import InputBase from '@material-ui/core/InputBase';
import MyTextField from '../../../common/material-ui-compoents/text-field-input';
import MyInput from '../../../common/material-ui-compoents/input';

import MySelects from '../../../common/material-ui-compoents/select';

import { viewStyle } from '../style';


const selects = [
  {
    uuid: uuid(),
    name: 'Date: New to Old',
    value: 'dateDesc',
  },
  {
    uuid: uuid(),
    name: 'Date: Old to New',
    value: 'dateAsc',
  },
  {
    uuid: uuid(),
    name: 'Ad Fees Rate: High to Low',
    value: 'rateDesc',
  },
  {
    uuid: uuid(),
    name: 'Ad Fees Rate: Low to High',
    value: 'rateAsc',
  },
  {
    uuid: uuid(),
    name: 'Price: High to Low',
    value: 'priceDesc',
  },
  {
    uuid: uuid(),
    name: 'Price: Low to High',
    value: 'priceAsc',
  },
  {
    uuid: uuid(),
    name: 'Alphabetically: A-Z',
    value: 'nameDesc',
  },
  {
    uuid: uuid(),
    name: 'Alphabetically: Z-A',
    value: 'nameAsc',
  },
];

const BootstrapInput = withStyles(theme => ({
  root: {
    'label + &': {
      marginTop: theme.spacing(3),
    },
  },
  input: {
    position: 'relative',
    backgroundColor: theme.palette.background.paper,
    border: '1px solid #ced4da',
    fontSize: 16,
    padding: '10px 26px 10px 12px',
    transition: theme.transitions.create(['border-color', 'box-shadow']),
    '&:focus': {
      borderColor: '#80bdff',
      boxShadow: '0 0 0 0.2rem rgba(0,123,255,.25)',
    },
  },
}))(InputBase);


const useStyle = makeStyles(viewStyle);
const View = (props) => {
  const { data } = props;
  const [value, setValue] = useState('');
  const classes = useStyle();
  console.log(data);

  const handleSelectChange = (e) => {
    setValue(e.target.value);
  };

  return (
    <div className={classes.root}>
      <FormControl
        fullWidth
        margin="none"
        className={classes.formControl}
      >
        {/*<InputLabel htmlFor="outlined-age-simple">*/}
        {/*  Age*/}
        {/*</InputLabel>*/}
        <MySelects
          value={value}
          onChange={handleSelectChange}
          className={classes.selects}
          input={(
            <MyInput
              type="text"
              startAdornment={<span>哈哈</span>}
              classes={{
                focused: classes.aa,
              }}
            />
          )}
        >
          {
            selects.map(v => (
              <MenuItem key={v.id} value={v.value}>{v.name}</MenuItem>
            ))
          }
        </MySelects>
      </FormControl>

    </div>
  );
};

View.propTypes = {
  data: PropTypes.objectOf(PropTypes.object).isRequired,
};

export default View;
