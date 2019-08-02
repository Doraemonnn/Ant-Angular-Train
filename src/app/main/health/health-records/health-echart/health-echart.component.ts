import { Component, OnInit, OnChanges, Input } from '@angular/core';
import * as _ from "lodash";

@Component({
  selector: 'app-health-echart',
  templateUrl: './health-echart.component.html',
  styleUrls: ['./health-echart.component.scss']
})

export class HealthEchartComponent implements OnInit, OnChanges {

  @Input() pieList;

  // echart 数据
  options: any;
  legendData: any;

  constructor() {

  }

  ngOnInit() {

  }

  ngOnChanges() {
    // 显示 echart
    this.initChart(this.pieList);
  }

  // 显示 echart
  initChart(e) {
    // 图例
    this.legendData = [{
      value: _.filter(e, ["healthStatus", "0"])[0] ? _.filter(e, ["healthStatus", "0"])[0].trainNum : 0,
      name: "健康列车"
    },
    {
      value: _.filter(e, ["healthStatus", "1"])[0] ? _.filter(e, ["healthStatus", "1"])[0].trainNum : 0,
      name: "亚健康列车"
    },
    {
      value: _.filter(e, ["healthStatus", "2"])[0] ? _.filter(e, ["healthStatus", "2"])[0].trainNum : 0,
      name: "故障列车"
    }
    ];

    this.options = {
      color: ["#52c41a", "#fabc16", "#ff8000", "#f5222d"],
      tooltip: {
        trigger: "item",
        formatter: "{a} <br/>{b}: {c} ({d}%)"
      },
      legend: {
        orient: "vertical",
        icon: "circle",
        x: "center",
        bottom: "8%",
        itemWidth: 10,
        itemHeight: 10,
        data: ["健康列车", "预警列车", "亚健康列车", "故障列车"],
        textStyle: {
          color: "#444",
          fontSize: 16
        }
      },
      graphic: {
        // 在饼状图的中间添加文字
        type: "text",
        left: "center", // left:'center',
        top: "33%",
        z: 2,
        zlevel: 100,
        style: {
          text: "健康状况",
          textAlign: "center",
          fill: "#555",
          fontWeight: "bold",
          fontSize: "22"
        }
      },
      series: [{
        name: "列车健康状态",
        type: "pie",
        radius: ["40%", "55%"],
        center: ["50%", "36%"],
        avoidLabelOverlap: false,
        label: {
          normal: {
            show: false,
            position: "center"
          },
          emphasis: {
            show: false,
            textStyle: {
              fontSize: "30",
              fontWeight: "bold"
            }
          }
        },
        labelLine: {
          normal: {
            show: false
          }
        },
        data: this.legendData,
        itemStyle: {
          normal: {
            borderColor: "#fff",
            borderWidth: 3 // 白色间隙
          }
        }
      }]
    }
  }

}