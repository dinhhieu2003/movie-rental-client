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
import { CategoryService } from '../../../core/services/main/category.service';
import { error } from 'console';

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
  categories: any[] = [];

  constructor(private jwtService: JwtService, 
    private authService: AuthService,
    private router: Router,
    private categoryService: CategoryService,
  ) {}

  ngOnInit(): void {
    this.isAuthenticated = !!this.jwtService.getToken();
    this.currentUsername = this.jwtService.getUserInfo().FullName;
    this.categoryService.getAllCategory().subscribe({
      next: (response) => {
        this.categories = response.Data.content;
        this.categories.forEach((value) => {
          console.log(this.convertCategoryNameToSlug(value.categoryName));
          localStorage.setItem(this.convertCategoryNameToSlug(value.categoryName), value.id);
        })
      },
      error: (error) => {
        console.error(error);
      }
    })
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

  convertCategoryNameToSlug(cateName: string) {
    let slugName = cateName.toLowerCase().replace(/ /g, '-');
    return slugName;
  }
}
