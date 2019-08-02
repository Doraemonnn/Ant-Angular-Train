import { Injectable } from '@angular/core';
import { UserInfo } from '../model/userinfo.model';

@Injectable()  // 注入服务
export class UserInfoService {

  private userInfo;

  constructor() {
    this.userInfo = new UserInfo();
  }

  // 设置用户信息
  setUserInfo(data) {
    this.userInfo.userName = data;
  }

  // 获取用户信息
  getUserInfo() {
    return this.userInfo;
  }
}