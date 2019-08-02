import { Component, TemplateRef, ViewChild } from '@angular/core';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.scss']
})

export class MainComponent {

  // 展开收起
  isCollapsed = false;

  // 左侧菜单
  triggerTemplate = null;

  // 展开收起按钮
  @ViewChild('trigger') customTrigger: TemplateRef<void>;

}
