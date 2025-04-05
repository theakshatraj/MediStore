import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-order-history',
  templateUrl: './order-history.component.html',
  styleUrls: ['./order-history.component.css'],
})
export class OrderHistoryComponent implements OnInit {
  orders: any[] = [];

  constructor(private http: HttpClient) {}

  ngOnInit(): void {
    this.fetchOrderHistory();
  }

  fetchOrderHistory() {
    const userId = localStorage.getItem('userId');
    if (userId) {
      this.http
        .get(`http://localhost:2025/order-history/${userId}`)
        .subscribe((response: any) => {
          this.orders = response;
        });
    }
  }
}
