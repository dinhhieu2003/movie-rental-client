import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { JwtService } from './jwt.service';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environments';
import { FilmResponse } from '../models/FilmServer';

@Injectable({
  providedIn: 'root'
})
export class VideoStreamingService {
 
  private apiUrl = environment.apiUrl + "auth/films/";
  constructor(private readonly httpClient: HttpClient) { }
  
  getFilmById(id: string):Observable<FilmResponse> {
    const url:string = this.apiUrl + id
    return this.httpClient.get<FilmResponse>(url)
  }
}
