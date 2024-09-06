import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { PhysicalGoldTransaction } from '../../models/physical-gold-transaction';
import { UserService } from '../../services/user.service';
import { ActivatedRoute } from '@angular/router';
import { VendorBranch } from '../../models/vendor-branch';
import { Address } from '../../models/address';

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
    //TODO
  }

  exportExcel() {
    //TODO
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
}