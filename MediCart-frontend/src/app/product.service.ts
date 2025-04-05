import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ProductService {
  private apiUrl = 'http://localhost:2025/api/products'; // Adjust the API URL as needed

  constructor(private http: HttpClient) {}

  getProducts(): Observable<any[]> {
    return this.http.get<any[]>(this.apiUrl);
  }

  addToCart(payload: { productId: string; userId: string }): Observable<any> {
    return this.http.post(`${this.apiUrl}/add-to-cart`, payload);
  }
}
