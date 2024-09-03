import { Component } from '@angular/core';
import { Router, RouterModule } from '@angular/router';
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

  // TODO: Refractor the code and change it
  // constructor(private authService: AuthService, private router: Router) {}

  // handleLogout() {
  //   this.authService.logout();
  //   this.router.navigate(["/"])
  // }
}
