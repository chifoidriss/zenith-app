import { HttpHeaders, HttpInterceptorFn } from '@angular/common/http';
import { AuthService } from '../services/auth.service';
import { inject } from '@angular/core';

export const AuthInterceptor: HttpInterceptorFn = (req, next) => {
  const auth = inject(AuthService);

  let token = auth.token;
  let headers = new HttpHeaders();

  if(token) {
    headers = headers.append('Authorization', `Bearer ${token}`);
  }
  let requestChange = req.clone({headers});

  return next(requestChange);
};
