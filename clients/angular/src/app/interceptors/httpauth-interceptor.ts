import { HttpInterceptorFn } from '@angular/common/http';

export const httpauthInterceptor: HttpInterceptorFn = (req, next) => {
  const token = localStorage.getItem('AUTH');
  if (token) {
    const request = req.clone({
      setHeaders: {
        Authorization: `Bearer ${token}`,
      },
    });
    return next(request);
  }
  return next(req);
};
