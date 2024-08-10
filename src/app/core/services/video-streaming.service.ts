import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { JwtService } from './jwt.service';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environments';
import { FilmRequest } from '../models/FilmRequest';

@Injectable({
  providedIn: 'root'
})
export class VideoStreamingService {
 
  private apiUrl = environment.apiUrl + "auth/films/";
  constructor(private readonly httpClient: HttpClient) { }
  
  
}
