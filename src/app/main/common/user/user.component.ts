import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

// 服务
import { UserInfoService } from "../../../../service/userinfo.service";

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.scss']
})

export class UserComponent implements OnInit {

  constructor(
    private router: Router,
    private userInfoService: UserInfoService
  ) { }

  userName: String = '未登录';

  ngOnInit(): void {
    // 获取用户信息
    if (this.userInfoService.getUserInfo().userName) {
      this.userName = this.userInfoService.getUserInfo().userName;
    }
  }

  // 退出登录
  handleLogOut() {
    // 清除用户信息
    this.userInfoService.setUserInfo("");

    // 跳转到登录页
    this.router.navigate(['login']);
  }

}
