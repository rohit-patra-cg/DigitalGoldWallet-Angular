import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { PaymentDTO } from '../models/payment-dto';
import { Observable } from 'rxjs';
import { SuccessResponse } from '../models/success-response';
@Injectable({
  providedIn: 'root'
})
export class PaymentService {
  private apiUrl = "http://localhost:8080/api/v1/payments";

  private headerList = {
    'Authorization': `Bearer ${localStorage?.getItem("jwtToken")}`
  }

  constructor(private http: HttpClient) { }

  createPayment(paymentDTO: PaymentDTO): Observable<SuccessResponse> {
    return this.http.post<SuccessResponse>(`${this.apiUrl}/add`, paymentDTO, { headers: this.headerList });
  }
}
