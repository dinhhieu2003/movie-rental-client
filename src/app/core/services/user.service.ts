import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environments';
import { JwtService } from './jwt.service';

interface User {
  userId: string;
  userName: string;
  password: string;
  role: string;
  action: boolean;
}

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

  softDeleteUser(userId: string): Observable<any> {
    
    return this.http.put(`${this.apiUrl}/soft-delete/${userId}`, {}, );
  }

  updateUser(user: User): Observable<any> {
    
    return this.http.put(`${this.apiUrl}/update`, user, );
  }

  activateUser(userId: string): Observable<any> {
    
    return this.http.put(`${this.apiUrl}/activate`, { userId },);
  }

  deactivateUser(userId: string): Observable<any> {
    
    return this.http.put(`${this.apiUrl}/deactivate`, { userId }, );
  }
}
