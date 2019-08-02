import { Component, OnInit } from '@angular/core';
import * as moment from 'moment';

// 接口
import { TrainService } from "../../../../../api/train.service";

@Component({
  selector: 'app-history-life',
  templateUrl: './history-life.component.html',
  styleUrls: ['./history-life.component.scss']
})

export class HistoryLifeComponent implements OnInit {

  // 面包屑导航
  navlist: Array<any> = [];

  // 表格数据
  pageIndex = 1;
  pageSize = 10;
  total = 1;
  tableData: Array<any> = [];
  loading = true;

  constructor(
    public trainService: TrainService
  ) {
    // 面包屑导航
    this.navlist = [{ name: "历史寿命", url: "/history-life" }];
  }

  ngOnInit() {
    // 获取历史寿命数据
    this.getData();
  }

  // 获取历史寿命数据
  getData() {

    // 加载动画
    this.loading = true;

    // 参数
    const param = {
      order: "desc",
      pageNo: this.pageIndex,
      orderBy: "update_time",
      pageSize: this.pageSize,
      paramap: {
        lineNo: "",
        trainNo: [],
        partName: "",
        trainType: "",
        trainCoach: "",
        lifelevel: "2",
        fromTime: 1532317367000,
        toTime: 1563853367000
      }
    };

    // 请求接口
    this.trainService.get_history_life_data(param).then(res => {
      if (res.bodyData) {

        // 停止加载动画
        this.loading = false;

        // 数据处理
        res.bodyData.forEach((item, index) => {

          item.key = index;

          // 时间戳转换
          item.serviceTime = moment(item.serviceTime).format("YYYY-MM-DD HH:mm:ss");

          // 使用情况
          item.usage = item.serviceValue + " / " + item.qualityValue + " (次) ";
        });

        // 获取表格数据
        this.tableData = res.bodyData;

        // 页数统计
        this.total = res.totalCount;
      }
    }).catch(error => {

      // 停止加载动画
      this.loading = false;
    });
  }

  // 改变当前页码
  changePageIndex() {
    this.getData();
  }

  // 改变每页条数
  changePageSize() {
    this.pageIndex = 1;
    this.getData();
  }
}
