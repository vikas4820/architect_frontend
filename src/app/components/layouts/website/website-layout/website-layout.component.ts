import { Component } from '@angular/core';
import { WebsiteHeaderComponent } from '../website-header/website-header.component';
import { WebsiteFooterComponent } from '../website-footer/website-footer.component';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-website-layout',
  imports: [
    RouterModule,
    WebsiteHeaderComponent,
    WebsiteFooterComponent,
  ],
  templateUrl: './website-layout.component.html',
  styleUrl: './website-layout.component.scss'
})
export class WebsiteLayoutComponent {

}
