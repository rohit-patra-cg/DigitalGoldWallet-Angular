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
  isSignUpFailed: boolean = false;

  constructor(private fb: FormBuilder, private addressService: AddressService, private userService: UserService, private router: Router) {
    this.signUpForm = this.fb.group({
      name: ['', [Validators.required, Validators.minLength(1)]],
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.pattern(/(?=.*\d)(?=.*[@$#!%*?&])[A-Za-z\d@$!#%*?&]{8,}$/)]],
      confirmPassword: ['', [Validators.required, Validators.pattern(/(?=.*\d)(?=.*[@$#!%*?&])[A-Za-z\d@$!#%*?&]{8,}$/)]],
      balance: ['', [Validators.required, Validators.min(0)]],
      street: ['', [Validators.required, Validators.minLength(1)]],
      city: ['', [Validators.required, Validators.minLength(1)]],
      state: ['', [Validators.required, Validators.minLength(1)]],
      postalCode: ['', [Validators.required, Validators.minLength(1)]],
      country: ['', [Validators.required, Validators.minLength(2)]]
    })
  }

  signUpFormSubmit() {
    if (this.signUpForm.valid && this.signUpForm.value.password === this.signUpForm.value.confirmPassword) {
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
    this.isSignUpFailed = true;
  }
}
