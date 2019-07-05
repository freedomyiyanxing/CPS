/* eslint-disable */
import React from 'react';

import MainContainer from '../../common/box-container/main-container';
import HomeHeader from './home-utils/home-header';
import HomeCurve from './home-utils/home-curve';
import HomeDetail from './home-utils/home-detail';
import { Consumer } from '../../context/index';
import { session, timeInterval } from '../../asstes/js/utils-methods';
import { httpResponse } from './home-http';

const PAGESIZE = 10; // 分页每一页条数

class Home extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      loading: true,
      userInfo: null,
      statistics: null,
      detail: null,
      daily: null,
    };
    this.consumer = null;
  }

  componentDidMount() {
    const interval = timeInterval();
    this._unmount = true;
    Promise.all([
      httpResponse('/api/index/userInfo'),
      httpResponse('/api/index/statistics', {
        start: interval.resultTime,
        end: interval.currentTime,
      }),
      httpResponse('/api/index/statistics/daily', {
        start: interval.resultTime,
        end: interval.currentTime,
      }),
      httpResponse('/api/index/statistics/detail', {
        start: interval.resultTime,
        end: interval.currentTime,
        page: 0,
        size: PAGESIZE,
      }),
    ]).then((data) => { // 最后还得处理异常情况
      // 防止组件移除后 执行setState
      if (this._unmount) {
        const userInfo = {
          userName: data[0].firstName + data[0].lastName,
          userPhoto: data[0].photo,
        };
        // userInfo 写入context当中
        this.consumer.getUserInfo(userInfo);
        // // userInfo 写入 session 当中
        session.setSession('userInfo', userInfo);

        this.setState({
          loading: false,
          userInfo: data[0],
          statistics: data[1],
          daily: data[2],
          detail: data[3],
        });
      }
    }).catch((err) => {
      if (err.status === 401) {
        this.props.history.push('/s/signin');
      }
    })
  }

  componentWillUnmount() {
    this._unmount = false;
  }

  // 按日期查询推广数据 (折线图)
  handleChangeDate = (result) => {
    const { start, end } = result;
    httpResponse('/api/index/statistics/daily', {
      start,
      end,
    }).then((response) => {
      this.setState({
        daily: response,
      });
    }).catch((err) => {
      if (err.status === 401) {
        this.props.history.push('/s/signin');
      }
    });
  };

  // 点击分页时查询推广数据明细 (表格)
  handlePaginationChange = (current) => {
    const interval = timeInterval();
    console.log(current);
    httpResponse('/api/index/statistics/detail', {
      start: interval.resultTime,
      end: interval.currentTime,
      page: current,
      size: PAGESIZE,
    }).then((response) => {
      console.log(response);
      this.setState({
        detail: response,
      });
    })
  };

  // 按订单号查询推广数据明细 (表格)
  handleOrderNumberChange = (e) => {
    const interval = timeInterval();
    httpResponse('/api/index/statistics/detail', {
      start: interval.resultTime,
      end: interval.currentTime,
      page: 1,
      size: PAGESIZE,
      orderSN: e.target.value,
    }).then((response) => {
      console.log(response);
      this.setState({
        detail: response,
      });
    })
  };

  render() {
    const { loading, userInfo, statistics, detail, daily } = this.state;
    return (
      <MainContainer margin={[44, 0, 40]}>
        <Consumer>
          {
            context => {
              this.consumer = context;
              return (
                loading
                  ? <div>loading。。。。</div>
                  : (
                    <>
                      <HomeHeader data={userInfo} />
                      <HomeCurve
                        data={[daily, statistics]}
                        onChange={this.handleChangeDate}
                      />
                      <HomeDetail
                        size={PAGESIZE}
                        data={detail}
                        onChangePage={this.handlePaginationChange}
                        onChangeOrderNumber={this.handleOrderNumberChange}
                      />
                    </>
                  )
              )
            }
          }
        </Consumer>
      </MainContainer>
    );
  }
}

export default Home;
