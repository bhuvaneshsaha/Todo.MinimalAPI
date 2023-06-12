import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router, RouterLink, RouterModule, RouterOutlet } from '@angular/router';
import { NavComponent } from './core/components/nav/nav.component';
import { AuthService } from './core/services/auth.service';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, RouterModule, RouterLink, NavComponent],
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {

  authService = inject(AuthService);
  router = inject(Router);

  // read url parameter with name rediredURL and check for text media-manager and redirect to /media-manager

  constructor() {
      if (window.location.href.indexOf('redirectURL') > -1) {
      const redirectURL = window.location.href.split('redirectURL=')[1];
      if (redirectURL.indexOf('media-manager') > -1) {
        this.router.navigate(['/media-manager']);
      }
    }
  }

}
