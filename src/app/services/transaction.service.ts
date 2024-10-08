import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { TransactionHistory } from '../models/transaction-history';
import { SuccessResponse } from '../models/success-response';
import { TransactionHistoryDTO } from '../models/transaction-history-dto';

@Injectable({
  providedIn: 'root'
})
export class TransactionService {

  private apiUrl = "http://localhost:8080/api/v1/transaction_history";

  private headerList = {
    'Authorization': `Bearer ${localStorage?.getItem("jwtToken")}`
  }

  constructor(private http: HttpClient) { }

  getAllTransactionByUserId(userId: number): Observable<TransactionHistory[]> {
    return this.http.get<TransactionHistory[]>(`${this.apiUrl}/by_user/${userId}`, {headers: this.headerList});
  }

  getAllTransactions(): Observable<TransactionHistory[]> {
    return this.http.get<TransactionHistory[]>(`${this.apiUrl}`, {headers: this.headerList});
  }

  createTransaction(transactionDto: TransactionHistoryDTO): Observable<SuccessResponse> {
    return this.http.post<SuccessResponse>(`${this.apiUrl}/add`, transactionDto, {headers: this.headerList});
  } 
}
