import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ProfileService {
  constructor(private http: HttpClient) {}

  // Fetch the current user profile data
  getUserProfile(): Observable<any> {
    const userId = 'test-user-id'; // Replace with dynamic user id
    const headers = new HttpHeaders({
      'Authorization': `Bearer YOUR_ACCESS_TOKEN`, // Add this if your API requires authentication
    });
    return this.http.get(`http://localhost:2025/api/users/${userId}`, { headers });
  }

  // Update the user profile
  updateUserProfile(profileData: any): Observable<any> {
    const userId = 'test-user-id'; // Replace with dynamic user id
    return this.http.put(`http://localhost:2025/api/users/${userId}`, profileData);
  }
}
