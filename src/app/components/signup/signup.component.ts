import { Component } from '@angular/core';
import { Router, RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormGroup, FormBuilder, Validators } from '@angular/forms';
import { AddressService } from '../../services/address.service';
import { UserService } from '../../services/user.service';
import { Address } from '../../models/address';
import { Signup } from '../../models/signup';

@Component({
  selector: 'app-signup',
  standalone: true,
  imports: [RouterModule, CommonModule, ReactiveFormsModule],
  templateUrl: './signup.component.html',
  styleUrl: './signup.component.css'
})
export class SignupComponent {
  signUpForm!: FormGroup;

  constructor(private fb: FormBuilder, private addressService: AddressService, private userService: UserService, private router: Router) {
    this.signUpForm = this.fb.group({
      name: ['', [Validators.required]],
      email: ['', [Validators.required]],
      password: ['', [Validators.required]],
      confirmPassword: ['', [Validators.required]],
      balance: ['', [Validators.required]],
      street: ['', [Validators.required]],
      city: ['', [Validators.required]],
      state: ['', [Validators.required]],
      postalCode: ['', [Validators.required]],
      country: ['', [Validators.required]]
    })
  }

  signUpFormSubmit() {
    if (this.signUpForm.valid) {
      let address: Address = { ...this.signUpForm.value };
      this.addressService.createAddress(address).subscribe({
        next: response => {
          let signup: Signup = { ...this.signUpForm.value, addressId: response.entityId };
          this.userService.createUser(signup).subscribe({
            next: response => {
              console.log(response);
              this.router.navigate(["/login"]);
            },
            error: err => console.log(err)
          });
        },
        error: err => console.log(err)
      });
    }
  }
}
