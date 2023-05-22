import { Routes } from '@angular/router';
import { loggedInGuard, loggedOutGuard } from './core/guards/auth.guard';
import { AuthService } from './core/services/auth.service';

export const routes: Routes = [
  {
    path: '',
    loadComponent: () =>
      import('./pages/dashboard/dashboard.component').then(
        (mod) => mod.DashboardComponent
      ),
      canActivate: [loggedInGuard]
  },
  {
    path: 'login',
    loadComponent: () =>
      import('./pages/auth/login/login.component').then(
        (mod) => mod.LoginComponent
      ),
      providers: [AuthService],
      canActivate: [loggedOutGuard]
  },
  {
    path: 'register',
    loadComponent: () =>
      import('./pages/auth/register/register.component').then(
        (mod) => mod.RegisterComponent
      ),
      canActivate: [loggedOutGuard]
  },
];
