import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { ProductService } from '../../../services/product.service';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-products',
  imports: [
    CommonModule,
    RouterModule,
  ],
  templateUrl: './products.component.html',
  styleUrl: './products.component.scss'
})
export class ProductsComponent {

  products: any;

  constructor(
    private productsService: ProductService,
  ) {}

  async ngOnInit() {
    try {
      this.products = await this.productsService.getProducts();
      console.log('Products:', this.products);
    } catch (error) {
      
    }
  }

  async deleteProduct(id: number) {
    console.log('Deleting Product:', id);
  }

}
