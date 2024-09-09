import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PhysicalGoldTransactionService } from '../../services/physical-gold-transaction.service';
import { PhysicalGoldTransaction } from '../../models/physical-gold-transaction';
import { VendorBranch } from '../../models/vendor-branch';
import { Address } from '../../models/address';
import { jsPDF } from 'jspdf';
import autoTable from 'jspdf-autotable';
import * as XLSX from 'xlsx';
import { RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-all-physical-gold-transactions',
  standalone: true,
  imports: [CommonModule,RouterModule,FormsModule],
  templateUrl: './all-physical-gold-transactions.component.html',
  styleUrl: './all-physical-gold-transactions.component.css'
})

export class AllPhysicalGoldTransactionsComponent {
  transactionList!: PhysicalGoldTransaction[];

  constructor(private transactionService: PhysicalGoldTransactionService) { }

  branch: VendorBranch = {
    branchId: -1,
    createdAt: new Date(),
    quantity: -1,
    address: { addressId: -1, city: "", country: "", state: "", street: "", postalCode: "" },
    vendor: { contactEmail: "", contactPersonName: "", createdAt: new Date(), description: "", vendorId: -1, totalGoldQuantity: -1, currentGoldPrice: -1, contactPhone: "", vendorName: "", websiteUrl: "" }
  };

  ngOnInit(): void {
    this.transactionService.getAllPhysicalGoldTransactions().subscribe({
      next: resp => this.transactionList = resp,
      error: err => console.log(err)
    });
  }

  commaSeparatedString(address: Address) {
    return `${address.street}, ${address.city}, ${address.state}, ${address.country}, PIN-${address.postalCode}`
  }

  setBranchOnViewDetailsClick(branch: VendorBranch) {
    this.branch = branch;
  }
  convertDateTimeToDateString(date: Date): string {
    return String(date)?.replace(/T.*/, '');
  }

  exportPDF() {
    const doc = new jsPDF();
    doc.text("AllPhysicalGoldTransactions", 14, 16);

    const tableBody = this.transactionList.map(txn => [
      txn.createdAt ? txn.createdAt.toString() : 'No Date',
      txn.quantity.toString(),
      txn.deliveryAddress ? `${txn.deliveryAddress.street}, ${txn.deliveryAddress.city}, ${txn.deliveryAddress.state}, ${txn.deliveryAddress.country}` : 'No Address',
      txn.branch ? txn.branch.branchId.toString() : 'No Branch',
    ]);

    autoTable(doc, {
      head: [['Created At', 'Quantity (grams)', 'Delivery Address', 'Branch']],
      body: tableBody,
      startY: 20,
    });

    doc.save('all-physical-gold-transactions.pdf'); 
}

  

  exportExcel() {
    const tableBody = this.transactionList.map(physicalgoldtxnlist => [
      physicalgoldtxnlist.createdAt,
      this.commaSeparatedString(physicalgoldtxnlist.deliveryAddress),
      physicalgoldtxnlist.quantity      
    ]);

    const ws = XLSX.utils.aoa_to_sheet([
      ['Created At', 'Delivery Address', 'Quantity (grams)'],
      ...tableBody
    ]);

    const wb = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, 'Physical Gold Transaction');
    XLSX.writeFile(wb, 'all-physical-gold-transaction-history.xlsx');
  }

}
