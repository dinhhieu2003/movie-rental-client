import { CanActivateFn, Router } from '@angular/router';
import { inject } from '@angular/core';
import { JwtService } from '../services/jwt.service';

export const authGuard: CanActivateFn = (route, state) => {
  const jwtService = inject(JwtService);
  const router = inject(Router);
  if(jwtService.getToken()) {
    return true;
  }
  console.log(`Auth guard for route: ${state.url}`);
  router.navigate([""]);
  return false;
};
