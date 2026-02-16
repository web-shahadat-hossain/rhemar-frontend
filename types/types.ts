export type Category = string;

export interface CategoryItem {
  id: string;
  name: string;
  slug: string;
  status: "Active" | "Hidden";
}

export interface SizeStock {
  size: "S" | "M" | "L" | "XL";
  stock: number;
}

export interface Product {
  _id: string;
  name: string;
  slug: string;
  category: string;
  price: number;
  discountPrice?: number;
  images: { url: string }[];
  createdAt: string;
}

export interface ShopProps {
  onProductClick: (slug: string) => void;
  initialCategory?: string;
  initialSearch?: string;
  categories: string[];
  products: Product[];
}

export interface CartItem extends Product {
  selectedSize: "S" | "M" | "L" | "XL";
  quantity: number;
}

export interface User {
  id: string;
  name: string;
  phone: string;
  email?: string;
  address?: string;
  role: "user" | "admin";
  avatar?: string;
}

export interface Order {
  id: string;
  userId: string;
  customerName: string;
  phoneNumber: string;
  email?: string;
  items: CartItem[];
  subtotal: number;
  deliveryCharge: number;
  total: number;
  status: "Pending" | "Shipped" | "Delivered" | "Cancelled";
  date: string;
  address: string;
  city: string;
  deliveryArea: string;
  paymentMethod: string;
  note?: string;
}

export interface AuthState {
  user: User | null;
  isAuthenticated: boolean;
  isLoading: boolean;
}
