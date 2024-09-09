import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { User } from '../../models/user';
import { UserService } from '../../services/user.service';
import jsPDF from 'jspdf';
import autoTable from 'jspdf-autotable';
import * as XLSX from 'xlsx';

@Component({
  selector: 'app-all-users',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './all-users.component.html',
  styleUrl: './all-users.component.css'
})
export class AllUsersComponent implements OnInit {
  userList!: User[];

  constructor(private userService: UserService) { }

  ngOnInit(): void {
    this.userService.getAllUsers().subscribe({
      next: resp => {
        this.userList = resp;
        console.log(resp);
      },
      error: err => console.log(err)
    });
  }

  convertDateTimeToDateString(date: Date): string {
    return String(date)?.replace(/T.*/, '');
  }

  exportPDF() {
    const doc = new jsPDF();
    doc.text("All Users List", 14, 16);

    const tableBody = this.userList.map(usr => [
      usr.name,
      usr.email,
      usr.address.state,
      usr.balance,
      usr.createdAt.toString()
    ]);

    autoTable(doc, {
      head: [['Name', 'Email', 'Address','Balance', 'Member Since']],
      body: tableBody,
      startY: 20,
      styles: { fontSize: 10 },
      
    });

    doc.save('all-users-list.pdf');
  }
 
  exportExcel() {
    const tableBody = this.userList.map(usr => [
      usr.name,
      usr.email,
      usr.address.state,
      usr.balance,
      usr.createdAt.toString()
    ]);

    const ws = XLSX.utils.aoa_to_sheet([
      ['Name', 'Email', 'Address','Balance', 'Member Since'],
      ...tableBody
    ]);

    const wb = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, 'All Users List');
    XLSX.writeFile(wb, 'all-users-List.xlsx');
  }
  
}
