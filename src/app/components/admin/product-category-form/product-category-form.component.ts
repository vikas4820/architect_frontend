import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormBuilder, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { FormErrorComponent } from '../../comman/form-error/form-error.component';
import { ProductCategoryService } from '../../../services/product-category.service';
import { ActivatedRoute, RouterModule } from '@angular/router';

@Component({
  selector: 'app-product-category-form',
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    FormErrorComponent,
    RouterModule,
  ],
  templateUrl: './product-category-form.component.html',
  styleUrl: './product-category-form.component.scss'
})
export class ProductCategoryFormComponent {

  productCategoryForm: any;
  disabledBtn = false;
  formValidationMessage: any;
  category: any;

  constructor(
    private fb: FormBuilder,
    private productCategoryService: ProductCategoryService,
    private route: ActivatedRoute,
  ) { 
    this.manageProductCategoryForm();
    this.initFormValidationMessages();
    this.checkIfEditMode();
  }

  manageProductCategoryForm() {
    this.productCategoryForm = this.fb.group({
      categoryName: ['', [Validators.required, Validators.minLength(3)]],
      description: ['', [Validators.required, Validators.minLength(10)]],
    });
  }

  initFormValidationMessages() {
    this.formValidationMessage = {
      categoryName: {
        required: 'Category name is required',
        minlength: 'Category name must be at least 3 characters',
      },
      description: {
        required: 'Description is required',
        minlength: 'Description must be at least 10 characters',
      }
    };
  }

  checkIfEditMode() {
    const id = this.route.snapshot.paramMap.get('id');
    if (id) {
      this.getCategoryDetails(id);
    }
  }

  async getCategoryDetails(id: string) {
    try {
      this.category = await this.productCategoryService.getCategory(Number(id));
      if (this.category) {
        this.productCategoryForm.patchValue({
          categoryName: this.category.categoryName,
          description: this.category.description,
        });
      }
    } catch (error) {
      console.error('Failed to fetch category details:', error);
    }
  }

  
  async onSubmit() {
    try {
      if (this.productCategoryForm.invalid) {
        this.productCategoryForm.markAllAsTouched();
        return;
      }

      this.disabledBtn = true;
      let result = await this.productCategoryService.createProductCategory(this.productCategoryForm.value);
      this.disabledBtn = false;
      console.log('Result:', result);
    } catch (error) {
      this.disabledBtn = false;
    }
  }
}
