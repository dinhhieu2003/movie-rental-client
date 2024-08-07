import { Injectable } from '@angular/core';
import { environment } from '../../../environments/environments';
import { HttpClient } from '@angular/common/http';
import { Invoice } from '../models/Invoice.model';
import { Observable } from 'rxjs';
import { InvoiceRequest } from '../models/InvoiceRequest.model';

@Injectable({
  providedIn: 'root'
})
export class InvoiceService {

  private apiUrl = environment.apiUrl + 'invoice';  

  constructor(private http: HttpClient) {}
  getAllInvoices(): Observable<InvoiceRequest> {
   
    return this.http.get<InvoiceRequest>(`${this.apiUrl}/invoices`, );
  }
}
