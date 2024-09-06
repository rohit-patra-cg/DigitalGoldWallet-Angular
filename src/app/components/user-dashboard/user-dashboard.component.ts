import { Component, OnInit } from '@angular/core';
import { ActivatedRoute,RouterModule } from '@angular/router';
import { UserService } from '../../services/user.service';

@Component({
  selector: 'app-user-dashboard',
  standalone: true,
  imports: [RouterModule],
  templateUrl: './user-dashboard.component.html',
  styleUrl: './user-dashboard.component.css'
})
export class UserDashboardComponent implements OnInit {
  userTotalVirtualGoldHolding!: number;
  userBalance!: number;
  userId !: number;
  constructor(private userService: UserService, private route: ActivatedRoute) { }

  ngOnInit(): void {
    this.route.params.subscribe(params => this.userId = params['userId']);
    this.userService.getAllVitualGoldHoldings(this.userId).subscribe({
      next: resp => {
        const holding = resp.map(holding => holding.quantity).reduce((q1, q2) => q1 + q2, 0);
        // Call to increment animation for gold holding
        this.userTotalVirtualGoldHolding = holding;
      },
      error: err => console.log(err)
    });
    this.userService.getUserBalance(this.userId).subscribe({
      next: balance => {
        // Call to increment animation for balance
        this.userBalance = balance;
      },
      error: err => console.log(err)
    })
  }
}
