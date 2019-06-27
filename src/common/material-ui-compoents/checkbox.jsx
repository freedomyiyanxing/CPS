import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/core/styles';
import Checkbox from '@material-ui/core/Checkbox';
import CheckBox from '@material-ui/icons/CheckBox';
import CheckBoxOutlineBlank from '@material-ui/icons/CheckBoxOutlineBlank';

const useStyle = makeStyles(theme => ({
  checkRoot: {
    padding: 7,
  },
  icon: {
    fontSize: theme.typography.fontSizeLg,
  },
}));


const MyCheckbox = (props) => {
  const { onChange } = props;
  const [check, setCheck] = useState(false);
  const classes = useStyle();

  const handleChange = () => {
    setCheck(!check);
    onChange(!check);
  };


  return (
    <Checkbox
      value="checkedC"
      checked={check}
      onChange={handleChange}
      icon={<CheckBoxOutlineBlank className={classes.icon} />}
      color="primary"
      checkedIcon={<CheckBox className={classes.icon} />}
      classes={{
        root: classes.checkRoot,
      }}
    />
  );
};

MyCheckbox.propTypes = {
  onChange: PropTypes.func.isRequired,
};

export default MyCheckbox;
