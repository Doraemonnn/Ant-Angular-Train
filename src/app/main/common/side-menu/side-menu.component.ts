import { Component, OnInit, Input } from '@angular/core';
import { RouteData } from "../../../app-routes-data";

@Component({
  selector: 'app-side-menu',
  templateUrl: './side-menu.component.html',
  styleUrls: ['./side-menu.component.scss']
})

export class SideMenuComponent implements OnInit {

  // 展开收起
  @Input() isCollapsed;

  // 菜单
  menuList: Array<any> = [];

  ngOnInit() {
    RouteData.forEach((item) => {
      if (item.children) {
        this.menuList = item.children;
      }
    })
  }

}
