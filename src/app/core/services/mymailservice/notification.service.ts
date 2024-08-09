import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../../../environments/environments';
import { Notification } from '../../../main/models/mymailmodel/notification.model';
import { AccountModel } from '../../../main/models/Accountmodel/accountmodel.model';


@Injectable({
  providedIn: 'root'
})
export class NotificationService {
  private apiUrl = environment.apiUrl + "notifications/notifications/user/";

  constructor(private httpClient: HttpClient) {}

  // Method to get unread notifications
  getNotificationUnread(userId: string): Observable<Notification[]> {
    const url = `${this.apiUrl}${userId}/unread`;
    return this.httpClient.get<Notification[]>(url);
  }

  // Method to get account information
  getAccount(): Observable<AccountModel> {
    const userId = localStorage.getItem('userId');
    const url = `${environment.apiUrl}me/${userId}`;
    return this.httpClient.get<AccountModel>(url);
  }
}
