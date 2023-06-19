import { Routes } from '@angular/router';
import { loggedInGuard, loggedOutGuard } from './core/guards/auth.guard';
import { DashboardComponent } from './pages/dashboard/dashboard.component';
import { RegisterComponent } from './pages/auth/register/register.component';
import { AuthPageComponent } from './pages/auth/auth-page.component';

export const routes: Routes = [
  {
    path: '',
    component: DashboardComponent,
    canActivate: [loggedInGuard],
  },
  {
    path: 'auth',
    component: AuthPageComponent,
    // providers: [AuthService],
    canActivate: [loggedOutGuard],
  },
  {
    path: 'auth/:route',
    component: AuthPageComponent,
    // providers: [AuthService],
    canActivate: [loggedOutGuard],
  },
  {
    path: 'register',
    component: RegisterComponent,
    canActivate: [loggedOutGuard],
  },
];
