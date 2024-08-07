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
import { CartService } from '../../../core/services/main/cart.service';
import { NotificationService } from '../../../core/services/main/notification.service';
import { Category } from '../../../main/models/category';
import { BehaviorSubject } from 'rxjs';

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
  categories: Category[] = [];
  cartQuantity: number = 0;
  notificationQuantity: number = 0;

  constructor(private jwtService: JwtService, 
    private authService: AuthService,
    private router: Router,
    private categoryService: CategoryService,
    private cartService: CartService,
    private notificationService: NotificationService,
  ) {}

  ngOnInit(): void {
    this.getCategories();
    this.getCartQuantity();
    this.getNotificationQuantity();
  }

  checkAuthenticated(): boolean {
    return !!this.jwtService.getToken();
  }

  getCurrentFullName(): string | null {
    return this.jwtService.getUserInfo().FullName;
  }

  getNotificationQuantity() {
    let id = localStorage.getItem("IdUser");
    if(id) {
      this.notificationService.getNotificationUnread(id).subscribe({
        next: (response) => {
          this.notificationQuantity = response.length;
        }
      })

    }
  }

  getCartQuantity() {
    this.cartService.getCart().subscribe({
      next: (response) => {
        this.cartQuantity = response.Data.films.length;
      },
      error: (error) => {
        console.error(error);
      }
    })
  }

  getCategories() {
    this.categoryService.getAllCategory().subscribe({
      next: (response) => {
        console.log(response);
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
    this.router.navigate(["home"]);
  }

  convertCategoryNameToSlug(cateName: string) {
    let slugName = cateName.toLowerCase().replace(/ /g, '-');
    return slugName;
  }
}
