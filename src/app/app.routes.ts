import { Routes } from '@angular/router';
import { HomeComponent } from './components/frontend/home/home.component';
import { WebsiteLayoutComponent } from './components/layouts/website/website-layout/website-layout.component';
import { LoginComponent } from './components/auth/login/login.component';
import { AdminLayoutComponent } from './components/layouts/admin/admin-layout/admin-layout.component';
import { DashboardComponent } from './components/admin/dashboard/dashboard.component';
import { ResetPasswordComponent } from './components/auth/reset-password/reset-password.component';
import { ForgetPasswordComponent } from './components/auth/forget-password/forget-password.component';
import { ProductsComponent } from './components/admin/products/products.component';
import { ProductFormComponent } from './components/admin/product-form/product-form.component';
import { ProductCategoryComponent } from './components/admin/product-category/product-category.component';

export const routes: Routes = [
  {
    path: '',
    component: WebsiteLayoutComponent,
    children: [
      {
        path: '',
        component: HomeComponent,
      },
    ],
  },
  {
    path: 'admin',
    component: AdminLayoutComponent,
    // canActivate: [AuthGuard],
    children: [
      { path: '', redirectTo: 'dashboard', pathMatch: 'full' },
      {
        path: 'dashboard',
        component: DashboardComponent,
      },
      {
        path: 'products',
        component: ProductsComponent,
      },
      {
        path: 'product-form/add',
        component: ProductFormComponent,
      },
      {
        path: 'product-form/edit/:id',
        component: ProductFormComponent,
      },
      {
        path: 'product-category',
        component: ProductCategoryComponent,
      },
      {
        path: 'product-category/add',
        component: ProductCategoryComponent,
      },
      {
        path: 'product-category/edit/:id',
        component: ProductCategoryComponent,
      },
    ],
  },

  //   Auth Related Components
  {
    path: 'auth/login',
    component: LoginComponent,
  },
  {
    path: 'auth/reset-password',
    component: ResetPasswordComponent,
  },
  {
    path: 'auth/forget-password',
    component: ForgetPasswordComponent,
  },
  //   Auth Related Components
  { path: '**', redirectTo: '' },
];
