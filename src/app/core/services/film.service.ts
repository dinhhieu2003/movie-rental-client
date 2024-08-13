import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError, tap } from 'rxjs/operators';
import { environment } from '../../../environments/environments';
import { FilmRequest } from '../models/FilmRequest';
import { BaseResponse } from '../models/BaseResponse.model';
import { MovieCard } from '../../main/models/movie-card';
import { GenericRequest } from '../models/GenericRequest.model';
import { FilmInfo, FilmResource } from '../../main/models/film';

@Injectable({
    providedIn: 'root'
})
export class FilmService {

    private apiUrl = environment.apiUrl + 'film';

    constructor(private http: HttpClient) { }

    getDeletedFilms(): Observable<any> {
        return this.http.get<any>(`${this.apiUrl}/deleted`).pipe(
            catchError(this.handleError)
        );
    }

    // Lấy all films chưa xóa mềm
    getNotDeletedFilms(): Observable<any> {
        return this.http.get<any>(`${this.apiUrl}/notDelete`).pipe(
            catchError(this.handleError)
        );
    }
    // Lấy all genre chưa xóa mềm
    getGenres(): Observable<any> {
        return this.http.get<any>(`https://hoctuancustomservice.io.vn/api/genre/getAll`).pipe(
            catchError(this.handleError)
        );
    }


    postCreateFilm(film: FillMode): Observable<any> {
        return this.http.post<any>(`${this.apiUrl}create`, film).pipe(
            catchError(this.handleError)
        );
    }

    putUpdateFilm(id: number, film: FillMode): Observable<any> {
        return this.http.put<any>(`${this.apiUrl}update/${id}`, film).pipe(
            catchError(this.handleError)
        );
    }

    patchRestoreFilm(id: number): Observable<void> {
        return this.http.patch<void>(`${this.apiUrl}restore/${id}`, {}).pipe(
            catchError(this.handleError)
        );
    }

    deleteFilm(id: number): Observable<void> {
        return this.http.delete<void>(`${this.apiUrl}/delete/${id}`).pipe(
            catchError(this.handleError)
        );
    }


    private handleError(error: HttpErrorResponse) {
        if (error.error && error.error.message) {
            console.error('An error occurred:', error.error.message);
        } else {
            console.error(`Backend returned code ${error.status}, body was: ${error.message}`);
        }
        return throwError('Something bad happened; please try again later.');
    }

    // .pipe(
    //     tap(data => console.log(data, 'Created category')),
    //         catchError(this.handleError)
    //     );

    getFilmById(id: string): Observable<FilmRequest> {
        const url: string = environment.apiUrl + "auth/films/" + id
        return this.http.get<FilmRequest>(url)
    }

    getFilmRating(filmId: string): Observable<BaseResponse> {
        const url: string = environment.apiUrl + "film/rating/" + filmId;
        return this.http.post<BaseResponse>(url, {});
    }

    setRatingForFilm(currentFilmId: string, score: number): Observable<BaseResponse> {
        const url: string = environment.apiUrl + "film/rate/" + currentFilmId;
        let userId = localStorage.getItem("IdUser");
        const body = {
            filmId: currentFilmId,
            rating: score,
            idUser: userId ? userId : "no id user found"
        };
        return this.http.post<BaseResponse>(url, body);
    }
    getTop5HotestFilm(): Observable<BaseResponse> {
        const url = environment.apiUrl + "auth/film/top5";
        return this.http.get<BaseResponse>(url);
    }
    getFilmInfo(filmId: string): Observable<GenericRequest<FilmInfo>> {
        const url: string = environment.apiUrl + "auth/film/info/" + filmId;
        return this.http.get<GenericRequest<FilmInfo>>(url);
    }
    getFilmResource(filmId: string): Observable<GenericRequest<FilmResource>> {
        const url: string = environment.apiUrl + "film/resource/" + filmId;
        return this.http.get<GenericRequest<FilmResource>>(url);
    }
    getFilmActors(currentFilmId: string): Observable<GenericRequest<string[]>> {
        const url: string = environment.apiUrl + "auth/film/actor/" + currentFilmId;
        return this.http.get<GenericRequest<string[]>>(url);
    }
    getFilmGenres(currentFilmId: string): Observable<GenericRequest<string[]>> {
        const url: string = environment.apiUrl + "auth/film/genre/" + currentFilmId;
        return this.http.get<GenericRequest<string[]>>(url);
    }
}
