import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../../../environments/environments';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class NotificationService {
  private apiUrl = environment.apiUrl + "notifications/notifications/user/";
  constructor(private httpClient: HttpClient) { }

  getNotificationUnread(idUser: string): Observable<any> {
    let url = this.apiUrl + idUser + "/unread";
    return this.httpClient.get<any>(url);
  }

}
