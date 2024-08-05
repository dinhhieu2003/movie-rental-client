import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../../../../src/environments/environments';
import { JwtService } from '../jwt.service';

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

  constructor(private http: HttpClient, private jwtService: JwtService) {}

  private getHeaders(): HttpHeaders {
    const token = this.jwtService.getToken() || '';
    return new HttpHeaders().set('Authorization', `Bearer ${token}`);
  }

  getAllUsers(): Observable<User[]> {
    const headers = this.getHeaders();
    return this.http.get<User[]>(`${this.apiUrl}/getAll`, { headers });
  }

  getUser(userId: string): Observable<User> {
    const headers = this.getHeaders();
    return this.http.get<User>(`${this.apiUrl}/get/${userId}`, { headers });
  }

  softDeleteUser(userId: string): Observable<any> {
    const headers = this.getHeaders();
    return this.http.put(`${this.apiUrl}/soft-delete/${userId}`, {}, { headers });
  }

  updateUser(user: User): Observable<any> {
    const headers = this.getHeaders();
    return this.http.put(`${this.apiUrl}/update`, user, { headers });
  }

  activateUser(userId: string): Observable<any> {
    const headers = this.getHeaders();
    return this.http.put(`${this.apiUrl}/activate`, { userId }, { headers });
  }

  deactivateUser(userId: string): Observable<any> {
    const headers = this.getHeaders();
    return this.http.put(`${this.apiUrl}/deactivate`, { userId }, { headers });
  }
}
