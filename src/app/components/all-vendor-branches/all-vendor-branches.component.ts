import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { VendorBranch } from '../../models/vendor-branch';
import { VendorBranchService } from '../../services/vendor-branch.service';
import { Address } from '../../models/address';

@Component({
  selector: 'app-all-vendor-branches',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './all-vendor-branches.component.html',
  styleUrl: './all-vendor-branches.component.css'
})

export class AllVendorBranchesComponent implements OnInit{

  vendorBranchList!: VendorBranch[];

  branch: VendorBranch = {
    branchId: -1,
    createdAt: new Date(),
    quantity: -1,
    address: { addressId: -1, city: "", country: "", state: "", street: "", postalCode: "" },
    vendor: { contactEmail: "", contactPersonName: "", createdAt: new Date(), description: "", vendorId: -1, totalGoldQuantity: -1, currentGoldPrice: -1, contactPhone: "", vendorName: "", websiteUrl: "" }
  };

  constructor(private vendorBranchService: VendorBranchService) { }
  ngOnInit(): void {
    this.vendorBranchService.getAllVendorBranches().subscribe({
      next: resp => {
        this.vendorBranchList = resp;
        console.log(resp);
      },
      error: err => console.log(err)
    });
  }
  
  convertDateTimeToDateString(date: Date): string {
    return String(date)?.replace(/T.*/, '');
  }
  
  setBranchOnViewDetailsClick(branch: VendorBranch) {
    this.branch = branch;
  }

  commaSeparatedString(address: Address) {
    return `${address.street}, ${address.city}, ${address.state}, ${address.country}, PIN-${address.postalCode}`
  }

}
