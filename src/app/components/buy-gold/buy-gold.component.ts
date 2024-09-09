import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { RouterModule, ActivatedRoute, Router } from '@angular/router';
import { UserService } from '../../services/user.service';
import { VirtualGoldHolding } from '../../models/virtual-gold-holding';
import { VitualGoldService } from '../../services/vitual-gold.service';
import { CommonModule } from '@angular/common';
import { User } from '../../models/user';
import { VendorService } from '../../services/vendor.service';
import { TransactionService } from '../../services/transaction.service';

@Component({
  selector: 'app-buy-gold',
  standalone: true,
  imports: [CommonModule, RouterModule, ReactiveFormsModule, FormsModule],
  templateUrl: './buy-gold.component.html',
  styleUrl: './buy-gold.component.css'
})
export class BuyGoldComponent implements OnInit {
  userId!: number;
  buyGoldForm!: FormGroup;
  virtualGold!: VirtualGoldHolding //= {branch: {address:{addressId:-1,city:'', country:'', postalCode: '', street: '', state: ''}, branchId: -1, createdAt: new Date(), quantity:-1,vendor: {contactEmail:'',contactPersonName:'',contactPhone:'', createdAt: new Date(),currentGoldPrice:-1,totalGoldQuantity:-1, description: '',vendorId: -1, }} };

  constructor(private fb: FormBuilder, private virtualGoldService: VitualGoldService, private userService: UserService, private transactionService: TransactionService, private activatedRoute: ActivatedRoute, private route: Router) {
    this.buyGoldForm = this.fb.group({
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
        if (resp.length !== 0) {
          this.virtualGold = resp[0];
        }
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
            error: err => console.log(err)
          });
          this.virtualGoldService.updateVirtualGoldHolding(this.virtualGold.holdingId, { branchId: this.virtualGold.branch.branchId, quantity: this.buyGoldForm.value.quantity, userId: this.userId }).subscribe({
            error: err => console.log(err)
          });
          this.transactionService.createTransaction({ ...this.buyGoldForm.value, branchId: this.virtualGold.branch.branchId, transactionStatus: 'SUCCESS', transactionType: 'BUY', userId: this.userId }).subscribe({
            next: resp => this.route.navigate(['/dashboard', this.userId]),
            error: err => console.log(err)
          })
        },
        error: err => console.log(err)
      });
    }
  }
}
