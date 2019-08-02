import { Component, OnInit } from '@angular/core';
import * as moment from 'moment';

// 接口
import { TrainService } from "../../../api/train.service";

@Component({
  selector: 'app-version',
  templateUrl: './version.component.html',
  styleUrls: ['./version.component.scss']
})

export class VersionComponent implements OnInit {

  // 面包屑导航
  navlist: Array<any> = [];

  // 表格数据
  pageIndex = 1;
  pageSize = 10;
  total = 1;
  tableData: Array<any> = [];
  loading = true;

  // 弹框、详细版本信息
  isVisible = false;
  versionLogData: Array<any> = [];

  constructor(
    public trainService: TrainService
  ) {
    // 面包屑导航
    this.navlist = [{ name: "版本管理", url: "/version" }];
  }

  ngOnInit() {
    // 获取版本管理数据
    this.getData();
  }

  // 获取版本管理数据
  getData() {

    // 加载动画
    this.loading = true;

    // 参数
    const param = {
      orderBy: "module_name,version_content",
      order: "asc",
      pagination: 1,
      pageNo: this.pageIndex,
      pageSize: this.pageSize,
      paramap: {
        train_no: ""
      }
    };

    // 请求接口
    this.trainService.get_version_list(param).then(res => {
      if (res.bodyData) {

        // 停止加载动画
        this.loading = false;

        // 数据处理
        res.bodyData.forEach((item, index) => {
          // 状态
          item.versionStatus = item.status === true ? "正常" : "异常";

          // 时间戳转换
          item.createtime = moment(item.createtime).format(
            "YYYY-MM-DD HH-mm"
          );
        })

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

  // 查看版本记录
  seeVersion(e) {
    // 组装参数
    const newParam = {
      line_name: e.line_name,
      module_name: e.module_name,
      train_coach: e.train_coach,
      train_no: e.train_no,
      train_type: e.train_type,
      version_content: e.version_content
    };

    // 查询单条版本记录
    this.trainService.get_version_single(newParam).then(res => {
      this.isVisible = true;
      this.versionLogData = res.list;
    });
  }
}
