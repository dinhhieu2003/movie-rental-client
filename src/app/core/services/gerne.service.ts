import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError, tap } from 'rxjs/operators';
import { environment } from '../../../environments/environments';
import { GenreModel } from '../models/GerneModel';

@Injectable({
    providedIn: 'root'
})
export class GenreService {
    private apiUrl = environment.apiUrl + 'genre';

    constructor(private http: HttpClient) { }

    // Lấy tất cả các genre đã bị xóa mềm
    getAllSoftDeletedGenres(): Observable<any> {
        return this.http.get<any>(`${this.apiUrl}/getAllSoftDelete`).pipe(
            catchError(this.handleError)
        );
    }

    // Lấy tất cả các genre
    getAllGenres(): Observable<any> {
        return this.http.get<any>(`${this.apiUrl}/getAll?page=0&size=20`).pipe(
            catchError(this.handleError)
        );
    }

    // Tạo mới genre
    postCreateGenre(genre: GenreModel): Observable<any> {
        return this.http.post<any>(`${this.apiUrl}/create`, genre).pipe(
            catchError(this.handleError)
        );
    }

    // Cập nhật genre theo ID
    putUpdateGenre(genreId: number, genre: GenreModel): Observable<any> {
        return this.http.put<any>(`${this.apiUrl}/update/${genreId}`, genre).pipe(
            catchError(this.handleError)
        );
    }

    // Xóa mềm genre theo ID
    patchSoftDeleteGenre(genreId: number): Observable<void> {
        return this.http.patch<void>(`${this.apiUrl}/softDelete/${genreId}`, {}).pipe(
            catchError(this.handleError)
        );
    }

    // Khôi phục genre đã xóa mềm theo ID
    patchRestoreGenre(genreId: number): Observable<void> {
        return this.http.patch<void>(`${this.apiUrl}/restore/${genreId}`, {}).pipe(
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
