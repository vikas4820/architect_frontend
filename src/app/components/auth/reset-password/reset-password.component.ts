import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import {
  FormBuilder,
  Validators,
  FormsModule,
  ReactiveFormsModule,
} from '@angular/forms';
import { RouterModule } from '@angular/router';
import { FormErrorComponent } from '../../comman/form-error/form-error.component';

@Component({
  selector: 'app-reset-password',
  standalone: true,
  imports: [
    CommonModule,
    RouterModule,
    FormsModule,
    ReactiveFormsModule,
    FormErrorComponent,
  ],
  templateUrl: './reset-password.component.html',
  styleUrl: './reset-password.component.scss',
})
export class ResetPasswordComponent {
  resetPasswordForm: any;
  disableBtn: boolean = false;
  formValidationMessage: any;

  constructor(private readonly fb: FormBuilder) {
    this.manageForm();
    this.formValidationMessage = {
      newPassword: {
        required: 'New password is required',
        minlength: 'New password must be at least 6 characters',
      },
      confirmPassword: {
        required: 'Confirm password is required',
        passwordMismatch: 'Passwords do not match',
      },
    };
  }

  manageForm() {
    this.resetPasswordForm = this.fb.group(
      {
        newPassword: ['', [Validators.required, Validators.minLength(6)]],
        confirmPassword: ['', [Validators.required]],
      },
      {
        validators: this.passwordsMatchValidator,
      }
    );
  }

  passwordsMatchValidator(formGroup: any) {
    const passwordControl = formGroup.get('newPassword');
    const confirmPasswordControl = formGroup.get('confirmPassword');

    if (!passwordControl || !confirmPasswordControl) return null;

    const password = passwordControl.value;
    const confirmPassword = confirmPasswordControl.value;

    if (password !== confirmPassword) {
      confirmPasswordControl.setErrors({ passwordMismatch: true });
      return { passwordMismatch: true };
    } else {
      // If other validators exist, don't remove them
      if (confirmPasswordControl.hasError('passwordMismatch')) {
        delete confirmPasswordControl.errors?.['passwordMismatch'];
        if (Object.keys(confirmPasswordControl.errors || {}).length === 0) {
          confirmPasswordControl.setErrors(null);
        }
      }
      return null;
    }
  }

  async onSubmit() {
    if (this.resetPasswordForm.valid) {
      console.log('Reset Password Form Value:', this.resetPasswordForm.value);
      // Add API logic here
    } else {
      this.resetPasswordForm.markAllAsTouched();
    }
  }
}
