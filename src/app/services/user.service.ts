import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { Signup } from '../models/signup';
import { SuccessResponse } from '../models/success-response';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  private apiUrl = "http://localhost:8080/api/v1/users"

  constructor(private http: HttpClient, private router: Router) { }

  createUser(signup: Signup): Observable<SuccessResponse> {
    return this.http.post<SuccessResponse>(`${this.apiUrl}/add`, signup);
  }
}
