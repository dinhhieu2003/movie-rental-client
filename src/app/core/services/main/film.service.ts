import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { BaseResponse } from '../../models/BaseResponse.model';
import { environment } from '../../../../environments/environments';

@Injectable({
  providedIn: 'root'
})
export class FilmService {
  private apiUrl = environment.apiUrl + "auth/film/search"
  constructor(private httpClient: HttpClient) { }

  searchFilm(term: string): Observable<BaseResponse> {
    let url = this.apiUrl + `?keywords=${term}`;
    return this.httpClient.get<BaseResponse>(url);
  }
}
