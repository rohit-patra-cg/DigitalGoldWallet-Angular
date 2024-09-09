import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { UserService } from '../../services/user.service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { PaymentDTO } from '../../models/payment-dto';
import { PaymentService } from '../../services/payment.service';

@Component({
  selector: 'app-user-dashboard',
  standalone: true,
  imports: [RouterModule, CommonModule, FormsModule],
  templateUrl: './user-dashboard.component.html',
  styleUrls: ['./user-dashboard.component.css']
})
export class UserDashboardComponent implements OnInit {
  userTotalVirtualGoldHolding!: number;
  userBalance!: number;
  userId !: number;
  selectedMethod!: string;
  addToWalletAmount!: number;

  constructor(private userService: UserService, private paymentService: PaymentService, private route: ActivatedRoute, private router: Router) { }

  ngOnInit(): void {
    this.route.params.subscribe(params => this.userId = params['userId']);
    this.userService.getAllVitualGoldHoldings(this.userId).subscribe({
      next: resp => {
        const holding = resp.map(holding => holding.quantity).reduce((q1, q2) => q1 + q2, 0);
        this.animateNumber('gold-holdings', 0, holding, 500);
        this.userTotalVirtualGoldHolding = holding;
      },
      error: err => console.log(err)
    });
    this.userService.getUserBalance(this.userId).subscribe({
      next: balance => {
        this.animateNumber('available-amount', 0, balance, 500);
        this.userBalance = balance;
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

  selectPayment(method: string) {
    this.selectedMethod = method;
  }

  handleAddToWalletSubmit() {
    let paymentDTO: PaymentDTO = { userId: Number(this.userId), paymentStatus: 'SUCCESS', transactionType: 'CREDITED_TO_WALLET', paymentMethod: this.selectedMethod, amount: this.addToWalletAmount };
    console.log(paymentDTO);
    this.paymentService.createPayment(paymentDTO).subscribe({
      next: resp => this.ngOnInit(),
      error: err => console.log(err)
    });
  }
}
