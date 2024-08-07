import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environments';
import { JwtService } from './jwt.service';
import { BaseResponse } from '../models/BaseResponse.model';
import {User, UserFake} from '../models/UserModel.model';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  private apiUrl = environment.apiUrl + 'users-manager';  

  constructor(private http: HttpClient) {}

  

  getAllUsers(): Observable<UserFake[]> {
   
    return this.http.get<UserFake[]>(`${this.apiUrl}/getAll`, );
  }

  getUser(userId: string): Observable<User> {
    
    return this.http.get<User>(`${this.apiUrl}/get/${userId}`, );
  }
  createUsers(user: User): Observable<BaseResponse> {
    let body :any= {
      
      FullName: user.userName,
      Email: user.userEmail,
      Password: user.password,
      AuthProvider: "LOCAL",
      Role: user.role
    }
    console.log(body)
    return this.http.post<BaseResponse>(`${this.apiUrl}/create`,{
      
      FullName: user.userName,
      Email: user.userEmail,
      Password: user.password,
      AuthProvider: "LOCAL",
      Role: user.role
    } );
  }

  softDeleteUser(userId: string): Observable<any> {
    return this.http.put<any>(`${this.apiUrl}/${userId}/soft-delete`, {} );
  }

  updateUser(user: User): Observable<BaseResponse> {
    const url = this.apiUrl + "/"+ user.userId + "/update" ;
    return this.http.put<BaseResponse>(url,{
      FullName: user.userName,
      Email: user.password
    });
  }

  activateUser(user: User): Observable<BaseResponse> {
    const url = this.apiUrl + "/"+ user.userId + "/active" ;
    return this.http.put<BaseResponse>(url,{});
  }

  deactivateUser(user: User): Observable<BaseResponse> {
    const url = this.apiUrl + "/"+ user.userId + "/deactive" ;
    return this.http.put<BaseResponse>(url,{});
  }
}
