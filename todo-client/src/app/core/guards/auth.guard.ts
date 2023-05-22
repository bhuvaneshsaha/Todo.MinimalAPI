import { CanActivateFn, Router } from '@angular/router';
import { AuthService } from '../services/auth.service';
import { inject } from '@angular/core';

export const loggedInGuard: CanActivateFn = (route, state) => {
  const authService = inject(AuthService);
  const router = inject(Router);

  if(!authService.userIsAuthenticated) {
    router.navigate(['/login']);
  }
  return authService.userIsAuthenticated;
};


export const loggedOutGuard: CanActivateFn = (route, state) => {
  const authService = inject(AuthService);
  const router = inject(Router);

  if(authService.userIsAuthenticated) {
    router.navigate(['/']);
  }
  return true;
};
