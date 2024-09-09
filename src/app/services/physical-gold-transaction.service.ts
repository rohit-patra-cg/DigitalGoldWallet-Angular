import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { PhysicalGoldTransaction } from '../models/physical-gold-transaction';
import { SuccessResponse } from '../models/success-response';
import { PhysicalGoldDTO } from '../models/physical-gold-dto';

@Injectable({
  providedIn: 'root'
})
export class PhysicalGoldTransactionService {
  private apiUrl = "http://localhost:8080/api/v1/physical_gold_transactions";

  private headerList = {
    'Authorization': `Bearer ${localStorage?.getItem("jwtToken")}`
  }

  constructor(private http: HttpClient) { }

  getAllPhysicalGoldTransactions(): Observable<PhysicalGoldTransaction[]> {
    return this.http.get<PhysicalGoldTransaction[]>(this.apiUrl, { headers: this.headerList });
  }

  createPhysicalGoldTransaction(dto: PhysicalGoldDTO): Observable<SuccessResponse> {
    return this.http.post<SuccessResponse>(`${this.apiUrl}/add`, dto, { headers: this.headerList });
  }
}
