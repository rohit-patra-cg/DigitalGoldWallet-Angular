import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { PhysicalGoldTransaction } from '../../models/physical-gold-transaction';
import { UserService } from '../../services/user.service';
import { ActivatedRoute } from '@angular/router';
import { VendorBranch } from '../../models/vendor-branch';
import { Address } from '../../models/address';
import jsPDF from 'jspdf';
import autoTable from 'jspdf-autotable';
import * as XLSX from 'xlsx';

@Component({
  selector: 'app-physical-gold-transaction',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './physical-gold-transaction.component.html',
  styleUrl: './physical-gold-transaction.component.css'
})
export class PhysicalGoldTransactionComponent implements OnInit {
  transactionList!: PhysicalGoldTransaction[];
  userId!: number;
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
  constructor(private userService: UserService, private router: ActivatedRoute) { }
  
  ngOnInit(): void {
    this.router.params.subscribe({
      next: params => this.userId = params['userId'],
      error: err => console.log(err)
    });
    this.userService.getAllPhysicalGoldTransactions(this.userId).subscribe({
      next: resp => this.transactionList = resp,
      error: err => console.log(err)
    });
  }
  exportPDF() {
    const doc = new jsPDF();
    doc.text("PhysicalGoldTransaction", 14, 16);

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

    doc.save('PhysicalGoldTransactions.pdf');
  }
 
  exportExcel() {
    const transactions = this.transactionList.map(txn => {
      const createdAt = txn.createdAt instanceof Date ? txn.createdAt.toLocaleString() : 'Invalid Date';
      return {
        'Created At': createdAt,
        'Quantity (grams)': txn.quantity || 'N/A',
        'Delivery Address': this.commaSeparatedString(txn.deliveryAddress) || 'N/A',
        'Branch Details': txn.branch?.vendor?.vendorName || 'N/A',
      };
    });
  
    const ws: XLSX.WorkSheet = XLSX.utils.json_to_sheet(transactions);
    
    ws['!cols'] = [
      { wch: 30 },
      { wch: 15 },
      { wch: 30 },
      { wch: 25 }
    ];
  
    const wb: XLSX.WorkBook = XLSX.utils.book_new();
    
    XLSX.utils.book_append_sheet(wb, ws, 'PhysicalGoldTransactions');
    XLSX.writeFile(wb, 'all-physical-gold-transactions.xlsx');
  }
  
  
  

  commaSeparatedString(address: Address) {
    return `${address.street}, ${address.city}, ${address.state}, ${address.country}, PIN-${address.postalCode}`
  }

  setBranchOnViewDetailsClick(branch: VendorBranch) {
    this.branch = branch;
  }

  handleApplyFilterClick() {
    
  }

  updateFilterOptions() {}

  convertDateTimeToDateString(date: Date): string {
    return String(date)?.replace(/T.*/, '');
  }
}
