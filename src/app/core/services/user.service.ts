import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environments';
import { JwtService } from './jwt.service';
import { BaseResponse } from '../models/BaseResponse.model';
import {User} from '../models/UserModel.model';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  private apiUrl = environment.apiUrl + 'users-manager';  

  constructor(private http: HttpClient) {}

  

  getAllUsers(): Observable<User[]> {
   
    return this.http.get<User[]>(`${this.apiUrl}/getAll`, );
  }

  getUser(userId: string): Observable<User> {
    
    return this.http.get<User>(`${this.apiUrl}/get/${userId}`, );
  }
  createUsers(user: User): Observable<BaseResponse> {
    let body :any= {
      
      FullName: user.FullName,
      Email: user.Email,
      Password: user.Password,
      AuthProvider: user.AuthProvider,
      Role: user.Role
    }
    console.log(body)
    return this.http.post<BaseResponse>(`${this.apiUrl}/create`,{
      
      FullName: user.FullName,
      Email: user.Email,
      Password: user.Password,
      AuthProvider: user.AuthProvider,
      Role: user.Role
    } );
  }

  softDeleteUser(userId: string): Observable<any> {
    return this.http.put<any>(`${this.apiUrl}/${userId}/soft-delete`, {} );
  }

  updateUser(user: User): Observable<BaseResponse> {
    const url = this.apiUrl + "/"+ user.Id + "/update" ;
    return this.http.put<BaseResponse>(url,{
      FullName: user.FullName,
      Email: user.Email,
      Password: user.Password,
      AuthProvider: user.AuthProvider,
      Role: user.Role
    });
  }

  activateUser(user: User): Observable<BaseResponse> {
    const url = this.apiUrl + "/"+ user.Id + "/active" ;
    return this.http.put<BaseResponse>(url,{});
  }

  deactivateUser(user: User): Observable<BaseResponse> {
    const url = this.apiUrl + "/"+ user.Id + "/deactive" ;
    return this.http.put<BaseResponse>(url,{});
  }
}
