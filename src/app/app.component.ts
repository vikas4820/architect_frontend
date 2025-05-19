import { Component, OnInit } from '@angular/core';
import { NavigationEnd, Router, RouterOutlet } from '@angular/router';
import { filter } from 'rxjs/operators';

@Component({
  selector: 'app-root',
  imports: [
    RouterOutlet
  ],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent implements OnInit {
  title = 'REALSTATE_F';

  constructor(private router: Router) {}

  ngOnInit() {
    // Listen to route changes
    this.router.events
      .pipe(filter(event => event instanceof NavigationEnd))
      .subscribe(() => this.loadStylesBasedOnRoute());
  }

  loadStylesBasedOnRoute() {
    // Check if the route contains 'admin' and apply admin styles
    let routePrefix = '';
    const isAdminRoute = this.router.url.includes('/admin');
    const isAuthRoute = this.router.url.includes('/auth');
    if(isAdminRoute) {
      routePrefix = 'admin';
    }
    if(isAuthRoute) {
      routePrefix = 'auth';
    }

    // Add/remove styles based on the route
    this.toggleStyles(routePrefix);
  }

  toggleStyles(routePrefix: string) {
    const adminStyleLink = document.getElementById('admin-style');
    const frontendStyleLink = document.getElementById('frontend-style');
    const authStyleLink = document.getElementById('auth-style');

    if (routePrefix === 'auth') {
      if (adminStyleLink) adminStyleLink.remove();
      if (frontendStyleLink) frontendStyleLink.remove();
      if (!authStyleLink) {
        const link = document.createElement('link');
        link.id = 'auth-style';
        link.rel = 'stylesheet';
        link.href = 'src/styles/auth.scss';  // Auth CSS path
        document.head.appendChild(link);
      }
      return;
    }

    // Apply admin styles if it's an admin route
    if (routePrefix === 'admin') {
      if (frontendStyleLink) frontendStyleLink.remove();
      if (!adminStyleLink) {
        const link = document.createElement('link');
        link.id = 'admin-style';
        link.rel = 'stylesheet';
        link.href = 'src/styles/admin.scss';  // Admin CSS path
        document.head.appendChild(link);
      }
    } else {
      if (adminStyleLink) adminStyleLink.remove();
      if (!frontendStyleLink) {
        const link = document.createElement('link');
        link.id = 'frontend-style';
        link.rel = 'stylesheet';
        link.href = 'src/styles/frontend.scss'; // Frontend CSS path
        document.head.appendChild(link);
      }
    }
  }
}
