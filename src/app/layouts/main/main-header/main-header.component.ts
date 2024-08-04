import { Component, ElementRef, OnInit, viewChild } from '@angular/core';
import { NzMenuModule } from 'ng-zorro-antd/menu';
import { NzGridModule } from 'ng-zorro-antd/grid';
import { NzBadgeModule } from 'ng-zorro-antd/badge';
import { NzDrawerModule, NzDrawerPlacement } from 'ng-zorro-antd/drawer';
import { Router, RouterLink } from '@angular/router';
import { JwtService } from '../../../core/services/jwt.service';
import { NzDropDownModule } from 'ng-zorro-antd/dropdown';
import { NzIconModule } from 'ng-zorro-antd/icon';
import { AuthService } from '../../../core/services/auth.service';

@Component({
  selector: 'app-main-header',
  standalone: true,
  imports: [NzMenuModule, NzGridModule, 
    NzBadgeModule,
    NzDrawerModule,
    RouterLink,
    NzDropDownModule,
    NzIconModule
  ],
  templateUrl: './main-header.component.html',
  styleUrl: './main-header.component.scss',
  host: {ngSkipHydration: 'true'},
})
export class MainHeaderComponent implements OnInit{
  visible = false;
  placement: NzDrawerPlacement = 'right';
  isAuthenticated: boolean = false;
  currentUsername: string | null = "";

  constructor(private jwtService: JwtService, 
    private authService: AuthService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.isAuthenticated = !!this.jwtService.getToken();
    this.currentUsername = this.jwtService.getUserInfo().FullName;
  }

  openMenu(): void {
    this.visible = true;
  }

  closeMenu(): void {
    this.visible = false;
  }

  logout() {
    this.authService.logout();
    this.isAuthenticated = false;
    this.router.navigate(["home"]);
  }
}
