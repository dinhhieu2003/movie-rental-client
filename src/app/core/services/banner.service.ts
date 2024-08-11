import { Injectable } from '@angular/core';
import { environment } from '../../../environments/environments';
import { HttpClient } from '@angular/common/http';
import { Banner } from '../models/Banner.model';
import { Observable } from 'rxjs';
import { BaseResponse } from '../models/BaseResponse.model';
import { BannerRequest } from '../models/BannerRequest';

@Injectable({
  providedIn: 'root'
})
export class BannerService {

  private apiUrl = environment.apiUrl + 'banner';  
  constructor(private http: HttpClient) {}

  getAllBanners(i:number,y:number): Observable<BannerRequest> {
   
    return this.http.get<BannerRequest>(`${this.apiUrl}/getAll`+'?page='+i+'&size='+y);
  }

  
  createBanners(banner : Banner): Observable<BaseResponse> {
    let body :any= {
      
      imageUrl: banner.imageUrl,
      idFilm: banner.film.id,
      isActive: banner.isActive,
      isDeleted: banner.isDeleted
    }
    
    return this.http.post<BaseResponse>(`${this.apiUrl}/create`,{
      
      imageUrl: banner.imageUrl,
      idFilm: banner.film.id,
      isActive: banner.isActive,
      isDeleted: banner.isDeleted
    } );
  }

  softDeleteBanner(id: string): Observable<any> {
    return this.http.patch<any>(`${this.apiUrl}/softDelete/${id}`, {} );
  }

  updateBanner(imageUrl: string, idFilm: string, isActive: boolean, isDeleted: boolean, id: string): Observable<BaseResponse> {
    const url = this.apiUrl + "/update"+ "/"+id ;
    return this.http.put<BaseResponse>(url,{
      imageUrl: imageUrl,
      idFilm: idFilm,
      isActive: isActive,
      isDeleted: isDeleted
    });
  }

  restoreBanner(id: string): Observable<any> {
    return this.http.put<any>(`${this.apiUrl}/restore/${id}`, {} );
  }
  activeStatus(id: string): Observable<any> {
    return this.http.put<any>(`${this.apiUrl}/toggle-active-status/${id}`, {} );
  }
}
