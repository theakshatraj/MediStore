import { Component, OnInit } from '@angular/core';
import { ProductService } from '../product.service'; 
import { Router } from '@angular/router'; 
import { Product } from '../model/product.model'; 
import { CartService } from '../cart.service'; 

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {
  searchQuery: string = '';
  products: Product[] = []; 

  constructor(
    private productService: ProductService,
    private router: Router,
    private cartService: CartService 
  ) {}

  ngOnInit(): void {
    this.loadProducts(); 
  }

  loadProducts(): void {
    this.productService.getProducts().subscribe((data: Product[]) => {
      this.products = data; 
    });
  }

  onSearch(): void {
    if (this.searchQuery) {
      this.products = this.products.filter((product: Product) =>
        product.name.toLowerCase().includes(this.searchQuery.toLowerCase())
      );
    } else {
      this.loadProducts(); 
    }
  }

  addToCart(product: Product): void { 
    if (product.stock > 0) {
      this.cartService.addToCart(product); 
    } else {
      alert(`${product.name} is out of stock!`); 
    }
  }

  logout(): void {
    localStorage.removeItem('token'); 
    this.router.navigate(['/login']); 
  }
}
