import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';

const startUp = (ref, time, data) => {
  import('highcharts').then((hig) => {
    const ds = hig.default;
    ds.chart(ref, {
      credits: {
        enabled: false, // 移除默认的版权信息,
      },
      chart: {
        zoomType: 'x',
      },
      title: {
        text: null, // 'freedom.yi',
      },
      subtitle: {
        // text: document.ontouchstart === undefined
        //   ? '鼠标拖动可以进行缩放' : '手势操作进行缩放',
      },
      xAxis: {
        categories: time,
      },
      tooltip: {
        headerFormat: 'Date: {point.x} <br>',
        pointFormat: 'Qty：{point.y} Times',
      },
      yAxis: {
        title: {
          text: null,
        },
      },
      legend: {
        enabled: false,
      },
      plotOptions: {
        area: {
          fillColor: {
            linearGradient: {
              x1: 0,
              y1: 0,
              x2: 0,
              y2: 1,
            },
            stops: [
              [0, ds.getOptions().colors[0]],
              [1, ds.Color(ds.getOptions().colors[0]).setOpacity(0).get('rgba')],
            ],
          },
          marker: {
            radius: 2,
          },
          lineWidth: 1,
          states: {
            hover: {
              lineWidth: 1,
            },
          },
          threshold: null,
        },
      },
      series: [{
        type: 'area',
        data,
      }],
    });
  });
};

@withStyles(() => ({
  root: {
    maxHeight: 500,
    minHeight: 400,
    marginTop: 38,
  },
  rootNo: {
    height: 400,
  },
}))
class MyHighcharts extends React.Component {
  componentDidMount() {
    const { chartsData } = this.props;
    const { time, data } = chartsData;
    startUp(this.containerRef, time, data);
  }

  shouldComponentUpdate(nextProps) {
    const { time, data } = nextProps.chartsData;
    startUp(this.containerRef, time, data);
    return true;
  }

  render() {
    const { classes, chartsData } = this.props;
    return (
      <div
        className={chartsData.time.length ? classes.root : classes.rootNo}
        ref={(n) => {
          this.containerRef = n;
        }}
      />
    );
  }
}

MyHighcharts.propTypes = {
  chartsData: PropTypes.objectOf(PropTypes.object).isRequired,
  classes: PropTypes.objectOf(PropTypes.object).isRequired,
};

export default MyHighcharts;
