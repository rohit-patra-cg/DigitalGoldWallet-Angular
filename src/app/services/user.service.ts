import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Signup } from '../models/signup';
import { SuccessResponse } from '../models/success-response';
import { User } from '../models/user';
import { VirtualGoldHolding } from '../models/virtual-gold-holding';
import { PhysicalGoldTransaction } from '../models/physical-gold-transaction';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  private apiUrl = "http://localhost:8080/api/v1/users";

  constructor(private http: HttpClient) { }

  private headerList = {
    'Authorization': `Bearer ${localStorage?.getItem("jwtToken")}`
  }

  createUser(signup: Signup): Observable<SuccessResponse> {
    return this.http.post<SuccessResponse>(`${this.apiUrl}/add`, signup);
  }

  getAllUsers(): Observable<User[]> {
    return this.http.get<User[]>(this.apiUrl, { headers: this.headerList })
  }

  getUserByUserId(userId: number): Observable<User> {
    return this.http.get<User>(`${this.apiUrl}/${userId}`, { headers: this.headerList })
  }

  getUserBalance(userId: number): Observable<number> {
    return this.http.get<number>(`${this.apiUrl}/check_balance/${userId}`, { headers: this.headerList })
  }

  getAllVitualGoldHoldings(userId: number): Observable<VirtualGoldHolding[]> {
    return this.http.get<VirtualGoldHolding[]>(`${this.apiUrl}/${userId}/virtual_gold_holdings`, { headers: this.headerList })
  }

  getAllPhysicalGoldTransactions(userId: number): Observable<PhysicalGoldTransaction[]> {
    return this.http.get<PhysicalGoldTransaction[]>(`${this.apiUrl}/${userId}/physical_gold_holdings`, { headers: this.headerList })
  }

  updateBalance(userId: number, newBalance: number) {
    return this.http.put<SuccessResponse>(`${this.apiUrl}/${userId}/update_balance/${newBalance}`, {}, { headers: this.headerList });
  }
}
