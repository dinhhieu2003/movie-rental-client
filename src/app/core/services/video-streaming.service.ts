import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { JwtService } from './jwt.service';

@Injectable({
  providedIn: 'root'
})
export class VideoStreamingService {

  constructor(private readonly httpClient: HttpClient) { }
  
  
}
