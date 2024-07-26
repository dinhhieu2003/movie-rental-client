import { CommonModule } from '@angular/common';
import { Component, Renderer2 } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterLink } from '@angular/router';
@Component({
  selector: 'app-login',
  standalone: true,
  imports: [FormsModule, CommonModule, RouterLink],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss'
})
export class LoginComponent {

  email: string = "";
  password: string = "";
  error: string = "";
  showPass: string = "password";
  show: boolean = false;
  // private scriptLoadTimeout: any;
  constructor(private renderer: Renderer2) {

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
  validatePassword() {
    if (this.password.trim() === '') {
      this.error += " Mật khẩu không được để trống.";
    }
    else if (this.password.length < 6) {
      this.error += " Mật khẩu quá ngắn.";
    }
    else if (this.password.length > 30) {
      this.error += " Mật khẩu quá dài.";
    }
    else if (!/^[a-zA-Z0-9]+$/.test(this.password)) {
      this.error += " Mật khẩu chứa kí tự đặc biệt.";
    }
  }
  validateEmail() {
    if (this.email.trim() === '') {
      this.error += " Email không được để trống.";
    }
    if (!/@./.test(this.email)) {
      this.error += " Định dạng không giống email.";
    }
  }
  onSignUp() {
    this.error = "";
    this.validateEmail();
    this.validatePassword();
    alert(this.error);
    // Handle sign-up logic here
  }

  onSignIn() {
    this.error = "";
    this.validateEmail();
    this.validatePassword();
    alert(this.error);
    // Handle sign-in logic here
  }
  showPassword(): void {
    if (this.showPass === "password") {
      this.showPass = "text";
      this.show = true;
    } else {
      this.showPass = "password";
      this.show = false;
    }
  }

  navigateToForgotPasswordPage() {
    alert("Navigate to the forgot password page");
  }

  togglePanel() {
    const container = document.getElementById('container');
    if (container) {
      container.classList.toggle('right-panel-active');
    }
  }

}
