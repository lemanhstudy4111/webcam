import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ButtonModule } from 'primeng/button';
import { InputTextModule } from 'primeng/inputtext';
import { PasswordModule } from 'primeng/password';
import { CardModule } from 'primeng/card';
import { CheckboxModule } from 'primeng/checkbox';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-signup',
  standalone: true,
  imports: [InputTextModule, PasswordModule, ButtonModule, CardModule, CheckboxModule, RouterLink],
  templateUrl: './signup.component.html',
  styleUrl: './signup.component.css',
})
export class SignupComponent implements OnInit {
  signupForm!: FormGroup;
  submitted: boolean = false;
  checked: boolean = false;
  ngOnInit(): void {
    this.signupForm = new FormGroup({
      signup: new FormControl('', Validators.required),
      password: new FormControl('', Validators.required),
      checkbox: new FormControl(false, Validators.requiredTrue)
    });
  }
  onSubmit(): void {
    this.submitted = true;
  }
}
