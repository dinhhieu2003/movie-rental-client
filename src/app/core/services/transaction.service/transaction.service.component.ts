import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { environment } from '../../../../environments/environments';

interface Transaction {
  id: string;
  purchaseDate: string;
  totalPrice: number;
  transactionStatus: string;
}

interface ApiResponse {
  message: string;
  status: number;
  data: {
    transactions: Transaction[];
  };
}

@Injectable({
  providedIn: 'root',
})
export class TransactionService {
  private apiUrl = `${environment.apiUrl}transactionHistory/transactions`;

  constructor(private http: HttpClient) {}

  getTransactionHistory(): Observable<ApiResponse> {
    return this.http.get<ApiResponse>(this.apiUrl).pipe(
      catchError(this.handleError)
    );
  }

  private handleError(error: HttpErrorResponse) {
    console.error('An error occurred:', error.message);
    return throwError('Something went wrong; please try again later.');
  }
}
