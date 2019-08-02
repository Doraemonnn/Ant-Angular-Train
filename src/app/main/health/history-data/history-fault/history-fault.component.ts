import { Component, OnInit } from '@angular/core';

// 接口
import { TrainService } from "../../../../../api/train.service";

@Component({
  selector: 'app-history-fault',
  templateUrl: './history-fault.component.html',
  styleUrls: ['./history-fault.component.scss']
})

export class HistoryFaultComponent implements OnInit {

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
    this.navlist = [{ name: "历史故障", url: "/history-fault" }];
  }

  ngOnInit() {
    // 获取历史故障数据
    this.getData();
  }

  // 获取历史故障数据
  getData() {

    // 加载动画
    this.loading = true;

    // 参数
    const param = {
      orderBy: "fault_time",
      order: "desc",
      pagination: 1,
      pageNo: this.pageIndex,
      pageSize: this.pageSize,
      paramap: {
        train_type: "",
        fault_time: "2019-07-23 00:00:00,2019-07-23 23:59:59",
        line_name: "",
        train_no: "",
        fault_level: "",
        fault_name: "FUZZY_%%",
        train_coach: "",
        fault_code: "FUZZY_%%",
        fault_status: "",
        fault_type_group: ""
      }
    };

    // 请求接口
    this.trainService.get_history_fault_data(param).then(res => {
      if (res.bodyData) {

        // 停止加载动画
        this.loading = false;

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
