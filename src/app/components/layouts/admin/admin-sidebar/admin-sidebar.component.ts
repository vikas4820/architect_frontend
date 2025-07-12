import { CommonModule } from '@angular/common';
import { AfterViewInit, Component } from '@angular/core';
import { NavigationEnd, Router, RouterModule } from '@angular/router';
import { filter } from 'rxjs/operators';

@Component({
  selector: 'app-admin-sidebar',
  imports: [
    CommonModule,
    RouterModule
  ],
  templateUrl: './admin-sidebar.component.html',
  styleUrl: './admin-sidebar.component.scss'
})
export class AdminSidebarComponent implements AfterViewInit {

  menu = [
    {
      title: 'Dashboard',
      icon: 'fa fa-rocket',
      routerLink: '/admin/dashboard',
      children: []
    },
    {
      title: 'Products',
      icon: 'fa fa-gem',
      children: [
        { title: 'Products List', routerLink: '/admin/products', exact: true },
        { title: 'Product Category', routerLink: '/admin/products/product-category' },
      ]
    }
  ];

  openMenus: Set<string> = new Set();

  constructor(private router: Router) {}

  ngAfterViewInit() {
    this.router.events
      .pipe(filter((event) => event instanceof NavigationEnd))
      .subscribe(() => {
        this.checkAndOpenMenus(this.router.url);
      });

    setTimeout(() => {
      this.checkAndOpenMenus(this.router.url);
    });
  }

isMenuOpen(menuItem: any, currentUrl: string): boolean {
  if (menuItem.routerLink && currentUrl.startsWith(menuItem.routerLink)) return true;

  if (menuItem.children?.length) {
    return menuItem.children.some((child: any) => currentUrl.startsWith(child.routerLink));
  }

  return false;
}

checkAndOpenMenus(currentUrl: string) {
  this.openMenus.clear();
  this.menu.forEach(menuItem => {
    if (this.isMenuOpen(menuItem, currentUrl)) {
      this.openMenus.add(menuItem.title);
    }
  });
}


  toggleMenu(title: string): void {
    if (this.openMenus.has(title)) {
      this.openMenus.delete(title);
    } else {
      this.openMenus.add(title);
    }
  }



}
