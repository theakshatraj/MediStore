export interface Product {
  id: string; // or another identifier
  name: string;
  description: string;
  price: number;
  stock: number;
  image?: string; // Optional property for the product image
  addedToCart?: boolean; // New property to track if it's added to cart
}
