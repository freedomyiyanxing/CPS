import { action, observable } from 'mobx';
import { session } from '../asstes/js/utils-methods';

class User {
  @observable isLogin;

  @observable userInfo;

  constructor() {
    // 读取 SessionStorage 存储的登录信息
    const loginInfo = session.getSession('loginInfo');
    const userInfo = session.getSession('userInfo');
    this.isLogin = loginInfo ? loginInfo.isLogin : false; // 默认登录状态为 false;
    this.userInfo = userInfo || null; // 默认用户信息为 null;
  }

  // 修改登录信息
  @action setLogin(loginInfo) {
    this.isLogin = loginInfo;
  }

  // 修改用户信息
  @action setUserInfo(userInfo) {
    this.userInfo = userInfo;
  }
}

export default User;
