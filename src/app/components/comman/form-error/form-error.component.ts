import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';
import { AbstractControl } from '@angular/forms';

@Component({
  selector: 'app-form-error',
  imports: [
    CommonModule
  ],
  templateUrl: './form-error.component.html',
  styleUrl: './form-error.component.scss'
})
export class FormErrorComponent {
  @Input() control!: AbstractControl | null;
  @Input() messages: { [key: string]: string } = {};

  get errorKeys(): string[] {
    return this.control && this.control.errors ? Object.keys(this.control.errors) : [];
  }
}
