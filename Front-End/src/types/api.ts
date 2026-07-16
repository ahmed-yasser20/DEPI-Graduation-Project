// These mirror your backend DTOs as they'll appear over the wire.
//
// IMPORTANT ASSUMPTION: ASP.NET Core's default System.Text.Json serializer uses
// camelCase and does so by lowercasing ONLY the first character of each property
// name - it does not split on underscores. So "Category_Name" becomes
// "category_Name" (not "categoryName"), "PId" becomes "pId", "CId" becomes "cId", etc.
// This is what's assumed below. If your Program.cs configures
// JsonSerializerOptions differently (e.g. PropertyNamingPolicy = null, which keeps
// PascalCase), these interfaces - and every service that uses them - will need
// their casing adjusted to match. Easiest way to confirm: open your browser's
// Network tab, hit any GET endpoint, and check the actual JSON keys.

export interface CategoryResponse {
  categoryId: number;
  category_Name: string;
  productCount?: number;
}

export interface ProductResponse {
  pId: number;
  pName: string;
  price: number;
  description: string;
  stock: number;
  categoryId?: number | null;
  category_Name?: string | null;
  imageUrl?: string | null;
}

export interface CartItemResponse {
  cartItemId: number;
  productId: number;
  productName: string;
  price: number;
  quantity: number;
  totalPrice: number;
}

export interface CartResponse {
  cartId: string;
  items: CartItemResponse[];
  totalPrice: number;
}

export interface OrderItemResponse {
  pId: number;
  productName: string;
  quantity: number;
  unitPrice: number;
}

export interface PaymentResponse {
  payId: number;
  oId: number;
  status: string;
  amount: number;
  payment_Method: string;
  failureReason?: string | null;
}

export interface OrderResponse {
  oId: number;
  cId: string;
  status: string;
  total_Price: number;
  created_At: string;
  items: OrderItemResponse[];
  payment?: PaymentResponse | null;
}

export interface CreateOrderResponse {
  oId: number;
  clientSecret: string;
}

export interface AuthResponse {
  token: string;
}

export interface CustomerResponse {
  first_Name: string;
  last_Name: string;
  email: string;
  phone: string;
  city: string;
  street: string;
  building: string;
}
