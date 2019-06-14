/* eslint-disable */
import React from 'react';
import PropTypes from 'prop-types';
import uuid from 'uuid';
import { withStyles } from '@material-ui/core/styles/index';
import MyButton from '../../../common/button/button'

import MainContainer from '../../../common/box-container/main-container';
import BasicSetting from './basic-setting';

import { settingStyle } from '../style';

const titleArr = [
  {
    id: uuid(),
    index: 0,
    text: 'Basic Setting',
  },
  {
    id: uuid(),
    index: null,
    text: null,
  },
  {
    id: uuid(),
    index: 1,
    text: 'Wibsite Setting',
  },
];

@withStyles(settingStyle)
class AccountSetting extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      value: 0,
    };
  }

  handleChange = (newValue) => {
    this.setState({
      value: newValue,
    });
  };

  render() {
    const { classes } = this.props;
    const { value } = this.state;
    return (
      <MainContainer>
        <div className={classes.header}>
          {
            titleArr.map(v => (
              v.text === null
                ? <span className={classes.line} />
                : (
                  <MyButton
                    key={v.id}
                    color="primary"
                    className={`${classes.btn} ${v.index === value ? classes.active : ''}`}
                    onClick={() => { this.handleChange(v.index); }}
                  >
                    {v.text}
                  </MyButton>
                )
            ))
          }
        </div>
        <div className={classes.root}>
          <div className={classes.left}>
            {value === 0 && <BasicSetting />}
            {value === 1 && <div className={classes.items}>我是Wibsite Setting</div>}
          </div>
          <div className={classes.right}>
            我是个人账户修改页面
          </div>
        </div>
      </MainContainer>
    );
  }
}

AccountSetting.propTypes = {
  classes: PropTypes.objectOf(PropTypes.object).isRequired,
};

export default AccountSetting;
