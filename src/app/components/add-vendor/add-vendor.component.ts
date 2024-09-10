import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { VendorService } from '../../services/vendor.service';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { Vendor } from '../../models/vendor';

@Component({
  selector: 'app-add-vendor',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, RouterModule],
  templateUrl: './add-vendor.component.html',
  styleUrl: './add-vendor.component.css'
})

export class AddVendorComponent implements OnInit {
  addVendorForm!: FormGroup;
  vendorId!: number;
  vendor!: Vendor;

  constructor(private fb: FormBuilder, private vendorService: VendorService, private router: Router, private activatedRoute: ActivatedRoute) {
    this.addVendorForm = this.fb.group({
      vendorName: ['', [Validators.required]],
      description: ['', [Validators.required]],
      contactPersonName: ['', [Validators.required]],
      contactEmail: ['', [Validators.required, Validators.email]],
      contactPhone: ['', [Validators.required]],
      websiteUrl: ['', [Validators.required]],
      totalGoldQuantity: ['', [Validators.required, Validators.min(1)]],
      currentGoldPrice: ['', [Validators.required, Validators.min(5000)]],
    });
  }

  ngOnInit(): void {
    this.activatedRoute.params.subscribe({
      next: resp => {
        if (resp && resp['vendorId']) {
          this.vendorId = resp['vendorId'];
          this.vendorService.getVendorByVendorId(this.vendorId).subscribe({
            next: resp => {
              this.vendor = resp;
              this.addVendorForm = this.fb.group({
                vendorName: [this.vendor.vendorName, [Validators.required]],
                description: [this.vendor.description, [Validators.required]],
                contactPersonName: [this.vendor.contactPersonName, [Validators.required]],
                contactEmail: [this.vendor.contactEmail, [Validators.required, Validators.email]],
                contactPhone: [this.vendor.contactPhone, [Validators.required]],
                websiteUrl: [this.vendor.websiteUrl, [Validators.required]],
                totalGoldQuantity: [this.vendor.totalGoldQuantity, [Validators.required, Validators.min(1)]],
                currentGoldPrice: [this.vendor.currentGoldPrice, [Validators.required, Validators.min(5000)]],
              });
            },
            error: err => console.log(err)
          });
        }
      },
      error: err => console.log(err)
    });
  }

  handleSubmit() {
    if (this.addVendorForm.valid) {
      let vendor!: Vendor;
      if (this.vendor) {
        vendor = { ...this.addVendorForm.value, vendorId: this.vendorId };
      } else {
        vendor = { ...this.addVendorForm.value };
      }
      this.vendorService.addVendor(vendor).subscribe({
        next: resp => this.router.navigate(["/all-vendors"]),
        error: err => console.log(err)
      });
    }
  }
}
