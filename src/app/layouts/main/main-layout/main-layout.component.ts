import { Component } from '@angular/core';
import { MainHeaderComponent } from "../main-header/main-header.component";
import { RouterOutlet } from '@angular/router';
import { MainFooterComponent } from "../main-footer/main-footer.component";

@Component({
  selector: 'app-main-layout',
  standalone: true,
  imports: [MainHeaderComponent,
    RouterOutlet, 
    MainFooterComponent
  ],
  templateUrl: './main-layout.component.html',
  styleUrl: './main-layout.component.scss'
})
export class MainLayoutComponent {

}
