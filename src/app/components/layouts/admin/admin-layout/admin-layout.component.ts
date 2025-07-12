import { Component, ElementRef, ViewChild } from '@angular/core';
import { AdminHeaderComponent } from '../admin-header/admin-header.component';
import { AdminSidebarComponent } from '../admin-sidebar/admin-sidebar.component';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-admin-layout',
  imports: [
    RouterModule,
    AdminHeaderComponent,
    AdminSidebarComponent,
  ],
  templateUrl: './admin-layout.component.html',
  styleUrl: './admin-layout.component.scss'
})
export class AdminLayoutComponent {

  @ViewChild('appContainer') appContainerRef!: ElementRef;

  toggleSidebar() {
    this.appContainerRef.nativeElement.classList.toggle('closed-sidebar');
  }

}
