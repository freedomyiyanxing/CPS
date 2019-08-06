import { action, observable } from 'mobx';
import { session } from '../assets/js/utils-methods';

class User {
  @observable isLogin;

  @observable userInfo;

  @observable userName;

  @observable userPhoto;

  constructor() {
    const loginInfo = session.getSession('loginInfo');
    const userName = session.getSession('userName');
    const userPhoto = session.getSession('userPhoto');
    this.isLogin = loginInfo ? loginInfo.isLogin : false; // 默认登录状态为 false;
    this.userName = userName || '';
    this.userPhoto = userPhoto || '';
  }

  @action setLoginInfo(isLogin, loginInfo) {
    this.isLogin = isLogin;
    if (isLogin) {
      const {
        photo, firstName, lastName, token,
      } = loginInfo;
      this.selUserPhoto(photo);
      this.selUserName(firstName + lastName);
      session.setSession('loginInfo', { token, isLogin });
    } else {
      session.remove('loginInfo');
      session.remove('userName');
      session.remove('userPhoto');
      this.userPhoto = '';
      this.userName = '';
    }
  }

  @action selUserName(name) {
    this.userName = name;
    session.setSession('userName', this.userName);
  }

  @action selUserPhoto(photo) {
    this.userPhoto = photo;
    session.setSession('userPhoto', this.userPhoto);
  }
}

export default User;
