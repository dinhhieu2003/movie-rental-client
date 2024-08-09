import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { NzLayoutModule } from 'ng-zorro-antd/layout';
import { NzMenuModule } from 'ng-zorro-antd/menu';
import { NzIconModule, NzIconService } from 'ng-zorro-antd/icon';
import { HomeOutline, UserOutline, HistoryOutline, ShoppingCartOutline, VideoCameraOutline, MailOutline, DesktopOutline, HeartOutline, LogoutOutline, FileTextOutline, UnorderedListOutline, TabletOutline,  } from '@ant-design/icons-angular/icons';

@Component({
  selector: 'app-profile-management',
  standalone: true,
  imports: [
    CommonModule,
    RouterModule,
    NzLayoutModule,
    NzMenuModule,
    NzIconModule,
  ],
  templateUrl: './profile-management.component.html',
  styleUrls: ['./profile-management.component.css']
})
export class ProfileManagementComponent {
  constructor(private router: Router, private iconService: NzIconService) {
    this.iconService.addIcon(
      HomeOutline,
      UserOutline,
      HistoryOutline,
      ShoppingCartOutline,
      VideoCameraOutline,
      MailOutline,
      DesktopOutline,
      HeartOutline,
      LogoutOutline,
      FileTextOutline,
      UnorderedListOutline,
      TabletOutline
    );
  }

  navigateHome(): void {
    this.router.navigate(['/']);
  }

  navigateToProfile(): void {
    this.router.navigate(['/me/account']);
  }

  navigateToTransactionHistory(): void {
    this.router.navigate(['/me/transaction-history']);
  }

  navigateToCart(): void {
    this.router.navigate(['/me/cart']);
  }

  navigateToRentalList(): void {
    this.router.navigate(['/me/rental-list']);
  }

  navigateToMailbox(): void {
    this.router.navigate(['/me/mailbox']);
  }

  navigateToLoginDevices(): void {
    this.router.navigate(['/me/login-devices']);
  }

  navigateToFavoriteMovies(): void {
    this.router.navigate(['/me/favorite-movies']);
  }

  navigateToLogout(): void {
    this.router.navigate(['/me/logout']);
  }
}
