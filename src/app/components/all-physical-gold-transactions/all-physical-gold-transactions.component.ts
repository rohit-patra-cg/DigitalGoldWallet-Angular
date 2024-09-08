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
    // const doc = new jsPDF();
    // doc.text("All Physical Gold Transactions", 14, 16);

    // const tableBody = this.transactionList.map(physicalgoldtxnlist => [
    //   physicalgoldtxnlist.createdAt instanceof Date ? physicalgoldtxnlist.createdAt.toLocaleDateString() : physicalgoldtxnlist.createdAt,
    //   physicalgoldtxnlist.deliveryAddress,
    //   physicalgoldtxnlist.quantity.toString(), // Ensure quantity is a string
    // ]);

    // autoTable(doc, {
    //   head: [['Created At', 'Delivery Address', 'Quantity (grams)']],
    //   body: tableBody,
    //   startY: 20,
    //   styles: { fontSize: 10 },
    //   columnStyles: {
    //     0: { cellWidth: 40 },
    //     1: { cellWidth: 90 }, // Adjust as necessary
    //     2: { cellWidth: 30 },
    //   }
    // });

    // doc.save('all-physical-gold-transaction-history.pdf');
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
