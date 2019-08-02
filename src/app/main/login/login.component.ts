import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';

// 接口
import { TrainService } from "../../../api/train.service";

// 服务
import { UserInfoService } from "../../../service/userinfo.service";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})

export class LoginComponent implements OnInit {

  constructor(
    private fb: FormBuilder,
    public trainService: TrainService,
    private router: Router,
    private userInfoService: UserInfoService
  ) {
  }

  validateForm: FormGroup;

  ngOnInit(): void {
    // 表单验证
    this.validateForm = this.fb.group({
      userName: [null, [Validators.required]],
      password: [null, [Validators.required]]
    });
  }

  // 提交表单
  submitForm(): void {

    // 表单校验的标识
    let validate = true;

    for (const i in this.validateForm.controls) {
      this.validateForm.controls[i].markAsDirty();
      this.validateForm.controls[i].updateValueAndValidity();

      // 表单校验的标识
      validate = validate && this.validateForm.controls[i].valid;
    }

    // 请求登录接口
    if (validate) {
      this.trainService.login({
        username: this.validateForm.value.userName,
        password: "jtOR5xZKqGY4IDZ7/qJjgbpn3PsOIZr11Ai+gD0kViy7e3eHhUZ10n/wqS+hBcIBeVoqgD6p42ttlxYJNGt1PxltQkN7/0lmOPYC7Td7kCiz/ghtms4XN++cALvXtCfNH5/ll5iOZMoodMuonFu5CJun0xzPsZxTLTVTpwUgIhw=",
        rememberMe: "false"
      }).then(res => {

        // 获取用户信息
        this.trainService.get_user_info(res.data.access_token).then(res => {

          // 将用户信息保存到服务中
          this.userInfoService.setUserInfo(res.data.userRealname);

          // 跳转到首页
          this.router.navigate(['home']);
        })
      })
    }
  }
}
