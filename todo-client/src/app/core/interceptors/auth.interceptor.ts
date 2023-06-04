import { HttpInterceptorFn } from '@angular/common/http';

export const authInterceptor: HttpInterceptorFn = (req, next) => {

  const token = localStorage.getItem('token');

  if (!(req.url.toString().includes('/login') || req.url.toString().includes('/register'))) {
    req = req.clone({
      setHeaders: {
        "Authorization": `Bearer ${token}`
      }
    });
  }

  return next(req);
};
