import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { VendorBranch } from '../../models/vendor-branch';
import { VendorBranchService } from '../../services/vendor-branch.service';

@Component({
  selector: 'app-all-vendor-branches',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './all-vendor-branches.component.html',
  styleUrl: './all-vendor-branches.component.css'
})
export class AllVendorBranchesComponent implements OnInit{

  vendorBranchList!: VendorBranch[];

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

}
