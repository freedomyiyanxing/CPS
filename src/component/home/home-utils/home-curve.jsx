import React from 'react';
import uuid from 'uuid';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import moment from 'moment';

import DateRange from '../../../common/date-picker/rc-calendar';
import Counter from '../../../common/beat-number/beat-number';
import MyHighcharts from '../../../common/my-highcharts/my-highcharts';

import { curveStyle } from './style';

@withStyles(curveStyle)
class HomeCurve extends React.Component {
  constructor(props) {
    super(props);
    const { data } = props;
    this.state = {
      tabs: 2,
    };

    // tabs数据
    this.tabsArr = [
      {
        id: uuid(),
        unit: null,
        text: 'Clicks',
        value: data[0].clicks,
      },
      {
        id: uuid(),
        unit: null,
        text: 'Ordered items',
        value: data[0].purchaseQty,
      },
      {
        id: uuid(),
        unit: '%',
        text: 'Conversion',
        value: data[0].rate,
      },
      {
        id: uuid(),
        unit: '$',
        text: 'Ordered amount',
        value: data[0].purchaseAmount,
      },
      {
        id: uuid(),
        unit: '$',
        text: 'Esimated earnings from uncompleted items',
        value: data[0].expectedBrokerageAmount,
      },
      {
        id: uuid(),
        unit: '$',
        text: 'Earnings from completed items',
        value: data[0].completeBrokerageAmount,
      },
    ];

    // 曲线图中 时间数组
    this.dailyTime = [];

    // 曲线图中 数据数组 二位数组
    this.dailyData = [];

    // 遍历  模拟曲线图的数据
    data[1].forEach((v, i) => {
      // 把时间格式修改 然后存入 this.dailyDate 数组中
      this.dailyTime.push(moment(v.date).format('MMM DD,YYYY'));
      if (i === 0) {
        this.dailyData[0] = [v.clicks];
        this.dailyData[1] = [v.purchaseQty];
        this.dailyData[2] = [v.rate];
        this.dailyData[3] = [v.purchaseAmount];
        this.dailyData[4] = [v.expectedBrokerageAmount];
        this.dailyData[5] = [v.completeBrokerageAmount];
      } else {
        this.dailyData[0].push(v.clicks);
        this.dailyData[1].push(v.purchaseQty);
        this.dailyData[2].push(v.rate);
        this.dailyData[3].push(v.purchaseAmount);
        this.dailyData[4].push(v.expectedBrokerageAmount);
        this.dailyData[5].push(v.completeBrokerageAmount);
      }
    });
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
    });
  };

  render() {
    const { classes } = this.props;
    const { tabs } = this.state;
    return (
      <div className={classes.root}>
        <DateRange getDate={this.getDate} />
        <Tabs
          value={tabs}
          centered
          classes={{
            indicator: classes.indicator,
            scroller: classes.flexContainer,
          }}
          onChange={this.handleChange}
        >
          {
            this.tabsArr.map((v, i) => (
              <Tab
                key={v.id}
                label={(
                  <>
                    <span className={classes.tabsText}>{v.text}</span>
                    <Counter value={v.value} unit={v.unit} />
                    {
                      tabs === i
                        ? <span className={`triangle-right ${classes.triangle}`} />
                        : null
                    }
                  </>
                )}
                className={tabs === i ? classes.active : ''}
                classes={{
                  root: classes.tabRoot,
                  wrapper: classes.tabWrapper,
                }}
              />
            ))
          }
        </Tabs>
        <MyHighcharts
          chartsData={{
            time: this.dailyTime, data: this.dailyData[tabs],
          }}
        />
      </div>
    );
  }
}

HomeCurve.propTypes = {
  classes: PropTypes.objectOf(PropTypes.object).isRequired,
  data: PropTypes.objectOf(PropTypes.array).isRequired,
};

export default HomeCurve;
