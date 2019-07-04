/* eslint-disable */
import React from 'react';

import MainContainer from '../../common/box-container/main-container';
import HomeHeader from './home-utils/home-header';
import HomeCurve from './home-utils/home-curve';
import HomeDetail from './home-utils/home-detail';
import { Consumer } from '../../context/index';
import { cookies } from '../../asstes/js/utils-methods';

import { get } from '../../asstes/http/index';

import {
  accountData, statisticsTbs, daily, details,
} from '../../../data/data';

// 模拟数据
const obj = {
  userName: 'freedom.yi',
  userPhoto: 'https://cdn.influmonsters.com/fit-in/250x313/filters:fill(fff)/upload/image/product/desktop/2018/09/27/f5ee73fa-437c-49f7-ada5-39c59dbd1795.jpg',
};

class Home extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      loading: true,
      userInfo: null,
    };
    this.consumer = null;
  }

  componentDidMount() {
    setTimeout(() => {
      get('/api/index/userInfo')
        .then((response) => {
          console.log(response);
          this.setState({
            loading: false,
            userInfo: obj,
          });
          this.consumer.getUserInfo(obj);
          console.log(this.consumer)
          // setUseInfo(obj);
          // setLoading(false)
          cookies.setCookie('userInfo', JSON.stringify(obj));
        })
        .catch((err) => {
          console.log('err: ', err);
        });
    }, 1000);

    // get('/api/index/statistics', {start: '1556696480511', end: '1562226098999'})
    //   .then((response) => {
    //     console.log(response)
    //   })
    //   .catch((err) => {
    //     console.log('err: ', err);
    //   });
    //
    // //{start: 1560413388221, end: 1560931788221}
    // get('/api/index/statistics/detail', {
    //   start: '1560413388221',
    //   end: '1560931788221',
    //   page: 0,
    //   size: 10,
    // }).then((response) => {
    //     console.log(response)
    //   })
    //   .catch((err) => {
    //     console.log('err: ', err);
    //   })
  }

  render() {
    const { loading, userInfo } = this.state;
    return (
      loading
        ? <div>loading。。。。</div>
        : (
          <Consumer ref={this.consumer}>
            {
              context => {
                this.consumer = context;
                return (
                  <MainContainer margin={[44, 0, 40]}>
                    <HomeHeader data={accountData} />
                    <HomeCurve data={[statisticsTbs, daily]} />
                    <HomeDetail data={details} />
                  </MainContainer>
                )
              }
            }
          </Consumer>
        )
    );
  }
}

export default Home;
