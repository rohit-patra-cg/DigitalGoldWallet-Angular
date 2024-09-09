import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { SuccessResponse } from '../models/success-response';
import { Observable } from 'rxjs';
import { VirtualGoldDTO } from '../models/virtual-gold-dto';

@Injectable({
  providedIn: 'root'
})
export class VitualGoldService {

  private apiUrl = "http://localhost:8080/api/v1/virtual_gold_holding";

  constructor(private http: HttpClient) { }

  private headerList = {
    'Authorization': `Bearer ${localStorage?.getItem("jwtToken")}`
  }

  convertToPhysical(holdingId: number, quantity: number): Observable<SuccessResponse> {
    return this.http.post<SuccessResponse>(`${this.apiUrl}/convertToPhysical/${holdingId}/${quantity}`, {}, { headers: this.headerList });
  }

  updateVirtualGoldHolding(holdingId: number,virtualGoldDTO: VirtualGoldDTO): Observable<SuccessResponse> {
    return this.http.put<SuccessResponse>(`${this.apiUrl}/update/${holdingId}`, virtualGoldDTO, { headers: this.headerList });
  }
}
