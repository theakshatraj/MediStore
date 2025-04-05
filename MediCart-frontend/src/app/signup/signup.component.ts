import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router'; // Import Router
import { AuthService } from '../auth.service'; // Ensure correct path to the AuthService

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit {
  signupForm: FormGroup;
  isLoading = false;
  errorMessage: string | null = null;

  constructor(
    private formBuilder: FormBuilder,
    private authService: AuthService,
    private router: Router // Inject Router
  ) {
    this.signupForm = this.formBuilder.group({
      name: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      phone: ['', Validators.required],
      address: ['', Validators.required],
      creditCard: ['', [Validators.required, Validators.minLength(16), Validators.maxLength(16)]],
      password: ['', [Validators.required, Validators.minLength(6)]]
    });
  }

  ngOnInit(): void {}

  onSubmit(): void {
    if (this.signupForm.invalid) {
      return; // Stop if the form is invalid
    }
    this.isLoading = true;

    // Call your authentication service to handle signup
    this.authService.signup(this.signupForm.value).subscribe({
      next: (response) => {
        // Handle successful signup
        console.log('Signup successful!', response);
        localStorage.setItem('token', response.token); // Store token in local storage
        this.router.navigate(['/dashboard']); // Redirect to dashboard
        this.isLoading = false;
      },
      error: (error) => {
        this.errorMessage = error.error.message || 'An error occurred. Please try again.';
        this.isLoading = false;
      }
    });
  }
}
