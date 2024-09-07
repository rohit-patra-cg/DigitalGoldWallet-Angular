import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, RouterModule } from '@angular/router';
import { UserService } from '../../services/user.service';
 
@Component({
  selector: 'app-user-dashboard',
  standalone: true,
  imports: [RouterModule],
  templateUrl: './user-dashboard.component.html',
  styleUrls: ['./user-dashboard.component.css']
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
        this.animateNumber('gold-holdings', 0, holding, 2000);
      },
      error: err => console.log(err)
    });
    this.userService.getUserBalance(this.userId).subscribe({
      next: balance => {
        this.animateNumber('available-amount', 0, balance, 2000);
      },
      error: err => console.log(err)
    });
  }
 
  private animateNumber(elementId: string, start: number, end: number, duration: number): void {
    const element = document.getElementById(elementId);
    let startTimestamp: number | null = null;
    const step = (timestamp: number) => {
      if (!startTimestamp) startTimestamp = timestamp;
      const progress = Math.min((timestamp - startTimestamp) / duration, 1);
      if (element) {
        if (elementId === 'gold-holdings') {
          element.innerText = (progress * (end - start) + start).toFixed(2) + ' grams';
        } else {
          element.innerText = '₹' + (progress * (end - start) + start).toFixed(2);
        }
      }
      if (progress < 1) {
        window.requestAnimationFrame(step);
      } else {
        if (elementId === 'gold-holdings') {
          element!.innerText = end.toFixed(2) + ' grams';
        } else {
          element!.innerText = '₹' + end.toFixed(2);
        }
      }
    };
    window.requestAnimationFrame(step);
  }
}
