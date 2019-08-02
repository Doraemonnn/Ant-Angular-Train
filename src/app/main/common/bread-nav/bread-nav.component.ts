import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-bread-nav',
  templateUrl: './bread-nav.component.html',
  styleUrls: ['./bread-nav.component.scss']
})

export class BreadNavComponent {

  @Input() navlist;

}
