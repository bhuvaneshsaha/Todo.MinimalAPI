import { Routes } from '@angular/router';
import { loggedInGuard } from './core/guards/auth.guard';
import { AuthService } from './core/services/auth.service';

export const routes: Routes = [
  {
    path: '',
    loadComponent: () =>
      import('./pages/dashboard/dashboard.component').then(
        (mod) => mod.DashboardComponent
      ),
  },
  {
    path: 'login',
    loadComponent: () =>
      import('./pages/auth/login/login.component').then(
        (mod) => mod.LoginComponent
      ),
      providers: [AuthService]
  },
  {
    path: 'register',
    loadComponent: () =>
      import('./pages/auth/register/register.component').then(
        (mod) => mod.RegisterComponent
      ),
      canActivate: [loggedInGuard]
  },
];
