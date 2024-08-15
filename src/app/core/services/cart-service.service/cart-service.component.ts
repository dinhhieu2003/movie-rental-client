import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { environment } from '../../../../environments/environments';

export interface FilmData {
  createdAt: string;
  updatedAt: string;
  isActive: boolean;
  isDeleted: boolean;
  subtitles: string[];
  narrations: string[];
  comments: any[];
  genres: string[];
  Id: string;
  FilmName: string;
  FilmUrl: string;
  Description: string;
  ThumbnailUrl: string;
  TrailerUrl: string;
  ReleaseDate: string;
  Duration: string;
  Actors: string[];
  Director: string;
  Language: string;
  RatingScore: number;
  Age: number;
  Price: number;
  LimitTime: number;
  RentalType: string;
}

interface ApiResponse {
  Message: string;
  Status: number;
  Data: {
    films: FilmData[];
  };
}

@Injectable({
  providedIn: 'root',
})
export class CartService {
  private apiUrl = `${environment.apiUrl}cart/view`;
  private deleteUrl = `${environment.apiUrl}cart/remove`; // Add the delete API URL

  constructor(private http: HttpClient) {}

  getCartItems(): Observable<ApiResponse> {
    return this.http.get<ApiResponse>(this.apiUrl).pipe(
      catchError(this.handleError)
    );
  }

  removeCartItem(filmId: string): Observable<any> {
    return this.http.delete(`${this.deleteUrl}/${filmId}`).pipe(
      catchError(this.handleError)
    );
  }

  private handleError(error: HttpErrorResponse) {
    console.error('An error occurred:', error.message);
    return throwError('Something went wrong; please try again later.');
  }
}
