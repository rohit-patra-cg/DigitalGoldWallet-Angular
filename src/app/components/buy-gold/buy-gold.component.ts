import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { RouterModule, ActivatedRoute, Router } from '@angular/router';
import { UserService } from '../../services/user.service';
import { VirtualGoldHolding } from '../../models/virtual-gold-holding';
import { VitualGoldService } from '../../services/vitual-gold.service';
import { CommonModule } from '@angular/common';
import { TransactionService } from '../../services/transaction.service';

@Component({
  selector: 'app-buy-gold',
  standalone: true,
  imports: [CommonModule, RouterModule, ReactiveFormsModule],
  templateUrl: './buy-gold.component.html',
  styleUrl: './buy-gold.component.css'
})
export class BuyGoldComponent implements OnInit {
  userId!: number;
  buyGoldForm: FormGroup = new FormGroup({
    amount: new FormControl(),
    quantity: new FormControl(),
  });
  virtualGold!: VirtualGoldHolding;

  constructor(private fb: FormBuilder, private virtualGoldService: VitualGoldService, private userService: UserService, private transactionService: TransactionService, private activatedRoute: ActivatedRoute, private route: Router) { }

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
        this.buyGoldForm = this.fb.group({
          amount: ['', [Validators.required, Validators.max(this.virtualGold.user.balance)]],
          quantity: ['', [Validators.required, Validators.max(this.virtualGold.branch.quantity)]]
        });
      },
      error: err => console.log(err)
    });
  }

  quantityToAmount() {
    this.buyGoldForm.get("amount")?.setValue(Number(this.buyGoldForm.get("quantity")?.value) * this.virtualGold.branch.vendor.currentGoldPrice);
  }

  amountToQuantity() {
    this.buyGoldForm.get("quantity")?.setValue(Number(this.buyGoldForm.get("amount")?.value) / this.virtualGold.branch.vendor.currentGoldPrice);
  }

  handleSubmit() {
    if (this.buyGoldForm.valid) {
      this.userService.getUserByUserId(this.userId).subscribe({
        next: resp => {
          let currentUserBalance = resp.balance;
          this.userService.updateBalance(this.userId, currentUserBalance - this.buyGoldForm.value.amount).subscribe({
            next: resp => this.virtualGoldService.updateVirtualGoldHolding(this.virtualGold.holdingId, { branchId: this.virtualGold.branch.branchId, quantity: this.virtualGold.quantity + this.buyGoldForm.value.quantity, userId: this.userId }).subscribe({
              next: resp => this.transactionService.createTransaction({ ...this.buyGoldForm.value, branchId: this.virtualGold.branch.branchId, transactionStatus: 'SUCCESS', transactionType: 'BUY', userId: this.userId }).subscribe({
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
