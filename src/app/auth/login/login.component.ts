import { HttpClientModule } from '@angular/common/http';
import { Component, Input } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, FormsModule, Validators } from '@angular/forms';
import { MatIconModule } from '@angular/material/icon';
@Component({
  selector: 'app-login',
  standalone: true,
  imports: [FormsModule, MatIconModule, HttpClientModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss'
})
export class LoginComponent {
  name: string = "";
  email: string = "";
  password: string = "";
  error: string = "";

  validateName(): void {

    if (this.name.trim() === '') {
      this.error += " Tên không được để trống.";
    }
    else if (this.name.length < 6) {
      this.error += " Tên quá ngắn.";
    }
    else if (this.name.length > 30) {
      this.error += " Tên quá dài.";
    }
    else if (!/^[a-zA-Z0-9]+$/.test(this.name)) {
      this.error += " Tên chứa kí tự đặc biệt.";
    }

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
  validateEmail(){
    if (this.email.trim() === '') {
      this.error += " Email không được để trống.";
    }
    if( !/^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$/.test(this.email)){
      this.error += " Định dạng không giống email.";
    }
  }
  onSignUp() {
    this.error = "";
    this.validateName();
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
