import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { FormErrorComponent } from '../../comman/form-error/form-error.component';
import { RouterModule } from '@angular/router';
import { AuthService } from '../../../services/auth.service';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { JwtInterceptor } from '@auth0/angular-jwt';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [
    RouterModule,
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    FormErrorComponent,
  ],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss',
})
export class LoginComponent implements OnInit {

  loginForm: any;
  disableBtn: boolean = false;
  formValidationMessage: any;

  constructor(
    private readonly formBuilder: FormBuilder,
    private readonly authService: AuthService,
  ) {
    this.manageLoginForm();
    this.formValidationMessage = {
      email: {
        required: 'Email is required',
        email: 'Please enter a valid email address'
      },
      password: {
        required: 'Password is required',
        minlength: 'Password must be at least 6 characters'
      }
    };
  }

  async ngOnInit(){
    try {
      
    } catch (error) {
      console.log("ERROR", error);
    }
  }

  manageLoginForm(){
    this.loginForm = this.formBuilder.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]]
    });
  }

  async onSubmit() {
    if(this.loginForm.valid) {
      try {
        let result = await this.authService.login(this.loginForm.value);
        console.log("result", result);
      } catch (error) {
        
      }
    } else {
      this.loginForm.markAllAsTouched();
    }
  }

}
