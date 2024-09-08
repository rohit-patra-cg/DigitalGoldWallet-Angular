import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Vendor } from '../models/vendor';
import { HttpClient } from '@angular/common/http';
import { SuccessResponse } from '../models/success-response';

@Injectable({
  providedIn: 'root'
})
export class VendorService {
 
  
  private apiUrl = "http://localhost:8080/api/v1/vendor";

  constructor(private http: HttpClient) { }

  private headerList = {
    'Authorization': `Bearer ${localStorage?.getItem("jwtToken")}`
  }

  getAllVendors(): Observable<Vendor[]> {
    return this.http.get<Vendor[]>(this.apiUrl, { headers: this.headerList });
  }
  addVendor(vendor:Vendor):Observable<SuccessResponse>{
    return this.http.post<SuccessResponse>(`${this.apiUrl}/add`, vendor,{headers: this.headerList});
  }
}
