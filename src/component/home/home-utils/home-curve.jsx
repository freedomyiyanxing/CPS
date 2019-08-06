import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';

import DateRange from '../../../common/date-picker/date-range';
import Counter from '../../../common/beat-number/beat-number';
import MyHighcharts from '../../../common/my-highcharts/my-highcharts';
import MyTooltip from '../../../common/material-ui-component/tooltip';
import { statisticsTabs, polylineDaily } from '../../../assets/data/default-data';

import { curveStyle } from './style';

@withStyles(curveStyle)
class HomeCurve extends React.Component {
  constructor(props) {
    super(props);
    const { data } = props;
    this.state = {
      tabs: 0, // 默认展开第0项
    };
    this.tabs = statisticsTabs(data[1]);
  }

  componentWillReceiveProps(nextProps) {
    const { data } = nextProps;
    this.tabs = statisticsTabs(data[1]);
  }

  // tabs 切换
  handleChange = (event, tabs) => {
    this.setState({
      tabs,
    });
  };

  render() {
    const {
      classes, data, onChange, time,
    } = this.props;
    const { tabs } = this.state;
    const polyline = polylineDaily(data[0], time);
    return (
      <div className={classes.root}>
        <DateRange onChange={onChange} />
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
            this.tabs.map((v, i) => (
              <Tab
                key={v.id}
                label={(
                  <>
                    <span className={classes.tabsText}>
                      <MyTooltip text={v.text} />
                      {v.text}
                    </span>
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
            time: polyline.dailyTime, data: polyline.dailyData[tabs],
          }}
        />
      </div>
    );
  }
}

HomeCurve.propTypes = {
  classes: PropTypes.objectOf(PropTypes.object).isRequired,
  data: PropTypes.objectOf(PropTypes.array).isRequired,
  time: PropTypes.objectOf(PropTypes.object).isRequired,
  onChange: PropTypes.func.isRequired,
};

export default HomeCurve;
