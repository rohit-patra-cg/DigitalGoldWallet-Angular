import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Address } from '../models/address';
import { SuccessResponse } from '../models/success-response';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AddressService {

  private apiUrl = "http://localhost:8080/api/v1/address"

  constructor(private http: HttpClient, private router: Router) { }

  createAddress(address: Address): Observable<SuccessResponse> {
    return this.http.post<SuccessResponse>(`${this.apiUrl}/add`, address);
  }
}
