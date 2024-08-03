import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../../environments/environments';
import { LoginRequest } from '../models/LoginRequest.model';
import { Observable } from 'rxjs';
import { BaseResponse } from '../models/BaseResponse.model';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private apiUrl = environment.apiUrl + "auth";
  constructor(private readonly httpClient: HttpClient) { }

  login(loginRequest: LoginRequest): Observable<BaseResponse> {
    let url: string = this.apiUrl + "/login";
    return this.httpClient.post<BaseResponse>(url, loginRequest);
  }

}
