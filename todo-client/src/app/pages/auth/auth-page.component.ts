import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-auth-page',
  standalone: true,
  imports: [CommonModule, LoginComponent, RegisterComponent],
  templateUrl: './auth-page.component.html',
  styleUrls: ['./auth-page.component.scss']
})
export class AuthPageComponent {
  loginTabActive = true;

  constructor(private route: ActivatedRoute) {
    const routeValue = this.route.snapshot.params?.['route'];
    if(routeValue) {
      this.loginTabActive = routeValue === 'login';
    }
  }

}
