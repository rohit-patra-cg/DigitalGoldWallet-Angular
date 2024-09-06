import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, Router } from '@angular/router';
import { TransactionService } from '../../services/transaction.service';
import { TransactionHistory } from '../../models/transaction-history';
import { jsPDF } from 'jspdf';
import autoTable from 'jspdf-autotable';
import * as XLSX from 'xlsx';
import { VendorBranch } from '../../models/vendor-branch';
import { Address } from '../../models/address';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-transaction-history',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './transaction-history.component.html',
  styleUrl: './transaction-history.component.css'
})
export class TransactionHistoryComponent implements OnInit {
  userId!: number;
  transactionList!: TransactionHistory[];
  branch: VendorBranch = {
    branchId: -1,
    createdAt: new Date(),
    quantity: -1,
    address: { addressId: -1, city: "", country: "", state: "", street: "", postalCode: "" },
    vendor: { contactEmail: "", contactPersonName: "", createdAt: new Date(), description: "", vendorId: -1, totalGoldQuantity: -1, currentGoldPrice: -1, contactPhone: "", vendorName: "", websiteUrl: "" }
  };

  typeFilter: string = "select";
  filterName: string = "select"
  filterOptions: string[] = [];

  constructor(private route: ActivatedRoute, private transactionService: TransactionService) { }

  ngOnInit(): void {
    this.route.params.subscribe(params => this.userId = params['userId'])
    this.transactionService.getAllTransactionByUserId(this.userId).subscribe({
      next: resp => this.transactionList = resp,
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

  setBranchOnViewDetailsClick(branch: VendorBranch) {
    this.branch = branch;
  }

  commaSeparatedString(address: Address) {
    return `${address.street}, ${address.city}, ${address.state}, ${address.country}, PIN-${address.postalCode}`
  }

  updateFilterOptions() {
    if (this.typeFilter === "select") {
      this.filterOptions = []
      this.filterName = "select"
    }
    else if (this.typeFilter === "transactionType") {
      this.filterOptions = ["BUY", "SELL", "CONVERT_TO_PHYSICAL"];
    }
    else if (this.typeFilter === "transactionStatus") {
      this.filterOptions = ["SUCCESS", "FAILED"];
    }
  }

  filterByTransactionStatus() {
    if (this.filterName !== 'select') {
      this.transactionService.getAllTransactionByUserId(this.userId).subscribe({
        next: resp => this.transactionList = resp.filter(txn => txn.transactionStatus === this.filterName),
        error: err => console.log(err)
      })
    }
  }

  filterByTransactionType() {
    if (this.filterName !== 'select') {
      this.transactionService.getAllTransactionByUserId(this.userId).subscribe({
        next: resp => this.transactionList = resp.filter(txn => txn.transactionType === this.filterName),
        error: err => console.log(err)
      })
    }
  }

  handleApplyFilterClick() {
    if (this.typeFilter === 'transactionStatus') {
      this.filterByTransactionStatus();
    } else if (this.typeFilter === 'transactionType') {
      this.filterByTransactionType();
    }
  }

}
