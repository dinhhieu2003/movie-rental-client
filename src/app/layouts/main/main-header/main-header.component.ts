import { Component, ElementRef, OnInit, viewChild } from '@angular/core';
import { NzMenuModule } from 'ng-zorro-antd/menu';
import { NzGridModule } from 'ng-zorro-antd/grid';
import { NzBadgeModule } from 'ng-zorro-antd/badge';
import { NzDrawerModule, NzDrawerPlacement } from 'ng-zorro-antd/drawer';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-main-header',
  standalone: true,
  imports: [NzMenuModule, NzGridModule, 
    NzBadgeModule,
    NzDrawerModule,
    RouterLink,
  ],
  templateUrl: './main-header.component.html',
  styleUrl: './main-header.component.scss',
  host: {ngSkipHydration: 'true'},
})
export class MainHeaderComponent{
  visible = false;
  placement: NzDrawerPlacement = 'right';

  openMenu(): void {
    this.visible = true;
  }

  closeMenu(): void {
    this.visible = false;
  }
}
