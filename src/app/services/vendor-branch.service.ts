import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { VendorBranch } from '../models/vendor-branch';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class VendorBranchService {

  private apiUrl = "http://localhost:8080/api/v1/vendor_branches";
  constructor(private http: HttpClient) { }
  private headerList = {
    'Authorization': `Bearer ${localStorage?.getItem("jwtToken")}`
  }

  getAllVendorBranches(): Observable<VendorBranch[]> {
    return this.http.get<VendorBranch[]>(this.apiUrl, { headers: this.headerList })
  }
}
