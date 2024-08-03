import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { FilmModel } from '../../models/management/FilmModel';

@Injectable({
    providedIn: 'root'
})
export class FilmService {
    private url = 'https://hoctuancustomservice.io.vn/api';

    constructor(private http: HttpClient) { }

    getAllCategories(): Observable<FilmModel[]> {
        console.log(this.http.get<FilmModel[]>(`${this.url}/films`).pipe(
            catchError(this.handleError)
        ),'22222222')
        return this.http.get<FilmModel[]>(`${this.url}/films`).pipe(
            catchError(this.handleError)
        );
    }

    getCategoryById(id: number): Observable<FilmModel> {
        const apiUrl = `${this.url}/films/deleted/${id}`;
        return this.http.get<FilmModel>(apiUrl).pipe(
            catchError(this.handleError)
        );
    }

    private handleError(error: HttpErrorResponse) {
        if (error.error instanceof ErrorEvent) {
            console.error('An error occurred:', error.error.message);
        } else {
            console.error(`Backend returned code ${error.status}, body was: ${error.error}`);
        }
        return throwError(
            'Something bad happened; please try again later.');
    }
}
