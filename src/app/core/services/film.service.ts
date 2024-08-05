import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError, tap } from 'rxjs/operators';
import { environment } from '../../../environments/environments';
import { FilmModel } from '../models/FilmModel';

@Injectable({
    providedIn: 'root'
})
export class FilmService {
    private apiUrl = environment.apiUrl;

    constructor(private http: HttpClient) { }

    getDeletedFilms(): Observable<FilmModel[]> {
        return this.http.get<FilmModel[]>(`${this.apiUrl}/films/deleted`).pipe(
            tap(data => console.log(data, 'Fetched deleted films')),
            catchError(this.handleError)
        );
    }

    // Lấy all films đã xóa mềm
    getNotDeletedFilms(): Observable<FilmModel[]> {
        return this.http.get<FilmModel[]>(`${this.apiUrl}/films/notdelete`).pipe(
            tap(data => console.log(data, 'Fetched not deleted films')),
            catchError(this.handleError)
        );
    }

    postCreateFilm(film: FilmModel): Observable<FilmModel> {
        return this.http.post<FilmModel>(`${this.apiUrl}/create`, film).pipe(
            tap(data => console.log(data, 'Created film')),
            catchError(this.handleError)
        );
    }

    putUpdateFilm(id: number, film: FilmModel): Observable<FilmModel> {
        return this.http.put<FilmModel>(`${this.apiUrl}/update/${id}`, film).pipe(
            tap(data => console.log(data, 'Updated film')),
            catchError(this.handleError)
        );
    }

    patchRestoreFilm(id: number): Observable<void> {
        return this.http.patch<void>(`${this.apiUrl}/restore/${id}`, {}).pipe(
            tap(() => console.log(`Restored film with ID ${id}`)),
            catchError(this.handleError)
        );
    }

    deleteFilm(id: number): Observable<void> {
        return this.http.delete<void>(`${this.apiUrl}/films/delete/${id}`).pipe(
            tap(() => console.log(`Deleted film with ID ${id}`)),
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
}
