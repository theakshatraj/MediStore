import { Component, OnInit } from '@angular/core';
import { CartService } from '../cart.service'; 
import { Product } from '../model/product.model';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css']
})
export class CartComponent implements OnInit {
  cartItems: Product[] = []; // Keep it as an array of products

  constructor(private cartService: CartService) {}

  ngOnInit(): void {
    this.cartService.cart.subscribe((items: Product[]) => {
      this.cartItems = items;
    });
  }

  removeItem(product: Product): void {
    // Remove from cart using the cart service
    this.cartService.removeFromCart(product);
  }

  getTotal(): number {
    return this.cartService.getTotal();
  }

  checkout(userId: string): void {
    this.cartService.checkout(userId).subscribe(
      (response: any) => {
        console.log('Checkout successful', response);
      },
      (error: any) => {
        console.error('Error during checkout', error);
      }
    );
  }
}
