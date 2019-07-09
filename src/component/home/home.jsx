import React from 'react';
import PropTypes from 'prop-types';

import MainContainer from '../../common/box-container/main-container';
import HomeHeader from './home-utils/home-header';
import HomeCurve from './home-utils/home-curve';
import HomeDetail from './home-utils/home-detail';
import { Consumer } from '../../context/index';
import { session, getDaysTime, getTime } from '../../asstes/js/utils-methods';
import { httpResponse } from './home-http';

const PAGE_SIZE = 10; // 分页每一页条数

class Home extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      loading: true,
      userInfo: null, // 用户信息数据
      statistics: null, // 推广数据统计 (tab)
      detail: null, // 推广数据统计 (表格)
      daily: null, // 推广数据统计 (折线图)
      timer: {},
    };
    this.consumer = null;
  }

  componentDidMount() {
    const start = getTime(getDaysTime(90));
    const end = getTime(new Date().getTime(), 'end');
    this._unmount = true;
    Promise.all([
      httpResponse('/api/index/userInfo'),
      httpResponse('/api/index/statistics', { start, end }),
      httpResponse('/api/index/statistics/daily', { start, end }),
      httpResponse('/api/index/statistics/detail', {
        start, end, page: 1, size: PAGE_SIZE,
      }),
    ]).then((response) => { // 最后还得处理异常情况
      // 防止组件移除后 执行setState
      if (this._unmount) {
        const userInfo = {
          userName: response[0].firstName + response[0].lastName,
          userPhoto: response[0].photo,
        };
        // userInfo 写入context当中
        this.consumer.getUserInfo(userInfo);
        // // userInfo 写入 session 当中
        session.setSession('userInfo', userInfo);

        this.setState({
          loading: false,
          userInfo: response[0],
          statistics: response[1],
          daily: response[2],
          detail: response[3],
        });
      }
    }).catch((err) => {
      if (err.status === 401) {
        // eslint-disable-next-line react/destructuring-assignment
        this.props.history.push('/s/signin');
      }
    });
  }

  componentWillUnmount() {
    this._unmount = false;
  }

  // 按日期查询推广数据
  handleChangeDate = (result) => {
    const { start, end } = result;
    Promise.all([
      httpResponse('/api/index/statistics/daily', { start, end }),
      httpResponse('/api/index/statistics/detail', {
        start, end, page: 1, size: PAGE_SIZE,
      }),
    ]).then((response) => {
      this.setState({
        daily: response[0],
        detail: response[1],
        timer: {
          start,
          end,
        },
      });
    });
  };

  render() {
    const {
      loading, userInfo, statistics, detail, daily, timer,
    } = this.state;
    return (
      <MainContainer margin={[44, 0, 40]}>
        <Consumer>
          {
            (context) => {
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
                        size={PAGE_SIZE}
                        data={detail}
                        time={timer}
                      />
                    </>
                  )
              );
            }
          }
        </Consumer>
      </MainContainer>
    );
  }
}

Home.propTypes = {
  history: PropTypes.objectOf(PropTypes.object).isRequired,
};

export default Home;
