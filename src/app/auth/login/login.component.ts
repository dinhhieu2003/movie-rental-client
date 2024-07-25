import { HttpClientModule } from '@angular/common/http';
import { Component, Input } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatIconModule } from '@angular/material/icon';
@Component({
  selector: 'app-login',
  standalone: true,
  imports: [FormsModule,MatIconModule,HttpClientModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss'
})
export class LoginComponent {
  @Input() name: string = "";
  email: string = "";
  password: string = "";
  onSignUp() {
    alert('Sign Up Data:');
    // Handle sign-up logic here
  }

  onSignIn() {
    alert('Sign In Data:');
    // Handle sign-in logic here
  }

  navigateToForgotPasswordPage() {
    alert("Navigate to the forgot password page");
  }

  togglePanel() {
    const container = document.getElementById('container');
    if(container){
      container.classList.toggle('right-panel-active');
    }
  }

}
