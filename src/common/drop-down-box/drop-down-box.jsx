import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/core/styles';
import ArrowDropDown from '@material-ui/icons/ArrowDropDown';
import Collapse from '@material-ui/core/Collapse';
import ClickAwayListener from '@material-ui/core/ClickAwayListener';
import MenuItem from '@material-ui/core/MenuItem';
import MenuList from '@material-ui/core/MenuList';

const useStyle = makeStyles(theme => ({
  selectMain: {
    width: 260,
    position: 'relative',
  },
  control: {
    position: 'relative',
    height: 32,
    display: 'flex',
    alignItems: 'center',
    padding: [[0, 10]],
    background: theme.palette.primary[50],
    border: `1px solid ${theme.palette.border.borderDD}`,
    fontSize: theme.typography.fontSize,
    cursor: 'pointer',
    fontWeight: theme.typography.fontWeight,
  },
  linkCollapse: {
    position: 'absolute',
    right: 0,
    top: 32,
    zIndex: theme.zIndex.mobileStepper,
  },
  selectWrapper: {
    width: 260,
    height: 280,
    overflowY: 'auto',
    background: theme.palette.primary[50],
    border: `1px solid ${theme.palette.border.borderDD}`,
    borderTop: 'none',
  },
  firstName: {
    color: theme.palette.text.secondary,
    marginRight: 6,
  },
  icon: {
    position: 'absolute',
    right: 10,
    color: theme.palette.text.secondary,
  },
  items: {
    backgroundColor: theme.palette.action.selected,
  },
}));

const DropDownBox = (props) => {
  const { onChange, selects } = props;
  const [value, setValue] = useState(selects[0].name);
  const [open, setOpen] = useState(false);
  const classes = useStyle();

  const handleSelectChange = (v) => {
    setOpen(false);
    // 如果当前选中值 等于上次选中的 就不做如何操作 直接返回
    if (v.name === value) return;
    setValue(v.name);
    onChange(v.value);
  };

  return (
    <div className={classes.selectMain}>
      <div
        tabIndex={0}
        role="button"
        className={classes.control}
        onClick={() => { setOpen(true); }}
      >
        <span className={classes.firstName}>Sort by :</span>
        <span>{value}</span>
        <ArrowDropDown className={classes.icon} />
      </div>
      <ClickAwayListener onClickAway={() => { setOpen(false); }}>
        <Collapse
          in={open}
          classes={{
            container: classes.linkCollapse,
          }}
        >
          <MenuList className={classes.selectWrapper}>
            {
              selects.map(v => (
                <MenuItem
                  key={v.id}
                  value={v.value}
                  className={value === v.name ? classes.items : ''}
                  onClick={() => { handleSelectChange(v); }}
                >
                  {v.name}
                </MenuItem>
              ))
            }
          </MenuList>
        </Collapse>
      </ClickAwayListener>
    </div>
  );
};

DropDownBox.propTypes = {
  onChange: PropTypes.func.isRequired,
  selects: PropTypes.objectOf(PropTypes.array).isRequired,
};

export default DropDownBox;
