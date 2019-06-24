import React from 'react';
import PropTypes from 'prop-types';
import Highcharts from 'highcharts';

const startUp = (ref, time, data) => {
  Highcharts.chart(ref, {
    credits: {
      enabled: false, // 移除默认的版权信息,
    },
    chart: {
      zoomType: 'x',
    },
    title: {
      text: 'freedom.yi',
    },
    subtitle: {
      text: document.ontouchstart === undefined
        ? '鼠标拖动可以进行缩放' : '手势操作进行缩放',
    },
    xAxis: {
      categories: time,
    },
    tooltip: {
      headerFormat: '日期: {point.x} <br>',
      pointFormat: '数量：{point.y} 次 ',
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
            [0, Highcharts.getOptions().colors[0]],
            [1, Highcharts.Color(Highcharts.getOptions().colors[0]).setOpacity(0).get('rgba')],
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
};

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
    return (
      <div style={{ minHeight: 400 }} ref={(n) => { this.containerRef = n; }} />
    );
  }
}

MyHighcharts.propTypes = {
  chartsData: PropTypes.objectOf(PropTypes.object).isRequired,
};

export default MyHighcharts;
