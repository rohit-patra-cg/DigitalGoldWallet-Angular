import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { VirtualGoldHolding } from '../../models/virtual-gold-holding';
import { VitualGoldService } from '../../services/vitual-gold.service';
import { UserService } from '../../services/user.service';
import { TransactionService } from '../../services/transaction.service';

@Component({
  selector: 'app-sell-gold',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, RouterModule],
  templateUrl: './sell-gold.component.html',
  styleUrl: './sell-gold.component.css'
})
export class SellGoldComponent implements OnInit {
  userId!: number;
  sellGoldForm!: FormGroup;
  virtualGold!: VirtualGoldHolding;

  constructor(private fb: FormBuilder, private virtualGoldService: VitualGoldService, private userService: UserService, private transactionService: TransactionService, private activatedRoute: ActivatedRoute, private route: Router) {
    this.sellGoldForm = this.fb.group({
      amount: ['', Validators.required],
      quantity: ['', Validators.required]
    });
  }

  ngOnInit(): void {
    this.activatedRoute.params.subscribe({
      next: resp => {
        if (resp && resp['userId']) {
          this.userId = resp['userId'];
        }
      },
      error: err => console.log(err)
    });

    this.userService.getAllVitualGoldHoldings(this.userId).subscribe({
      next: resp => {
          this.virtualGold = resp[0];
          this.sellGoldForm = this.fb.group({
            amount: ['', [Validators.required, Validators.max(this.virtualGold.quantity * this.virtualGold.branch.vendor.currentGoldPrice)]],
            quantity: ['', [Validators.required, Validators.max(this.virtualGold.quantity)]]
          });
      },
      error: err => console.log(err)
    });
  }

  quantityToAmount() {
    this.sellGoldForm.get("amount")?.setValue(Number(this.sellGoldForm.get("quantity")?.value) * this.virtualGold.branch.vendor.currentGoldPrice);
  }

  amountToQuantity() {
    this.sellGoldForm.get("quantity")?.setValue(Number(this.sellGoldForm.get("amount")?.value) / this.virtualGold.branch.vendor.currentGoldPrice);
  }

  roundToFloor(num: number) {
    return Math.floor(num);
  }

  handleSubmit() {
    if (this.sellGoldForm.valid) {
      this.userService.getUserByUserId(this.userId).subscribe({
        next: resp => {
          let currentUserBalance = resp.balance;
          this.virtualGoldService.updateVirtualGoldHolding(this.virtualGold.holdingId, { branchId: this.virtualGold.branch.branchId, quantity: this.virtualGold.quantity - this.sellGoldForm.value.quantity, userId: this.userId }).subscribe({
            next: resp => this.userService.updateBalance(this.userId, currentUserBalance + this.sellGoldForm.value.amount).subscribe({
              next: resp => this.transactionService.createTransaction({ ...this.sellGoldForm.value, branchId: this.virtualGold.branch.branchId, transactionStatus: 'SUCCESS', transactionType: 'SELL', userId: this.userId }).subscribe({
                next: resp => this.route.navigate(['/dashboard', this.userId]),
                error: err => console.log(err)
              }),
              error: err => console.log(err)
            }),
            error: err => console.log(err)
          });
        },
        error: err => console.log(err)
      });
    }
  }
}
