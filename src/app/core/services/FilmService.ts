import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError, tap } from 'rxjs/operators';
import { environment } from '../../../environments/environments';

@Injectable({
    providedIn: 'root'
})
export class FilmService {
    private apiUrl = environment.apiUrl;

    constructor(private http: HttpClient) { }

    getDeletedFilms(): Observable<any> {
        return this.http.get<any>(`${this.apiUrl}films/deleted`).pipe(
            catchError(this.handleError)
        );
    }

    // Lấy all films đã xóa mềm
    getNotDeletedFilms(): Observable<any> {
        return this.http.get<any>(`${this.apiUrl}films/getNotdelete`).pipe(
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
        return this.http.delete<void>(`${this.apiUrl}films/delete/${id}`).pipe(
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
}
