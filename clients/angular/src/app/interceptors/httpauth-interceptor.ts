import { HttpErrorResponse, HttpInterceptorFn } from '@angular/common/http';
import { catchError, Observable, throwError } from 'rxjs';

export const httpauthInterceptor: HttpInterceptorFn = (req, next) => {
  const token = localStorage.getItem('AUTH');

  if (token) {
    req = req.clone({
      headers: req.headers.set('Authorization', `Bearer ${token}`),
    });
  }

  return next(req).pipe(
    catchError((error: HttpErrorResponse) => {
      if (error.status === 401) {
        localStorage.removeItem('AUTH');
      }
      return throwError(error);
    })
  );
};
