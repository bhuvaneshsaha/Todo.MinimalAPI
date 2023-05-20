import { Routes } from '@angular/router';

export const routes: Routes = [
  {path:'', loadComponent: () => import('./pages/dashboard/dashboard.component').then(mod => mod.DashboardComponent) },
  {path:'login', loadComponent: () => import('./pages/auth/login/login.component').then(mod => mod.LoginComponent)},
  {path:'register', loadComponent: () => import('./pages/auth/register/register.component').then(mod => mod.RegisterComponent)},
];
