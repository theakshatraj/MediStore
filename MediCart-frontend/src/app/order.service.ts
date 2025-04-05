import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class OrderService {
  private orders: any[] = [];

  constructor() {}

  // Save order
  saveOrder(order: any) {
    this.orders.push(order);
  }

  // Get order history
  getOrderHistory() {
    return this.orders;
  }
}
