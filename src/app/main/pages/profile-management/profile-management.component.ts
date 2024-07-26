import { Component } from '@angular/core';

import { CommonModule } from '@angular/common';
import { RouterModule, Router } from '@angular/router';
import { NzLayoutModule } from 'ng-zorro-antd/layout';
import { NzMenuModule } from 'ng-zorro-antd/menu';
import { NzIconModule } from 'ng-zorro-antd/icon';

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
  constructor(private router: Router) {}

  navigateHome(): void {
    this.router.navigate(['/']);
  }

  navigateToProfile(): void {
    this.router.navigate(['/profilemanagement/account']);
  }

  navigateToTransactionHistory(): void {
    this.router.navigate(['/profilemanagement/transaction-history']);
  }

  navigateToCart(): void {
    this.router.navigate(['/profilemanagement/cart']);
  }

  navigateToRentalList(): void {
    this.router.navigate(['/profilemanagement/rental-list']);
  }

  navigateToMailbox(): void {
    this.router.navigate(['/profilemanagement/mailbox']);
  }

  navigateToLoginDevices(): void {
    this.router.navigate(['/profilemanagement/login-devices']);
  }

  navigateToFavoriteMovies(): void {
    this.router.navigate(['/profilemanagement/favorite-movies']);
  }

  navigateToLogout(): void {
    this.router.navigate(['/profilemanagement/logout']);
  }
}

