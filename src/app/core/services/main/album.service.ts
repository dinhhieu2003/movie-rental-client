import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { env } from 'process';
import { environment } from '../../../../environments/environments';
import { Observable } from 'rxjs';
import { BaseResponse } from '../../models/BaseResponse.model';

@Injectable({
  providedIn: 'root'
})
export class AlbumService {
  private apiUrl = environment.apiUrl + "auth/album/";
  constructor(private httpClient: HttpClient) { }

  getAllFilmByAlbumId(idAlbum: string): Observable<BaseResponse> {
    let url = this.apiUrl + "getOne/" + idAlbum;
    return this.httpClient.get<BaseResponse>(url);
  }
}
