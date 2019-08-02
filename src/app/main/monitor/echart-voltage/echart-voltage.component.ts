import { Component, OnInit, OnChanges, Input } from "@angular/core";
import * as moment from 'moment';

@Component({
  selector: "app-echart-voltage",
  templateUrl: "./echart-voltage.component.html",
  styleUrls: ["./echart-voltage.component.scss"]
})

export class EchartVoltageComponent implements OnInit, OnChanges {

  @Input() trainData;

  // echart 数据
  options: any;
  xlabelData: Array<any> = [0, 0, 0, 0, 0];
  ylabelData: Array<any> = [0, 0, 0, 0, 0];

  constructor() { }

  ngOnInit() {

  }

  ngOnChanges() {

    if (this.trainData) {

      // 将时间和网压存放到数组中
      this.xlabelData.push(moment(this.trainData["timestamp"]).format("YYYY-MM-DD HH-mm"));
      this.ylabelData.push(this.trainData["sys1_s31"]);

      // 选取前6条数据
      if (this.xlabelData.length > 6) {
        this.xlabelData.splice(0, 1);
      }
      if (this.ylabelData.length > 6) {
        this.ylabelData.splice(0, 1);
      }
    }

    // 刷新 echart
    this.initChart();
  }

  // 刷新 echart
  initChart() {
    this.options = {
      color: "#eee",
      tooltip: {
        trigger: "axis"
      },
      grid: {
        left: "3%",
        right: "3%",
        top: "5%",
        bottom: "5%",
        containLabel: true
      },
      xAxis: {
        type: "category",
        boundaryGap: false,
        data: this.xlabelData,
        show: false
      },
      yAxis: [{
        type: "value",
        splitLine: {
          // 网格线
          show: true, // false隐藏
          lineStyle: {
            type: "dashed",
            color: "#E9E9E9"
          }
        },
        axisLabel: {
          show: true,
          textStyle: {
            fontSize: 16, // y轴字体大小
            color: "#000" // y轴字体颜色
          }
        },
        axisLine: {
          lineStyle: {
            color: "#fff"
          }
        }
      }],
      series: [{
        name: "当前网压",
        type: "line",
        showSymbol: false,
        smooth: true,
        itemStyle: {
          normal: {
            lineStyle: {
              // width: 0.3,           // 折线宽度
              color: "#597ef7" // 折线颜色
            }
          }
        },
        data: this.ylabelData
      }]
    }
  }
}
