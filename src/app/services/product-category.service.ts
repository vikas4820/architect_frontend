import { Injectable } from '@angular/core';
import { BaseApiService } from './base-api.service';

@Injectable({
  providedIn: 'root'
})
export class ProductCategoryService extends BaseApiService {

  private readonly url = `product-category`;

  async createProductCategory(categoryFormData: any): Promise<any> {
    return await this.post(this.url, categoryFormData);
  }

  async getProductCategories(): Promise<any> {
    return await this.get(this.url);
  }

  async getCategory(categoryId: number): Promise<any> {
    return await this.get(`${this.url}/${categoryId}`);
  }
}
