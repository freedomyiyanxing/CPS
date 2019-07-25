import React from 'react';
import PropTypes from 'prop-types';
import { inject } from 'mobx-react';

import MainContainer from '../../common/box-container/main-container';
import HomeHeader from './home-utils/home-header';
import HomeCurve from './home-utils/home-curve';
import HomeDetail from './home-utils/home-detail';

import { getDaysTime, getTime } from '../../asstes/js/utils-methods';
import { httpResponse } from './home-http';

const PAGE_SIZE = 10; // 分页每一页条数

@inject(store => ({
  userStore: store.userStore,
}))
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
  }

  componentDidMount() {
    const { userStore } = this.props;
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
        const [userInfo, statistics, daily, detail] = response;
        // 写入store当中
        userStore.setUserPhoto(userInfo.photo);
        userStore.setUserName(userInfo.firstName + userInfo.lastName);

        this.setState({
          loading: false,
          userInfo,
          statistics,
          daily,
          detail,
        });
      }
    }).catch((err) => {
      console.log(err);
    });
  }

  componentWillUnmount() {
    this._unmount = false;
  }

  // 按日期查询推广数据
  handleChangeDate = (result) => {
    const { start, end } = result;
    const starts = start || getTime(getDaysTime(90));
    const ends = end || getTime(new Date().getTime(), 'end');
    Promise.all([
      httpResponse('/api/index/statistics/daily', {
        start: starts,
        end: ends,
      }),
      httpResponse('/api/index/statistics/detail', {
        start: starts,
        end: ends,
        page: 1,
        size: PAGE_SIZE,
      }),
    ]).then((response) => {
      const [daily, detail] = response;
      this.setState({
        daily,
        detail,
        timer: {
          start,
          end,
        },
      });
    });
  };

  render() {
    const { history } = this.props;
    const {
      loading, userInfo, statistics, detail, daily, timer,
    } = this.state;
    return (
      <MainContainer margin={[44, 0, 40]}>
        {
          loading
            ? <div style={{ minHeight: 500 }}>loading。。。。</div>
            : (
              <>
                <HomeHeader data={userInfo} history={history} />
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
        }
      </MainContainer>
    );
  }
}

Home.propTypes = {
  history: PropTypes.objectOf(PropTypes.object).isRequired,
  userStore: PropTypes.objectOf(PropTypes.object).isRequired,
};

export default Home;
