import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { RouterModule, ActivatedRoute, Router } from '@angular/router';
import { UserService } from '../../services/user.service';
import { VirtualGoldHolding } from '../../models/virtual-gold-holding';
import { VitualGoldService } from '../../services/vitual-gold.service';

@Component({
  selector: 'app-convert-to-physical',
  standalone: true,
  imports: [ReactiveFormsModule, RouterModule],
  templateUrl: './convert-to-physical.component.html',
  styleUrl: './convert-to-physical.component.css'
})
export class ConvertToPhysicalComponent implements OnInit {
  userId!: 1;
  physicalForm!: FormGroup;
  virtualGold!: VirtualGoldHolding;

  constructor(private fb: FormBuilder, private virtualGoldService: VitualGoldService, private userService: UserService, private activatedRoute: ActivatedRoute, private route: Router) {
    this.physicalForm = fb.group({
      quantity: ['', [Validators.required]],
    })
  }

  ngOnInit(): void {
    this.activatedRoute.params.subscribe({
      next: resp => {
        if (resp && resp['userId']) {
          this.userId = resp['userId'];
        }
      },
      error: err => console.log(err)
    });
    this.userService.getAllVitualGoldHoldings(this.userId).subscribe({
      next: resp => this.virtualGold = resp[0],
      error: err => console.log(err)
    });
  }

  handleSubmit() {
    if (this.physicalForm.valid) {
      this.virtualGoldService.convertToPhysical(this.virtualGold.holdingId, this.physicalForm.value.quantity).subscribe({
        next: resp => this.route.navigate(['/dashboard', this.userId]),
        error: err => console.log(err)
      });
    }
  }
}
