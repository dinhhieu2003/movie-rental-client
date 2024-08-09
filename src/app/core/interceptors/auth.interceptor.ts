import { HttpInterceptorFn } from '@angular/common/http';
import { inject } from '@angular/core';
import { JwtService } from '../services/jwt.service';
import { Router } from '@angular/router';
import { AuthService } from '../services/auth.service';

export const authInterceptor: HttpInterceptorFn = (req, next) => {
  const jwtService = (inject)(JwtService);
  const authService = (inject)(AuthService);
  const router = (inject)(Router);
  const token = jwtService.getToken();
  const expiredAt = jwtService.getExpiryDate();
  let request = req.clone();
  if(token) {
    const currentDate = new Date();
    const expirationDate = new Date(Number(expiredAt) * 1000);
    if(expirationDate < currentDate) {
      authService.logout();
      router.navigate(["/login"]);
    } else {
      request = req.clone({
        // set header for incoming request
        // If accessToken is available, it adds the Authorization header with the token, 
        // otherwise no header is added
    
        setHeaders: {
          ...(token ? {Authorization: `Bearer ${token}`} : {}),
    
        },
      });
    }
  }
  return next(request);
};
