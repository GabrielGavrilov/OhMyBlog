import { HttpErrorResponse, HttpInterceptorFn } from '@angular/common/http';
import { Inject } from '@angular/core';
import { Router } from '@angular/router';
import { catchError, Observable, throwError } from 'rxjs';
import { IdentityService } from '../services/identity-service';

export const httpauthInterceptor: HttpInterceptorFn = (req, next) => {
  // const router = Inject(Router);
  // const identityService = Inject(IdentityService);
  // return next(req).pipe(
  //   catchError((error: HttpErrorResponse) => {
  //     if (error.status === 401) {
  //       identityService.deleteAuthCookie();
  //       router.navigateByUrl('/');
  //     }
  //     return throwError(error);
  //   })
  // );
  return next(req);
};
