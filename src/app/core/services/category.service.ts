import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError, tap } from 'rxjs/operators';
import { environment } from '../../../environments/environments';
import { CategoryModel } from '../models/CategoryModel';

@Injectable({
    providedIn: 'root'
})
export class CategoryService {
    private apiUrl = environment.apiUrl + 'category';

    constructor(private http: HttpClient) { }

    // Lấy tất cả các category chưa xóa mềm
    getFindAllCategories(): Observable<any> {
        return this.http.get<any>(`${this.apiUrl}/getAll?page=0&size=500`).pipe(
            catchError(this.handleError));
    }

    // Lấy tất cả các category đã bị xóa mềm
    getAllSoftDeletedCategories(): Observable<any> {
        return this.http.get<any>(`${this.apiUrl}/getAllSoftDelete`).pipe(
            catchError(this.handleError));
    }

    // Tạo mới category
    postCreateCategory(category: CategoryModel): Observable<any> {
        return this.http.post<any>(`${this.apiUrl}/create`, category);
    }

    // Cập nhật category theo ID
    putUpdateCategory(categoryId: number, category: CategoryModel): Observable<any> {
        return this.http.put<any>(`${this.apiUrl}/update/${categoryId}`, category).pipe(
            catchError(this.handleError));
    }

    // Xóa mềm category theo ID
    patchSoftDeleteCategory(categoryId: number): Observable<void> {
        return this.http.patch<void>(`${this.apiUrl}/softDelete/${categoryId}`, {}).pipe(
            catchError(this.handleError));
    }

    // Khôi phục category đã xóa mềm theo ID
    patchRestoreCategory(categoryId: number): Observable<void> {
        return this.http.patch<void>(`${this.apiUrl}/restore/${categoryId}`, {}).pipe(
            catchError(this.handleError));
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
