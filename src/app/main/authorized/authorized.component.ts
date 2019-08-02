import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { UserInfoService } from '../../../service/userinfo.service';

@Component({
  selector: 'app-authorized',
  templateUrl: './authorized.component.html',
  styleUrls: ['./authorized.component.scss']
})

export class AuthorizedComponent {

  constructor(
    private router: Router,
    private userInfoService: UserInfoService
  ) { }

  // 点击事件
  handleClick() {
    // 清除用户信息
    this.userInfoService.setUserInfo("");

    // 跳转到登录页
    this.router.navigate(['login']);
  }

}
