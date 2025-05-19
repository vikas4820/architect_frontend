import { Injectable } from '@angular/core';
import { BaseApiService } from './base-api.service';
import { JwtHelperService } from '@auth0/angular-jwt';

@Injectable({
  providedIn: 'root'
})
export class AuthService extends BaseApiService {

  private jwtHelper = new JwtHelperService();
  private readonly url = `${this.baseUrl}/auth/login`;

  getToken(): string | null {
    return localStorage.getItem('access_token');
  }

  // Decode the token
  decodeToken(token: string) {
    return this.jwtHelper.decodeToken(token);
  }

  // Check if the token is expired
  isTokenExpired(token: string): boolean {
    return this.jwtHelper.isTokenExpired(token);
  }

  async login(loginData: any): Promise<any> {
    return await this.post(this.url, loginData);
  }

}
