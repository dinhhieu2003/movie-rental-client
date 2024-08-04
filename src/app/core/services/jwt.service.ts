import { Inject, Injectable } from '@angular/core';
import { DOCUMENT } from '@angular/common'

@Injectable({
  providedIn: 'root'
})
export class JwtService {

  constructor() {
  }

  saveToken(Token: string) {
    localStorage.setItem("Token", Token);
  }

  saveUserInfo(fullName: string, role: string, idUser: string) {
    localStorage.setItem("IdUser", idUser);
    localStorage.setItem("FullName", fullName);
    localStorage.setItem("Role", role);
  }

  getUserInfo() {
    let fullName = localStorage.getItem("FullName");
    let role = localStorage.getItem("Role");
    return {FullName: fullName, Role: role};
  }

  getToken() {
    let token = localStorage.getItem("Token");
    return token;
  }

  removeToken() {
    localStorage.removeItem("Token");
  }

  removeUserInfo() {
    localStorage.removeItem("IdUser");
    localStorage.removeItem("FullName");
    localStorage.removeItem("Role");
  }
}
