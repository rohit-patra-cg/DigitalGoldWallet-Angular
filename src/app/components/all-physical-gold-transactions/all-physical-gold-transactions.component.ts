import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PhysicalGoldTransactionService } from '../../services/physical-gold-transaction.service';
import { PhysicalGoldTransaction } from '../../models/physical-gold-transaction';
import { VendorBranch } from '../../models/vendor-branch';
import { Address } from '../../models/address';

@Component({
  selector: 'app-all-physical-gold-transactions',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './all-physical-gold-transactions.component.html',
  styleUrl: './all-physical-gold-transactions.component.css'
})
export class AllPhysicalGoldTransactionsComponent {
  constructor(private transactionService: PhysicalGoldTransactionService) { }

  transactionList!: PhysicalGoldTransaction[];
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

  exportPDF() {
    //TODO
  }

  exportExcel() {
    //TODO
  }
}
