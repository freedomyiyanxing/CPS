import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles/index';

import MyButton from '../../../common/material-ui-compoents/button';
import MainContainer from '../../../common/box-container/main-container';
import BasicSetting from './basic-setting';
import WibsiteSetting from './wibsite-setting';
import MyCropper from './cropper';

import { accountSettingTabs } from '../../../asstes/data/default-data';
// eslint-disable-next-line no-unused-vars
import { get } from '../../../asstes/http/index';

import { settingStyle } from './style';

const iconUrl = 'https://fengyuanchen.github.io/cropperjs/images/picture.jpg';

@withStyles(settingStyle)
class AccountSetting extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      value: 0,
    };
  }

  componentDidMount() {
    // get('/api/profile/info')
    //   .then((response) => {
    //     console.log(response);
    //   })
    //   .catch((err) => {
    //     console.log(err);
    //   });
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
            accountSettingTabs.map(v => (
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
            {value === 1 && <WibsiteSetting />}
          </div>
          <MyCropper iconUrl={iconUrl} />
        </div>
      </MainContainer>
    );
  }
}

AccountSetting.propTypes = {
  classes: PropTypes.objectOf(PropTypes.object).isRequired,
};

export default AccountSetting;
