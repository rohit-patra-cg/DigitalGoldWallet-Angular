import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Login } from '../models/login';
import { BehaviorSubject, Observable, of } from 'rxjs'

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private apiUrl = "http://localhost:8080/api/auth/login"

  constructor(private http: HttpClient, private router: Router) { }

  private token = new BehaviorSubject<string>("");
  token$: Observable<string> = this.token.asObservable();

  private authenticated: boolean = typeof localStorage !== 'undefined' && !!localStorage.getItem('isAuthenticated');

  get isAuthenticated$(): Observable<boolean> {
    return of(this.authenticated);
  }

  login(loginObj: Login) {
    this.http.post<any>(this.apiUrl, loginObj).subscribe(
      response => {
        // Storing jwtToken in localstorage
        if (response && response.success) {
          if (typeof localStorage !== 'undefined') {
            localStorage.setItem("username", loginObj.username);
            localStorage.setItem("jwtToken", response.jwt);
            localStorage.setItem("isAuthenticated", String(true));
          }
          this.token.next(response.jwt);
          this.authenticated = true;
          this.router.navigate([`/dashboard:${response.userId}`])
        }
        return response;
      }
    )
  }

  logout(): void {
    this.authenticated = false;
    if (typeof localStorage !== 'undefined') {
      localStorage.removeItem("username");
      localStorage.removeItem("jwtToken");
      localStorage.removeItem("isAuthenticated");
    }
    this.router.navigate(["/"])
  }
}
