import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-nav',
  standalone: true,
  imports: [RouterModule, CommonModule],
  templateUrl: './nav.component.html',
  styleUrl: './nav.component.css'
})
export class NavComponent {
  
  constructor(private authService: AuthService) {}

  handleLogout(): void {
    this.authService.logout();
  }

  isUserOrAdminLoggedIn(): boolean {
    if (typeof localStorage !== 'undefined') {
      return localStorage.getItem("isAuthenticated")==="true" || localStorage.getItem("isAdminAuthenticated")==="true";
    }
    return false;
  }

  get logo(){
      return'/images/image.png  '
  }
}
