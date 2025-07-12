import { Component, EventEmitter, Output } from '@angular/core';

@Component({
  selector: 'app-admin-header',
  imports: [],
  templateUrl: './admin-header.component.html',
  styleUrl: './admin-header.component.scss'
})
export class AdminHeaderComponent {

  @Output() toggleSidebar = new EventEmitter<void>();

  onToggleSidebar() {
    this.toggleSidebar.emit();
  }

}
