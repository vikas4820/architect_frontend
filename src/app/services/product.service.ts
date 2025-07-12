import { Injectable } from '@angular/core';
import { BaseApiService } from './base-api.service';

@Injectable({
  providedIn: 'root'
})
export class ProductService extends BaseApiService {

  private readonly url = `product`;

  async createProduct(productFormData: any): Promise<any> {
    return await this.post(this.url, productFormData);
  }

  async getProducts(): Promise<any> {
    return await this.get(this.url);
  }

  async getProduct(categoryId: number): Promise<any> {
    return await this.get(`${this.url}/${categoryId}`);
  }
}
