export interface Product {
  product_id: string;
  sku: string;
  name: string;
  description: string;
  price: number;
  original_price: number;
  images: string[];
  category_id: string;
  category_name: string;
  material: string;
  dimensions: string;
  weight: string;
  created_at: string;
}

export interface CategoryInfo {
  category_id: string;
  name: string;
  description: string;
}

export interface CartItem {
  id: string;
  product: Product;
  quantity: number;
}

export interface WishlistItem {
  product: Product;
  addedAt: string;
}

export interface Stock {
  stock_id: number;
  product_id: string;
  quantity: number;
  is_bestseller: boolean;
  is_newarrival: boolean;
  created_at: string;
  updated_at: string;
}
