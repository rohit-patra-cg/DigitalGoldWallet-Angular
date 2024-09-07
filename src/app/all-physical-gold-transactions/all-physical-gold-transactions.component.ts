import { Component } from '@angular/core';
import { PhysicalGoldTransactionService } from '../services/physical-gold-transaction.service';
import { PhysicalGoldTransaction } from '../models/physical-gold-transaction';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-all-physical-gold-transactions',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './all-physical-gold-transactions.component.html',
  styleUrl: './all-physical-gold-transactions.component.css'
})
export class AllPhysicalGoldTransactionsComponent {
  constructor(private transactionService: PhysicalGoldTransactionService) { }

  transactionHistoryList!: PhysicalGoldTransaction[];

  ngOnInit(): void {
    this.transactionService.getAllPhysicalGoldTransactions().subscribe({
      next: resp => this.transactionHistoryList = resp,
      error: err => console.log(err)
    });
  }
}
