import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';

import DateRange from '../../../common/date-picker/rc-calendar';
import Counter from '../../../common/beat-number/beat-number';
import MyHighcharts from '../../../common/my-highcharts/my-highcharts';
import { statisticsTabs, polylineDaily } from '../../../asstes/data/default-data';

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

  // tabs 切换
  handleChange = (event, tabs) => {
    this.setState({
      tabs,
    });
  };

  render() {
    const { classes, data, onChange } = this.props;
    const { tabs } = this.state;
    const polyline = polylineDaily(data[0]);
    return (
      <div className={classes.root}>
        <DateRange getDate={onChange} />
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
  onChange: PropTypes.func.isRequired,
};

export default HomeCurve;
