import { Component, OnInit, OnDestroy, Input } from "@angular/core";
import { ActivatedRoute } from "@angular/router";
import { $WebSocket } from "angular2-websocket/angular2-websocket";

// 方法
import { getWsParam } from "../../../../utils/wsparam";

@Component({
  selector: "app-monitor-detail",
  templateUrl: "./monitor-detail.component.html",
  styleUrls: ["./monitor-detail.component.scss"]
})

export class MonitorDetailComponent implements OnInit, OnDestroy {

  // 面包屑导航
  navlist: Array<any> = [];

  // websocket 地址
  ws = new $WebSocket("ws://139.9.53.159:60609/websocket/web");

  // 车型、车号
  trainType: String = "";
  trainNo: String = "";

  // 车辆数据
  trainData: any;

  constructor(public router: ActivatedRoute) { }

  ngOnInit () {

    this.router.queryParams.subscribe(params => {
      // 车型、车号
      this.trainType = params["traintype"];
      this.trainNo = params["trainno"];

      // 面包屑导航
      this.navlist = [{ name: "实时监视", url: "/home" }, { name: "列车详情", url: "" }, { name: this.trainNo, url: "" }];

      // 获取 websocket 数据
      this.getWsData();
    });
  }

  // 获取 websocket 数据
  getWsData () {
    // 参数
    const param = JSON.stringify(getWsParam([this.trainNo]));

    // 发送请求
    this.ws.send(param).subscribe(
      msg => {
        console.log("next", msg.data);
      },
      msg => {
        console.log("error", msg);
      },
      () => {
        console.log("complete");
      }
    );

    // 接收数据
    this.ws.getDataStream().subscribe(
      msg => {
        // 数据处理
        this.trainData = JSON.parse(msg.data)["value"]["data"][this.trainType + "_" + this.trainNo.slice(2, 4)];
      },
      msg => {
        console.log("error", msg);
      },
      () => {
        console.log("complete");
      }
    );
  }

  ngOnDestroy () {
    // 关闭当前的 websocket 请求
    this.ws.close(true);
  }
}
