import { Injectable } from '@angular/core';
import { environment } from '../../../../environments/environments';
import { map, Observable } from 'rxjs';
import { BaseResponse } from '../../models/BaseResponse.model';
import { HttpClient } from '@angular/common/http';
import { Category } from '../../../main/models/category';

@Injectable({
  providedIn: 'root'
})
export class CategoryService {
  private apiUrl = environment.apiUrl + "auth/category/";

  constructor(private httpClient: HttpClient) { }

  getAllCategory(): Observable<Category[]> {
    let url = this.apiUrl + "getAllActive";
    return this.httpClient.get<BaseResponse>(url).pipe(map(data => data.Data.content));
  }

  getCategory(id: string): Observable<BaseResponse> {
    let url = this.apiUrl + `getOne/${id}`;
    return this.httpClient.get<BaseResponse>(url);
  }

}
