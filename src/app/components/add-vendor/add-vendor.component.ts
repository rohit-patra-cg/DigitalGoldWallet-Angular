import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { VendorService } from '../../services/vendor.service';
import { Router, RouterModule } from '@angular/router';
import { Vendor } from '../../models/vendor';

@Component({
  selector: 'app-add-vendor',
  standalone: true,
  imports: [CommonModule,ReactiveFormsModule,RouterModule],
  templateUrl: './add-vendor.component.html',
  styleUrl: './add-vendor.component.css'
})

export class AddVendorComponent { 
  addVendorForm!: FormGroup;
  constructor(private fb: FormBuilder,private vendorService: VendorService, private router: Router) { 
    this.addVendorForm = this.fb.group({
      vendorName: ['', [Validators.required]],
      description: ['', [Validators.required]],
      contactPersonName: ['', [Validators.required]],
      contactEmail: ['', [Validators.required]],
      contactPhone: ['', [Validators.required]],
      websiteUrl : ['', [Validators.required]],
      totalGoldQuantity: ['', [Validators.required]],
      currentGoldPrice: ['', [Validators.required]],
    });  
  }
  addVendorFormSubmit() { 
  if(this.addVendorForm.valid){
    let vendor: Vendor = { ...this.addVendorForm.value };
    this.vendorService.addVendor(vendor).subscribe({
      next: response => this.router.navigate(["/all-vendors"]),
      error: err => console.log(err)
    })
  }
}
}
