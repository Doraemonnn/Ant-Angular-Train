import { Injectable } from '@angular/core';
import { HttpInterceptorService } from '../service/http.service';
import { ConfigService } from '../service/config.service';

@Injectable()
export class TrainService {

  constructor(
    private httpInterceptorService: HttpInterceptorService,
    private configService: ConfigService
  ) { }

  // 登录
  login(params) {
    return this.httpInterceptorService.request({
      method: 'POST',
      url: this.configService.hmvcUrl + '/auth/login',
      data: params,
    });
  }

  // 获取用户信息
  get_user_info(token) {
    return this.httpInterceptorService.request({
      method: 'POST',
      url: this.configService.hmvcUrl + '/uaa/api/users/get-by-name/admin',
      params: {
        token
      }
    });
  }

  // 获取车辆列表
  get_train_list(params) {
    return this.httpInterceptorService.request({
      method: 'POST',
      url: this.configService.hmvcUrl + '/mdatasvc/api/trains/getAll',
      data: params,
    });
  }

  // 获取列车健康状况
  get_train_health(params) {
    return this.httpInterceptorService.request({
      method: 'POST',
      url: this.configService.hmvcUrl + '/hmsvc/api/emergencyEvent/findTrainHealthy?lineNum=13',
      data: params,
    });
  }

  // 获取历史故障数据
  get_history_fault_data(params) {
    return this.httpInterceptorService.request({
      method: 'POST',
      url: this.configService.sshsubwayUrl + '/sshsubway/faultRecord/pageMVBRecord',
      data: params,
    });
  }

  // 获取历史寿命数据
  get_history_life_data(params) {
    return this.httpInterceptorService.request({
      method: 'POST',
      url: this.configService.hmvcUrl + '/hmsvc/api/devices/status/train/list',
      data: params,
    });
  }

  // 获取版本管理数据
  get_version_list(params) {
    return this.httpInterceptorService.request({
      method: 'POST',
      url: this.configService.hmvcUrl + '/hmsvc/api/version/pageTrainDetailStatusRecord',
      data: params,
    });
  }

  // 查询单条版本记录
  get_version_single(params) {
    return this.httpInterceptorService.request({
      method: 'POST',
      url: this.configService.hmvcUrl + '/hmsvc/api/version/findHistoryVersion',
      data: params,
    });
  }

}