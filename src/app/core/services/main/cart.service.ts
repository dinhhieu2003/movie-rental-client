import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { BaseResponse } from '../../models/BaseResponse.model';
import { environment } from '../../../../environments/environments';

@Injectable({
  providedIn: 'root'
})
export class CartService {
  private apiUrl = environment.apiUrl + "cart"
  constructor(private httpClient: HttpClient) {  }
  getCart(): Observable<BaseResponse> {
    let url = this.apiUrl + "/view";
    return this.httpClient.get<BaseResponse>(url);
  }

  addToCart(filmId: string) {
    let url = this.apiUrl + `/add/${filmId}`;
    return this.httpClient.post<BaseResponse>(url, {});
  }
}
