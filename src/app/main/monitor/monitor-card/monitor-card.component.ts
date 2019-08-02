import { Component, OnInit, Input } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-monitor-card',
  templateUrl: './monitor-card.component.html',
  styleUrls: ['./monitor-card.component.scss']
})

export class MonitorCardComponent implements OnInit {

  // 单辆列车的数据
  @Input() item;

  constructor(
    private router: Router,
  ) {

  }

  ngOnInit() {

  }

  // 跳转到列车详情页面
  toTrainDetail(item) {
    this.router.navigate(['/monitorDetail'], { queryParams: { 'traintype': item.ttypeName, 'trainno': item.trainLocono } });
  }

}
