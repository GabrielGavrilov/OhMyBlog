import { Component } from '@angular/core';
import { IdentityService } from '../../services/identity-service';
import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { LoginUser } from '../../models/User';
import { Router } from '@angular/router';

@Component({
  selector: 'app-auth-form',
  imports: [ReactiveFormsModule],
  templateUrl: './auth-form.html',
  styleUrl: './auth-form.scss',
})
export class AuthForm {
  formGroup = this.fb.group({
    email: [null, Validators.required],
    password: [null, Validators.required],
  });

  constructor(
    private fb: FormBuilder,
    private identityService: IdentityService,
    private router: Router
  ) {}

  login(): void {
    const loginUser: LoginUser = this.formGroup.getRawValue() as LoginUser;
    this.identityService.login(loginUser).subscribe({
      next: (token) => {
        console.log(token);
        this.router.navigateByUrl('/');
      },
      error: (err) => {
        console.log(err);
      },
    });
  }
}
