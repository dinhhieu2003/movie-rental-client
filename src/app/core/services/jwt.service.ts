import { Inject, Injectable } from '@angular/core';
import { jwtDecode } from "jwt-decode";

interface jwtPayload {
  role: string,
}

@Injectable({
  providedIn: 'root'
})

export class JwtService {

  constructor() {
  }

  saveToken(Token: string, Expired: string) {
    localStorage.setItem("Token", Token);
    localStorage.setItem("ExpiredAt", Expired);
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

  getExpiryDate() {
    return localStorage.getItem("ExpiredAt");
  }


  removeToken() {
    localStorage.removeItem("Token");
  }

  removeUserInfo() {
    localStorage.removeItem("IdUser");
    localStorage.removeItem("FullName");
    localStorage.removeItem("Role");
  }

  logout() {
    this.removeToken();
    this.removeUserInfo();
  }

  getRole() {
    let role = "";
    let token = this.getToken();
    if(token) {
      let decoded = jwtDecode<jwtPayload>(token);
      role = decoded.role;
    }
    return role;
  }
}
