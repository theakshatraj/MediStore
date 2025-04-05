import { Component, OnInit } from '@angular/core';
import { UserService } from '../user.service'; 
import { Router } from '@angular/router'; 

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {
  user: any = { email: '', name: '', phone: '', address: '', creditCard: '' };
  errorMessage: string = '';
  successMessage: string = '';
  
  constructor(
    private userService: UserService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.loadUserProfile(); // Load current user profile on init
  }

  // Load the user profile
  loadUserProfile(): void {
    this.userService.getCurrentUser().subscribe(
      (data: any) => {
        this.user = data; // Assuming the API returns user details
      },
      (error: any) => {
        this.errorMessage = 'Error loading user profile';
        console.error(error);
      }
    );
  }

  // Update the user profile
  onUpdateProfile(): void {
    if (this.user.creditCard.length !== 16) {
      this.errorMessage = 'Credit card number must be 16 digits.';
      return;
    }

    // Clear any previous messages
    this.errorMessage = '';
    this.successMessage = '';

    // Update the user profile through the service
    this.userService.updateUserProfile(this.user).subscribe(
      (response: any) => { // Specify response type
        console.log('Profile updated successfully', response);
        this.successMessage = 'Profile updated successfully!'; // Set success message
      },
      (error: any) => { // Specify error type
        this.errorMessage = 'Error updating profile';
        console.error(error);
      }
    );
  }
}
