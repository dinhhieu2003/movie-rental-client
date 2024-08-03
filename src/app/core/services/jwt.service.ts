import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class JwtService {

  constructor() { }

  saveToken(Token: string) {
    localStorage.setItem("Token", Token);
  }

  getToken() {
    let token = localStorage.getItem("Token");
    return token;
  }

  removeToken() {
    localStorage.removeItem("Token");
  }
}
