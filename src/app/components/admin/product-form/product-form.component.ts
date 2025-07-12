import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormBuilder, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { FormErrorComponent } from '../../comman/form-error/form-error.component';
import { ActivatedRoute, RouterModule } from '@angular/router';
import { ProductService } from '../../../services/product.service';
import { ProductCategoryService } from '../../../services/product-category.service';

@Component({
  selector: 'app-product-form',
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    FormErrorComponent,
    RouterModule,
  ],
  templateUrl: './product-form.component.html',
  styleUrl: './product-form.component.scss'
})
export class ProductFormComponent {

  productForm: any;
  disabledBtn = false;
  formValidationMessage: any;
  product: any;
  categoryList: any[] = [];

  constructor(
    private fb: FormBuilder,
    private productService: ProductService,
    private productCategoryService: ProductCategoryService,
    private route: ActivatedRoute,
  ) { 
    this.manageProductForm();
    this.initFormValidationMessages();
    this.checkIfEditMode();
  }

  async ngOnInit() {
    try {
      this.categoryList = await this.productCategoryService.getProductCategories();
    } catch (error) {
      
    }
  }

  manageProductForm() {
    this.productForm = this.fb.group({
      productName: ['', [Validators.required, Validators.minLength(3)]],
      productDescription: ['', [Validators.required, Validators.minLength(10)]],
      productCategory: ['', Validators.required],
      productPrice: ['', [Validators.required, Validators.min(1)]],
      productQuantity: ['', [Validators.required, Validators.min(1)]],
      productStatus: [true, Validators.required],
    });
  }

  initFormValidationMessages() {
    this.formValidationMessage = {
      productName: {
        required: 'Product name is required',
        minlength: 'Product name must be at least 3 characters',
      },
      productDescription: {
        required: 'Description is required',
        minlength: 'Description must be at least 10 characters',
      },
      productCategory: {
        required: 'Product category is required',
      },
      productPrice: {
        required: 'Product price is required',
        min: 'Product price must be at least 1',
      },
      productQuantity: {
        required: 'Product quantity is required',
        min: 'Product quantity must be at least 1',
      },
      productStatus: {
        required: 'Product status is required',
      },
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
      this.product = await this.productService.getProduct(Number(id));
      if (this.product) {
        this.productForm.patchValue({
          productName: this.product.productName,
          productDescription: this.product.productDescription,
          productCategory: this.product.productCategory,
          productPrice: this.product.productPrice,
          productQuantity: this.product.productQuantity,
          productStatus: this.product.productStatus,
        });
      }
    } catch (error) {
      console.error('Failed to fetch category details:', error);
    }
  }

  
  async onSubmit() {
    try {
      if (this.productForm.invalid) {
        this.productForm.markAllAsTouched();
        return;
      }

      this.disabledBtn = true;
      let result = await this.productService.createProduct(this.productForm.value);
      this.disabledBtn = false;
      console.log('Result:', result);
    } catch (error) {
      this.disabledBtn = false;
    }
  }

}
