import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http'; 
import { Product } from './model/product.model'; 

@Injectable({
  providedIn: 'root'
})
export class CartService {
  private cartItems: Product[] = []; // Change the structure to just hold products
  private cartSubject = new BehaviorSubject<Product[]>(this.cartItems);
  cart = this.cartSubject.asObservable();

  constructor(private http: HttpClient) {}

  // Add product to cart with stock management
  addToCart(product: Product): void {
    // Check if the product is in stock
    if (product.stock <= 0) {
      alert(`Sorry, ${product.name} is out of stock!`);
      return;
    }

    // Add a shallow copy of the product to the cart
    this.cartItems.push({ ...product, addedToCart: true });
    
    // Decrease stock in the product listing
    product.stock--;

    // Notify subscribers with the updated cart items
    this.cartSubject.next(this.cartItems);
    alert(`${product.name} has been added to the cart.`);
  }

  // Remove product from cart and restore stock
  removeFromCart(product: Product): void {
    const existingProductIndex = this.cartItems.findIndex(item => item.id === product.id);
    
    if (existingProductIndex > -1) {
      // Remove the product from the cart
      this.cartItems.splice(existingProductIndex, 1);
      
      // Restore stock to the product
      product.stock++;
      
      // Notify subscribers with the updated cart
      this.cartSubject.next(this.cartItems);
      alert(`${product.name} has been removed from the cart.`);
    }
  }

  // Checkout logic (posting order data to the backend)
  checkout(userId: string): Observable<any> {
    const orderPayload = {
      userId,
      cartItems: this.cartItems
    };
    
    // Clear the cart after checkout
    this.cartItems = [];
    this.cartSubject.next(this.cartItems); // Notify that the cart is now empty
    return this.http.post(`http://localhost:2025/api/orders/checkout`, orderPayload);
  }

  // Calculate the total price of the cart
  getTotal(): number {
    return this.cartItems.reduce((acc, item) => acc + item.price, 0);
  }
}
