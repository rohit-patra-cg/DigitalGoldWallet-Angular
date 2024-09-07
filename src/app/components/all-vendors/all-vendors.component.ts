import { Component, OnInit } from '@angular/core';
import { Vendor } from '../../models/vendor';
import { VendorService } from '../../services/vendor.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-all-vendors',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './all-vendors.component.html',
  styleUrl: './all-vendors.component.css'
})
export class AllVendorsComponent implements OnInit {

  vendorList!: Vendor[];
  
  constructor(private vendorService: VendorService) { }

  ngOnInit(): void {
    this.vendorService.getAllVendors().subscribe({
      next: resp => {
        this.vendorList = resp;
        console.log(resp);
      },
      error: err => console.log(err)
    });
  }
  convertDateTimeToDateString(date: Date): string {
    return String(date)?.replace(/T.*/, '');
  }
}
