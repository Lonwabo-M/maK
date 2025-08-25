import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { CartItem, Order, Page } from '../types';
import { storageManager } from '../utils/storage';

interface AppContextType {
  currentPage: Page;
  setCurrentPage: (page: Page) => void;
  cartItems: CartItem[];
  addToCart: (item: CartItem) => void;
  removeFromCart: (itemId: string) => void;
  updateCartItem: (itemId: string, updates: Partial<CartItem>) => void;
  clearCart: () => void;
  orders: Order[];
  addOrder: (order: Order) => void;
  updateOrder: (orderId: string, updates: Partial<Order>) => void;
  isAdmin: boolean;
  setIsAdmin: (admin: boolean) => void;
  totalCartValue: number;
  cartItemCount: number;
  storageError: string | null;
  dismissStorageError: () => void;
}

const AppContext = createContext<AppContextType | undefined>(undefined);

export const useApp = () => {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error('useApp must be used within AppProvider');
  }
  return context;
};

interface AppProviderProps {
  children: ReactNode;
}

export const AppProvider: React.FC<AppProviderProps> = ({ children }) => {
  const [currentPage, setCurrentPage] = useState<Page>('menu');
  const [cartItems, setCartItems] = useState<CartItem[]>([]);
  const [orders, setOrders] = useState<Order[]>([]);
  const [isAdmin, setIsAdmin] = useState(false);
  const [storageError, setStorageError] = useState<string | null>(null);

  // Load data from localStorage on mount
  useEffect(() => {
    try {
      const savedCart = storageManager.getCart();
      const savedOrders = storageManager.getOrders();
      
      setCartItems(savedCart);
      setOrders(savedOrders);
      setStorageError(null);
    } catch (error) {
      console.warn('Storage initialization failed:', error);
      setStorageError('Storage unavailable - data will not persist between sessions');
    }
  }, []);

  // Save cart to localStorage whenever it changes
  useEffect(() => {
    try {
      storageManager.saveCart(cartItems);
    } catch (error) {
      console.warn('Failed to save cart:', error);
    }
  }, [cartItems]);

  // Save orders to localStorage whenever they change
  useEffect(() => {
    try {
      storageManager.saveOrders(orders);
    } catch (error) {
      console.warn('Failed to save orders:', error);
    }
  }, [orders]);

  const addToCart = (item: CartItem) => {
    setCartItems(prev => {
      const existing = prev.find(i => 
        i.id === item.id && 
        i.selectedPortion === item.selectedPortion
      );
      
      if (existing) {
        return prev.map(i => 
          i === existing ? { ...i, quantity: i.quantity + item.quantity } : i
        );
      }
      
      return [...prev, item];
    });
  };

  const removeFromCart = (itemId: string) => {
    setCartItems(prev => prev.filter(item => item.id !== itemId));
  };

  const updateCartItem = (itemId: string, updates: Partial<CartItem>) => {
    setCartItems(prev => 
      prev.map(item => 
        item.id === itemId ? { ...item, ...updates } : item
      )
    );
  };

  const clearCart = () => {
    setCartItems([]);
  };

  const addOrder = (order: Order) => {
    setOrders(prev => [...prev, order]);
  };

  const updateOrder = (orderId: string, updates: Partial<Order>) => {
    setOrders(prev => 
      prev.map(order => 
        order.id === orderId ? { ...order, ...updates } : order
      )
    );
  };

  const totalCartValue = cartItems.reduce((total, item) => 
    total + (item.price * item.quantity), 0
  );

  const cartItemCount = cartItems.reduce((count, item) => 
    count + item.quantity, 0
  );

  return (
    <AppContext.Provider value={{
      currentPage,
      setCurrentPage,
      cartItems,
      addToCart,
      removeFromCart,
      updateCartItem,
      clearCart,
      orders,
      addOrder,
      updateOrder,
      isAdmin,
      setIsAdmin,
      totalCartValue,
      cartItemCount,
      storageError,
      dismissStorageError: () => setStorageError(null)
    }}>
      {children}
    </AppContext.Provider>
  );
};