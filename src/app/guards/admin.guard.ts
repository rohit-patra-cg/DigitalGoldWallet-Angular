import { CanActivate, Router } from '@angular/router';
import { Injectable } from '@angular/core';
import { AuthService } from '../services/auth.service';
import { Observable, take, map, tap } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class AdminGuard implements CanActivate {
  constructor(private authService: AuthService, private router: Router) { }

  canActivate(): Observable<boolean> | boolean {
    // return this.authService.isAuthenticated$.pipe(
    //   take(1),
    //   map(isAuthenticated => !!isAuthenticated),
    //   tap(isAuthenticated => {
    //     if (!isAuthenticated) {
    //       this.router.navigate(["/"])
    //     }
    //   })
    // )
    return false;
  }
}
