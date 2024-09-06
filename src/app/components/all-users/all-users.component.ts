import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { User } from '../../models/user';
import { UserService } from '../../services/user.service';

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
}
