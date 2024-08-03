import { HttpInterceptorFn } from '@angular/common/http';
import { inject } from '@angular/core';
import { JwtService } from '../services/jwt.service';

export const authInterceptor: HttpInterceptorFn = (req, next) => {
  const token = (inject)(JwtService).getToken();
  const request = req.clone({
    // set header for incoming request
    // If accessToken is available, it adds the Authorization header with the token, 
    // otherwise no header is added

    setHeaders: {
      ...(token ? {Authorization: `Bearer ${token}`} : {}),

    },
  });
  return next(request);
};
