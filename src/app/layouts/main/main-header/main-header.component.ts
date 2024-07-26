import { Component } from '@angular/core';
import { NzMenuModule } from 'ng-zorro-antd/menu';
import { NzButtonModule, NzButtonSize } from 'ng-zorro-antd/button';
import { NzGridModule } from 'ng-zorro-antd/grid';
import { NzBadgeModule } from 'ng-zorro-antd/badge';
import { NzPopoverModule } from 'ng-zorro-antd/popover';

@Component({
  selector: 'app-main-header',
  standalone: true,
  imports: [NzMenuModule, NzButtonModule, NzGridModule, 
    NzBadgeModule, NzPopoverModule,
  ],
  templateUrl: './main-header.component.html',
  styleUrl: './main-header.component.scss'
})
export class MainHeaderComponent {
  size: NzButtonSize = 'default';
  isActiveToggle: boolean = false;
  toggleMenu() {
    this.isActiveToggle = !this.isActiveToggle;
  }
}
