import { Component, OnInit } from '@angular/core';
import { Vendor } from '../../models/vendor';
import { VendorService } from '../../services/vendor.service';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import * as XLSX from 'xlsx';
import { FormsModule } from '@angular/forms';
import jsPDF from 'jspdf';
import autoTable from 'jspdf-autotable';

@Component({
  selector: 'app-all-vendors',
  standalone: true,
  imports: [CommonModule,RouterModule,FormsModule],
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
  
  exportExcel() {
    const tableBody = this.vendorList.map(vendorlist => [
      vendorlist.vendorName,
      vendorlist.description,
      vendorlist.contactPersonName,
      vendorlist.contactPhone,
      vendorlist.contactEmail,
      vendorlist.currentGoldPrice,
      vendorlist.totalGoldQuantity
    ]);

    const ws = XLSX.utils.aoa_to_sheet([
      ['Vendor Name', 'Description', 'Contact Person Name', 'Phone', 'Email','Gold Transaction','Quantity'],
      ...tableBody
    ]);

    const wb = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, 'Vendor List');
    XLSX.writeFile(wb, 'Vendor_list.xlsx');
  }
  exportPDF() {
    const doc = new jsPDF();
    doc.text("Vendor List", 14, 16);

    const tableBody = this.vendorList.map(vendorlist => [
      vendorlist.vendorName,
      vendorlist.contactPersonName,
      vendorlist.contactPhone,
      vendorlist.contactEmail,
      vendorlist.currentGoldPrice,
      vendorlist.totalGoldQuantity
    ]);

    autoTable(doc, {
      head: [['Vendor Name', 'Contact Person Name', 'Phone ', 'Email' , 'Current Gold Price' , 'Total Gold']],
      body: tableBody,
      startY: 20,
      styles: { fontSize: 10 },
      columnStyles: {
        0: { cellWidth: 40 },
        1: { cellWidth: 30 },
        2: { cellWidth: 30 },
        3: { cellWidth: 30 },
        4: { cellWidth: 35 }
      }
    });

    doc.save('VendorList.pdf');
  }

}
