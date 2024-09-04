import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, Router } from '@angular/router';
import { TransactionService } from '../../services/transaction.service';
import { TransactionHistory } from '../../models/transaction-history';
import { jsPDF } from 'jspdf';
import autoTable from 'jspdf-autotable';
import * as XLSX from 'xlsx';

@Component({
  selector: 'app-transaction-history',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './transaction-history.component.html',
  styleUrl: './transaction-history.component.css'
})
export class TransactionHistoryComponent implements OnInit {
  userId!: number;
  transactionList!: TransactionHistory[];

  constructor(private route: ActivatedRoute, private transactionService: TransactionService) { }

  ngOnInit(): void {
    this.route.params.subscribe(params => this.userId = params['userId'])
    this.transactionService.getAllTransactionByUserId(this.userId).subscribe({
      next: resp => {
        this.transactionList = resp; console.log(resp);
      },
      error: err => console.log(err)
    });
  }

  exportPDF() {
    const doc = new jsPDF();
    doc.text("Transaction History", 14, 16);

    const tableBody = this.transactionList.map(transaction => [
      transaction.createdAt.toString(),
      transaction.transactionType,
      transaction.transactionStatus,
      transaction.quantity,
      `Rs. ${String(transaction.amount)}`
    ]);

    autoTable(doc, {
      head: [['Created At', 'Transaction Type', 'Transaction Status', 'Quantity (grams)', 'Amount']],
      body: tableBody,
      startY: 20,
      styles: { fontSize: 10 },
      columnStyles: {
        0: { cellWidth: 40 },
        1: { cellWidth: 30 },
        2: { cellWidth: 30 },
        3: { cellWidth: 30 },
        4: { cellWidth: 35 }
      }
    });

    doc.save('transaction_history.pdf');
  }

  exportExcel() {
    const tableBody = this.transactionList.map(transaction => [
      transaction.createdAt,
      transaction.transactionType,
      transaction.transactionStatus,
      transaction.quantity,
      transaction.amount
    ]);

    const ws = XLSX.utils.aoa_to_sheet([
      ['Created At', 'Transaction Type', 'Transaction Status', 'Quantity (grams)', 'Amount (₹)'],
      ...tableBody
    ]);

    const wb = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, 'Transaction History');
    XLSX.writeFile(wb, 'transaction_history.xlsx');
  }

}
