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
}
