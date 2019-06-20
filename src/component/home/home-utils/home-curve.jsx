/* eslint-disable */
import React from 'react';
import uuid from 'uuid';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';

import DateRange from '../../../common/date-picker/rc-calendar';
import { curveStyle } from './style';

@withStyles(curveStyle)
class HomeCurve extends React.Component {
  constructor(props) {
    super(props);
    const { data } = props;
    console.log(data);
    this.state = {
      tabs: 0,
    };

    // tabs数据
    this.tabsArr = [
      {
        id: uuid(),
        text: 'Clicks',
        value: data[0].clicks,
      },
      {
        id: uuid(),
        text: 'Ordered items',
        value: data[0].purchaseQty,
      },
      {
        id: uuid(),
        text: 'Conversion',
        value: data[0].rate,
      },
      {
        id: uuid(),
        text: 'Ordered amount',
        value: data[0].purchaseAmount,
      },
      {
        id: uuid(),
        text: 'Esimated earnings from uncompleted items',
        value: data[0].expectedBrokerageAmount,
      },
      {
        id: uuid(),
        text: 'Earnings from completed items',
        value: data[0].completeBrokerageAmount,
      },
    ]
  }

  // 获取时间;
  getDate = (date) => {
    this.date = date;
    console.log('选择时间', date);
  };

  // tabs 切换
  handleChange = (event, tabs) => {
    this.setState({
      tabs,
    })
  };

  render() {
    const { classes } = this.props;
    const { tabs } = this.state;
    return (
      <div className={classes.root}>
        <div className={classes.date}>
          <DateRange getDate={this.getDate} />
        </div>
        <Tabs
          value={tabs}
          onChange={this.handleChange}
          textColor="primary"
          centered
          classes={{
            indicator: classes.indicator,
            flexContainer: classes.flexContainer,
          }}
        >
          {
            this.tabsArr.map(v => (
              <Tab
                key={v.id}
                label={(
                  <>
                    <span>{v.text}</span>
                    <span>{v.value}</span>
                  </>
                )}
                classes={{
                  root: classes.tabRoot,
                  wrapper: classes.tabWrapper,
                }}
              />
            ))
          }
        </Tabs>
      </div>
    );
  }
}

HomeCurve.propTypes = {
  classes: PropTypes.objectOf(PropTypes.object).isRequired,
  data: PropTypes.array.isRequired,
};

export default HomeCurve;
