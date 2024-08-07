import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../../environments/environments';
import { LoginRequest } from '../models/LoginRequest.model';
import { Observable } from 'rxjs';
import { BaseResponse } from '../models/BaseResponse.model';
import { JwtService } from './jwt.service';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private apiUrl = environment.apiUrl + "auth";
  constructor(private readonly httpClient: HttpClient,
    private jwtService: JwtService
  ) { }

  login(loginRequest: LoginRequest): Observable<BaseResponse> {
    let url: string = this.apiUrl + "/login";
    return this.httpClient.post<BaseResponse>(url, loginRequest);
  }

  logout() {
    this.jwtService.removeToken();
    this.jwtService.removeUserInfo();
  }
  acceptResetPassword2(userId: string, codeStr: string): Observable<BaseResponse> {
    let url: string = this.apiUrl + "/forgot-password/" + userId;
    return this.httpClient.put<BaseResponse>(url, { code: codeStr });
  }
  sendResetCodeToEmai1(email: string, newPassword: string, newPasswordComfirm: string): Observable<BaseResponse> {
    let url: string = this.apiUrl + "/forgot-password";
    return this.httpClient.put<BaseResponse>(url, {
      Email: email,
      Password: newPassword,
      PasswordConfirm: newPasswordComfirm
    });
  }
  sendcreateCodeToEmail1(email:string,newPassword:string,newPasswordComfirm:string): Observable<BaseResponse> {
    console.log(email,newPassword,newPasswordComfirm);
    let url: string = this.apiUrl + "/register";
    return this.httpClient.post<BaseResponse>(url, {
      Email: email,
      Password: newPassword,
      PasswordConfirm: newPasswordComfirm,
      FullName: "Tên Mặc Định là Tên Mặc Định là"
    });
  }
  acceptCreateAccount(userId:string,codeStr:string): Observable<BaseResponse> {
    console.log("code chuẩn bị gửi=",codeStr);
   
    let url: string = this.apiUrl + "/register/"+userId;
    return this.httpClient.post<BaseResponse>(url, { Code: codeStr});
  }
}
