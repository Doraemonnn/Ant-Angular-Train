import { Injectable } from '@angular/core';
import { CanActivate, Router, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { UserInfoService } from './userinfo.service';

@Injectable()
export class LoginGuard implements CanActivate {

  constructor(
    private router: Router,
    private userInfoService: UserInfoService
  ) {
  }

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean {

    // 判断用户是否登录
    let isLogin: boolean;

    // 判断用户是否登入
    const userinfo = this.userInfoService.getUserInfo().userName;

    if (!userinfo) {

      // 未登录
      isLogin = false;

      // 未登入跳转到登入界面
      this.router.navigateByUrl('/login');

    } else {

      // 已登录
      isLogin = true;
    }

    return isLogin;
  }
}