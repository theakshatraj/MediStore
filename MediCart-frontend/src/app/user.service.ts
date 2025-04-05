import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  constructor(private http: HttpClient) {}

  // Fetch the current user profile
  getCurrentUser(): Observable<any> {
    return this.http.get('http://localhost:2025/api/users/current');
  }

  // Update the user profile
  updateUserProfile(profileData: any): Observable<any> {
    const userId = 'test-user-id'; // Replace with dynamic user id
    return this.http.put(`http://localhost:2025/api/users/${userId}`, profileData);
  }
}
