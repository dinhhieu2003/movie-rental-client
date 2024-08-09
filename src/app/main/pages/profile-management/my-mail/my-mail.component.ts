import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NotificationService } from '../../../../core/services/mymailservice/notification.service';
import { Notification } from '../../../models/mymailmodel/notification.model';
import { AccountModel } from '../../../models/Accountmodel/accountmodel.model';
import { HttpErrorResponse } from '@angular/common/http';

@Component({
  selector: 'app-my-mail',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './my-mail.component.html',
  styleUrls: ['./my-mail.component.css']

})
export class MyMailComponent implements OnInit {
  notifications: Notification[] = [];
  account: AccountModel | null = null;

  constructor(private notificationService: NotificationService) {}

  ngOnInit(): void {
    this.loadNotifications();
    this.loadAccountInfo();
  }

  loadNotifications(): void {
    const userId = localStorage.getItem('userId');
    if (userId) {
      this.notificationService.getNotificationUnread(userId).subscribe({
        next: (data: Notification[]) => {
          this.notifications = data;
        },
        error: (err: HttpErrorResponse) => {
          console.error('Failed to fetch notifications:', err);
        }
      });
    } else {
      console.error('UserId not found in localStorage');
    }
  }

  loadAccountInfo(): void {
    this.notificationService.getAccount().subscribe({
      next: (account: AccountModel) => {
        this.account = account;
      },
      error: (err: HttpErrorResponse) => {
        console.error('Failed to fetch account info:', err);
      }
    });
  }
}

