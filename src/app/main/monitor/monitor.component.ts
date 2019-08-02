import { Component, OnInit, OnDestroy } from '@angular/core';
import { $WebSocket } from 'angular2-websocket/angular2-websocket';
import * as _ from "lodash";

// 接口
import { TrainService } from "../../../api/train.service";

// 方法
import { getWsParam } from "../../../utils/wsparam";
import { handleWebsocketData } from "../../../utils/data-disposal";
import { filterTrain } from "../../../utils/filter";

@Component({
  selector: 'app-monitor',
  templateUrl: './monitor.component.html',
  styleUrls: ['./monitor.component.scss']
})

export class MonitorComponent implements OnInit, OnDestroy {

  // 面包屑导航
  navlist: Array<any> = [];

  // websocket 地址
  ws = new $WebSocket('ws://139.9.53.159:60609/websocket/web');

  // 在线离线数
  onlineCount: Number = 0;
  totalCount: Number = 0;

  // 符合条件的列车数
  searchContent: String = "";
  searchLength: Number = 1;

  // 列车
  trainList: Array<any> = [{ name: "1" }];

  constructor(
    public trainService: TrainService
  ) {
    // 面包屑导航
    this.navlist = [{ name: "实时监视", url: "/home" }];
  }

  ngOnInit() {

    // 获取所有列车
    this.trainService.get_train_list({
      basicLineId: 13
    }).then(res => {

      // 数据处理
      res.list.forEach(item => {
        item.mile = 0;
        item.speed = 0;
        item.voltage = 0;
        item.energy = 0;
        item.level = 0;
        item.online = false;
        item.show = true;
      });

      // 统计
      this.trainList = res.list;
      this.totalCount = this.trainList.length;

      // 获取 websocket 数据
      this.getWsData();
    })
  }

  // 获取 websocket 数据
  getWsData() {

    // 组装车号
    const trainnoList = [];
    this.trainList.forEach(item => {
      trainnoList.push(item.trainLocono);
    });

    // 参数
    const param = JSON.stringify(getWsParam(trainnoList));

    // 发送请求
    this.ws.send(param).subscribe(
      (msg) => {
        console.log('next', msg.data);
      },
      (msg) => {
        console.log('error', msg);
      },
      () => {
        console.log('complete');
      }
    );

    // 接收数据
    this.ws.getDataStream().subscribe(
      (msg) => {

        // 数据处理
        const data = handleWebsocketData(JSON.parse(msg.data), this.trainList);
        this.trainList = data;

        // 在线列车数
        const onlineTrainCount = _.filter(data, ["online", true]).length;
        this.onlineCount = onlineTrainCount;

        // 符合搜索条件的列车数
        this.searchLength = _.filter(this.trainList, ["show", true]);
      },
      (msg) => {
        console.log('error', msg);
      },
      () => {
        console.log('complete');
      }
    );
  }

  // 搜索列车
  onSearch() {
    this.trainList = filterTrain(
      this.searchContent,
      this.trainList
    );
    this.searchLength = _.filter(this.trainList, ["show", true]);
  }

  ngOnDestroy() {
    // 关闭当前的 websocket 请求
    this.ws.close(true);
  }

}
