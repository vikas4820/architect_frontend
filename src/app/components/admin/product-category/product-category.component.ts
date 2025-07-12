import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { ProductCategoryService } from '../../../services/product-category.service';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-product-category',
  imports: [
    CommonModule,
    RouterModule,
  ],
  templateUrl: './product-category.component.html',
  styleUrl: './product-category.component.scss'
})
export class ProductCategoryComponent {

  productCategories: any[] = [];
  
  constructor(
    private productCategoryService: ProductCategoryService,
  ) {}

  async ngOnInit() {
    try {
      this.productCategories = await this.productCategoryService.getProductCategories();
      console.log('Product Categories:', this.productCategories);
    } catch (error) {
      
    }
  }

  async deleteProductCategory(id: number) {
    try {
      console.log('Deleting Product Category:', id);
    } catch (error) {
      
    }
  }

}
