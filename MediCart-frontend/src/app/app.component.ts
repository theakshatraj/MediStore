import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent {
  constructor(private router: Router) {}

  // Show navbar on all routes except login, signup, and landing
  showNavbar(): boolean {
    return !(this.router.url === '/login' || this.router.url === '/signup' || this.router.url === '/');
  }
}
