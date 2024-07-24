import { Component, Input } from '@angular/core';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss'
})
export class LoginComponent {
  @Input() name: string = "";
  email: string = "";
  password: string = "";
  onSignUp() {
    console.log('Sign Up Data:');
    // Handle sign-up logic here
  }

  onSignIn() {
    console.log('Sign In Data:');
    // Handle sign-in logic here
  }

  navigateToForgotPasswordPage() {
    // Navigate to the forgot password page
  }

  togglePanel() {
    const container = document.getElementById('container');
    if(container){
      container.classList.toggle('right-panel-active');
    }
  }

}
