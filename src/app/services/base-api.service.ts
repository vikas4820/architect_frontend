// src/app/core/services/base-api.service.ts
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { firstValueFrom } from 'rxjs';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root',
})
export class BaseApiService {
  private http = inject(HttpClient);
  protected baseUrl = environment.apiUrl;

  constructor() {}

  protected buildUrl(endpoint: string): string {
    return `${this.baseUrl}/${endpoint}`;
  }

  protected buildHeaders(): HttpHeaders {
    return new HttpHeaders({
      'Content-Type': 'application/json',
      // Add token if needed
    });
  }

  protected buildParams(params: any): HttpParams {
    let httpParams = new HttpParams();
    Object.entries(params || {}).forEach(([key, value]) => {
      if (value !== null && value !== undefined) {
        httpParams = httpParams.set(key, String(value)); // 👈 Cast to string
      }
    });
    return httpParams;
  }

  protected async get<T>(endpoint: string, params?: any): Promise<T> {
    const url = this.buildUrl(endpoint);
    const options = {
      headers: this.buildHeaders(),
      params: this.buildParams(params),
    };
    return await firstValueFrom(this.http.get<T>(url, options));
  }

  protected async post<T>(endpoint: string, body: any): Promise<T> {
    const url = this.buildUrl(endpoint);
    const options = {
      headers: this.buildHeaders(),
    };
    return await firstValueFrom(this.http.post<T>(url, body, options));
  }

  // You can add put(), delete(), patch() similarly
}
