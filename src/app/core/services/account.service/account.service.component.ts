import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { environment } from '../../../../environments/environments'; 
import { AccountModel } from '../../models/Account.model';

@Injectable({
  providedIn: 'root'
})
export class AccountService {
  private apiUrl = `${environment.apiUrl}me`; 
  private passwordApiUrl = `${environment.apiUrl}password`; // Địa chỉ API đổi mật khẩu

  constructor(private readonly httpClient: HttpClient) {}

  // Lấy thông tin tài khoản
  getAccount(): Observable<AccountModel> {
    return this.httpClient.get<{ Data: AccountModel }>(this.apiUrl).pipe(
      map(response => response.Data),
      catchError(this.handleError)
    );
  }

  // Cập nhật thông tin tài khoản
  updateAccount(account: AccountModel): Observable<any> {
    return this.httpClient.put<any>(this.apiUrl, account).pipe(
      catchError(this.handleError)
    );
  }

  // Đổi mật khẩu
  changePassword(oldPassword: string, newPassword: string): Observable<any> {
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${localStorage.getItem('authToken')}`,
      'Content-Type': 'application/json'
    });
    const body = {
      PasswordOld: oldPassword,
      PasswordNew: newPassword,
      PasswordConfirm: newPassword
    };
    return this.httpClient.put<any>(this.passwordApiUrl, body).pipe(
      catchError(this.handleError)
    );
  }

  private handleError(error: HttpErrorResponse) {
    console.error('An error occurred:', error.message);
    return throwError('Something went wrong; please try again later.');
  }
}
