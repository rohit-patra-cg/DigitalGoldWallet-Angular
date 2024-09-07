import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TransactionHistory } from '../models/transaction-history';
import { TransactionService } from '../services/transaction.service';

@Component({
  selector: 'app-all-transaction-history',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './all-transaction-history.component.html',
  styleUrl: './all-transaction-history.component.css'
})
export class AllTransactionHistoryComponent implements OnInit {
  constructor(private transactionService: TransactionService) { }

  transactionHistoryList!: TransactionHistory[];

  ngOnInit(): void {
    this.transactionService.getAllTransactions().subscribe({
      next: resp => this.transactionHistoryList = resp,
      error: err => console.log(err)
    });
  }
}
