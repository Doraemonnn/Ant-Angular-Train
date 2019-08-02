import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-health-list',
  templateUrl: './health-list.component.html',
  styleUrls: ['./health-list.component.scss']
})

export class HealthListComponent implements OnInit {

  @Input() healthList;

  // 点击的车号
  clickItem: String = "";

  constructor() {

  }

  ngOnInit() {

  }

  // 点击车号
  chooseTrain(item) {
    this.clickItem = item.trainNo;
  }

}