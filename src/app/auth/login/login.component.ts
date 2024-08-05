import { CommonModule } from '@angular/common';
import { Component, Renderer2 } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { AuthService } from '../../core/services/auth.service';
import { LoginRequest } from '../../core/models/LoginRequest.model';
import { JwtService } from '../../core/services/jwt.service';
@Component({
  selector: 'app-login',
  standalone: true,
  imports: [FormsModule, CommonModule, RouterLink],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss'
})
export class LoginComponent {


  email: string = "";
  passwords: string[] = ["", "", "", "", ""];
  error: string = "";
  showPass: string = "password";
  resetPassword: boolean = false;
  code: string = "";
  showPasswordButtons: boolean[] = [false, false, false, false, false];
  // private scriptLoadTimeout: any;
  constructor(private renderer: Renderer2, 
    private authService: AuthService, 
    private jwtService: JwtService,
    private router: Router) {

  }
  ngOnInit(): void {
    // this.scriptLoadTimeout = setTimeout(() => {
    this.addScriptToHead();
    // }, 2000

    // );
  }
  addScriptToHead(): void {
    if (typeof document === 'undefined') {
      return;
    }
    const existingScript = document.head.querySelector('#neon-cursor-script');
    if (existingScript) {
      return;
    }
    const script = this.renderer.createElement('script');
    script.type = "module";
    script.id = "neon-cursor-script";
    script.async = true;
    script.text = `
      import { neonCursor } from 'https://unpkg.com/threejs-toys@0.0.8/build/threejs-toys.module.cdn.min.js';
      
      neonCursor({
        el: document.body.querySelector('#app'),
        shaderPoints: 16,
        curvePoints: 80,
        curveLerp: 0.5,
        radius1: 5,
        radius2: 30,
        velocityTreshold: 10,
        sleepRadiusX: 100,
        sleepRadiusY: 100,
        sleepTimeCoefX: 0.0025,
        sleepTimeCoefY: 0.0025
      });
    `;
    this.renderer.appendChild(document.head, script);
  }
  ngOnDestroy(): void {
    // if (typeof document === 'undefined') {
    //   return;
    // }
    // const existingScript = document.head.querySelector('#neon-cursor-script');

    // if (existingScript) {
    //   this.renderer.removeChild(document.head, existingScript);
    // }

    // if (this.scriptLoadTimeout) {
    //   clearTimeout(this.scriptLoadTimeout); // Clear timeout to prevent delayed execution
    // }
  }
  validatePassword(index: number): void {
    if (this.passwords[index].trim() === '') {
      this.error += " Mật khẩu không được để trống.";
    }
    else if (this.passwords[index].length < 6) {
      this.error += " Mật khẩu quá ngắn.";
    }
    else if (this.passwords[index].length > 30) {
      this.error += " Mật khẩu quá dài.";
    }
    else if (!/^[a-zA-Z0-9]+$/.test(this.passwords[index])) {
      this.error += " Mật khẩu chứa kí tự đặc biệt.";
    }
  }
  validateEmail(): void {
    if (this.email.trim() === '') {
      this.error += " Email không được để trống.";
    }
    if (!/@./.test(this.email)) {
      this.error += " Định dạng không giống email.";
    }
  }
  validatePasswordEqual(left: number, right: number): void {
    if (this.passwords[left] !== this.passwords[right]) {
      this.error += " Mật khẩu nhập lại không giống."
    }
  }
  onSignUp(): void {
    this.error = "";
    this.validateEmail();
    this.validatePassword(0);
    this.validatePassword(1);
    this.validatePasswordEqual(0, 1);
    alert(this.error);
    // Handle sign-up logic here
  }

  onSignIn(): void {
    this.error = "";
    this.validateEmail();
    this.validatePassword(2);
    alert(this.error);
    // Handle sign-in logic here
    let loginRequest: LoginRequest = {Email: this.email, Password: this.passwords[2]};
    console.log(loginRequest);
    this.authService.login(loginRequest).subscribe({
      next: (response) => {
        this.jwtService.saveToken(response.Data.Token);
        this.jwtService.saveUserInfo(response.Data.FullName, response.Data.Role, response.Data.IdUser);
        if(response.Data.Role == "ADMIN" || response.Data.Role == "EMPLOYEE") {
          this.router.navigate(["management"]);
        } else {
          this.router.navigate(["/home"]);
        }
        
      },
      error: (error) => {
        console.error(error);
      }
    })
  }
  showPassword(index: number): void {
    if (this.showPass === "password") {
      this.showPass = "text";
      this.showPasswordButtons[index] = true;
    } else {
      this.showPass = "password";
      this.showPasswordButtons[index] = false;
    }
  }

  navigateToForgotPasswordPage(): void {
    this.resetPassword = !this.resetPassword;
  }

  togglePanel(): void {
    const container = document.getElementById('container');
    if (container) {
      container.classList.toggle('right-panel-active');
    }
    this.resetPassword = false;
  }
  sendCodeToEmail(): void {
    this.error = "";
    this.validateEmail();
    this.validatePasswordEqual(3, 4);
    if (this.error === "") {
      alert("kiểm tra emai của bạn:( " + this.email + " ) để tìm mật mã bí mật");
    } else {
      alert(this.error);
    }

  }

}
