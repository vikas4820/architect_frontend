import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormBuilder, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { FormErrorComponent } from '../../comman/form-error/form-error.component';

@Component({
  selector: 'app-forget-password',
  imports: [
    CommonModule,
    RouterModule,
    FormsModule,
    ReactiveFormsModule,
    FormErrorComponent,
  ],
  templateUrl: './forget-password.component.html',
  styleUrl: './forget-password.component.scss'
})
export class ForgetPasswordComponent {

  forgetPassowrdForm: any;
  formValidationMessage: any;
  disableBtn: boolean = false;

  constructor(
    private readonly fb: FormBuilder,
  ){
    this.forgetPassowrdForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
    })

    this.formValidationMessage = {
      email: {
        required: 'Email is required',
        email: 'Please enter a valid email address'
      },
    }
  }

  async onSubmit() {
    if(this.forgetPassowrdForm.valid) {
      console.log("FORM_VALUES", this.forgetPassowrdForm.value);
    } else {
      this.forgetPassowrdForm.markAllAsTouched();
    }
  }

}
