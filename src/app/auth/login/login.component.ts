import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { Component } from '@angular/core';
import { FormsModule} from '@angular/forms';
import { MatIconModule } from '@angular/material/icon';
@Component({
  selector: 'app-login',
  standalone: true,
  imports: [FormsModule, MatIconModule, HttpClientModule,CommonModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss'
})
export class LoginComponent {
  email: string = "";
  password: string = "";
  error: string = "";
  showPass: string = "password";
  show: boolean = false;


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
    if( !/@./.test(this.email)){
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
  showPassword():void{
    if(this.showPass ==="password"){
      this.showPass = "text";
      this.show = true;
    }else{
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
