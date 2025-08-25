export interface MenuItem {
  id: string;
  name: string;
  description: string;
  price: number;
  category: 'meat';
  image: string;
  customizable?: boolean;
  portions?: string[];
}

export interface CartItem extends MenuItem {
  quantity: number;
  selectedPortion?: string;
}

export interface Order {
  id: string;
  items: CartItem[];
  customerInfo: CustomerInfo;
  paymentMethod: 'cash' | 'eft' | 'mobile';
  orderType: 'collection' | 'delivery';
  status: 'pending' | 'preparing' | 'ready' | 'completed' | 'cancelled';
  total: number;
  estimatedTime: number;
  createdAt: Date;
  deliveryAddress?: string;
  phone: string;
  email?: string;
}

export interface CustomerInfo {
  name: string;
  phone: string;
  email?: string;
}

export type Page = 'menu' | 'cart' | 'checkout' | 'track' | 'admin' | 'login';