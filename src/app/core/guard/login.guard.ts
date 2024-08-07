import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { JwtService } from '../services/jwt.service';

export const loginGuard: CanActivateFn = (route, state) => {
  const jwtService = inject(JwtService);
  const router = inject(Router);
  if(!jwtService.getToken()) {
    return true;
  }
  router.navigate([""]);
  console.log(`Login guard for: ${state.url}`);
  return false;
};
