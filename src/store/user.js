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
    const userInfo = session.getSession('userInfo');
    this.isLogin = loginInfo ? loginInfo.isLogin : false; // 默认登录状态为 false;
    this.userName = userName || '';
    this.userPhoto = userPhoto || '';
    this.userInfo = userInfo || null;
  }

  @action setLoginInfo(isLogin, loginInfo) {
    this.isLogin = isLogin;
    if (isLogin) {
      const {
        photo, firstName, token,
      } = loginInfo;
      this.selUserPhoto(photo);
      this.selUserName(firstName);
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

  @action loginUseInfo(info) {
    if (info) {
      session.setSession('userInfo', info);
    } else {
      session.remove('userInfo');
    }
    this.userInfo = info;
  }
}

export default User;
