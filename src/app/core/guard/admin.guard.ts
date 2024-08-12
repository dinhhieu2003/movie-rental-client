import { CanActivateFn, Router } from '@angular/router';
import { JwtService } from '../services/jwt.service';
import { inject } from '@angular/core';

export const adminGuard: CanActivateFn = (route, state) => {
  let jwtService = (inject)(JwtService);
  if(jwtService.getRole() === "USER") {
    (inject)(Router).navigate([""]);
    return false;
  }
  return true;
};
