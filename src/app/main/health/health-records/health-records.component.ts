import { Component, OnInit } from '@angular/core';

// 接口
import { TrainService } from "../../../../api/train.service";

@Component({
  selector: 'app-health-records',
  templateUrl: './health-records.component.html',
  styleUrls: ['./health-records.component.scss']
})

export class HealthRecordsComponent implements OnInit {

  // 面包屑导航
  navlist: Array<any> = [];

  // 加载动画
  loading: Boolean = true;

  // 数据
  pieList: Array<any> = [];
  healthList: Array<any> = [];

  constructor(
    public trainService: TrainService
  ) {
    // 面包屑导航
    this.navlist = [{ name: "健康档案", url: "/health-records" }];
  }

  ngOnInit() {
    // 获取数据
    this.trainService.get_train_health({
      lineNum: "13"
    }).then(res => {
      this.loading = false;
      this.pieList = res.map.pieList;
      this.healthList = res.map.trainList;
    })
  }

}