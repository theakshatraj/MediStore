import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../auth.service'; // Ensure correct path to the AuthService

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent {
  email: string = '';
  password: string = '';

  constructor(private authService: AuthService, private router: Router) {}

  // **Login function**
  onLogin() {
    const credentials = { email: this.email, password: this.password };
    this.authService.login(credentials).subscribe(
      (response: any) => {
        if (response && response.token) {
          localStorage.setItem('token', response.token); // Store token
          this.router.navigate(['/dashboard']); // Redirect to dashboard
        } else {
          alert('Login failed. Please check your credentials.');
        }
      },
      (error) => {
        alert('An error occurred during login.');
      }
    );
  }
}
