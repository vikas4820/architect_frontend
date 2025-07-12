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
import { AuthGuard } from './guards/auth.guard';
import { AlredayLoggedInGuard } from './guards/alreday-logged-in.guard';
import { ProductCategoryFormComponent } from './components/admin/product-category-form/product-category-form.component';

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
    canActivate: [AuthGuard],
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
        path: 'products/add',
        component: ProductFormComponent,
      },
      {
        path: 'products/edit/:id',
        component: ProductFormComponent,
      },
      {
        path: 'products/product-category',
        component: ProductCategoryComponent,
      },
      {
        path: 'products/product-category/add',
        component: ProductCategoryFormComponent,
      },
      {
        path: 'products/product-category/edit/:id',
        component: ProductCategoryFormComponent,
      },
    ],
  },

  //   Auth Related Components
  {
    path: 'auth/login',
    component: LoginComponent,
    canActivate: [AlredayLoggedInGuard],
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
