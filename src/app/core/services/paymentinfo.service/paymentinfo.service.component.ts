import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { environment } from '../../../../environments/environments';
import { PaymentInfo } from '../../models/PaymentInfo.model';

interface ApiResponse {
  Message: string;
  Status: number;
  Data: PaymentInfo[];
}

interface PaymentInfoRequestDTO {
  isActive: boolean;
  isDeleted: boolean;
  bankName: string;
  cardNumber: string;
  cardHolderName: string;
  issueDate: string;
}

@Injectable({
  providedIn: 'root',
})
export class PaymentInfoService {
  private apiUrl = `${environment.apiUrl}payment-info`;

  constructor(private http: HttpClient) {}

  getPaymentInfos(): Observable<PaymentInfo[]> {
    return this.http.get<ApiResponse>(`${this.apiUrl}/activePaymentInfos`).pipe(
      map(response => response.Data),
      catchError(this.handleError)
    );
  }

  addPaymentInfo(paymentInfo: PaymentInfoRequestDTO): Observable<any> {
    return this.http.post(`${this.apiUrl}/paymentInfo`, paymentInfo).pipe(
      catchError(this.handleError)
    );
  }

  softDeletePaymentInfo(paymentInfoId: string): Observable<any> {
    return this.http.patch(`${this.apiUrl}/softDelete/${paymentInfoId}`, {}).pipe(
      catchError(this.handleError)
    );
  }

  private handleError(error: HttpErrorResponse) {
    console.error('An error occurred:', error.message);
    return throwError('Something went wrong; please try again later.');
  }
}
