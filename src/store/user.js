import { action, observable } from 'mobx';
import { session } from '../asstes/js/utils-methods';

class User {
  @observable isLogin;

  @observable userInfo;

  @observable userName;

  @observable userPhoto;

  constructor() {
    // 读取 SessionStorage 存储的登录信息
    const loginInfo = session.getSession('loginInfo');
    const userName = session.getSession('userName');
    const userPhoto = session.getSession('userPhoto');
    this.isLogin = loginInfo ? loginInfo.isLogin : false; // 默认登录状态为 false;
    this.userName = userName || '';
    this.userPhoto = userPhoto || '';
  }

  // 修改登录信息
  @action setLogin(loginInfo) {
    this.isLogin = loginInfo;
  }

  // 修改用户图像
  @action setUserPhoto(photo) {
    this.userPhoto = photo;
    session.setSession('userPhoto', photo);
  }

  // 修改用户名称
  @action setUserName(name) {
    this.userName = name;
    session.setSession('userName', name);
  }
}

export default User;
