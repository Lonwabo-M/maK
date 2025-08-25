// Storage utility with fallback mechanisms
interface StorageData {
  cart: any[];
  orders: any[];
  adminSettings: any;
}

class StorageManager {
  private storageKey = 'braai-restaurant-data';
  private fallbackData: StorageData = {
    cart: [],
    orders: [],
    adminSettings: {}
  };

  // Test if localStorage is available and working
  private isLocalStorageAvailable(): boolean {
    try {
      const test = '__storage_test__';
      localStorage.setItem(test, test);
      localStorage.removeItem(test);
      return true;
    } catch (e) {
      return false;
    }
  }

  // Get data with fallback to memory storage
  getData(): StorageData {
    if (this.isLocalStorageAvailable()) {
      try {
        const stored = localStorage.getItem(this.storageKey);
        if (stored) {
          return { ...this.fallbackData, ...JSON.parse(stored) };
        }
      } catch (e) {
        console.warn('Failed to parse stored data, using fallback');
      }
    }
    return this.fallbackData;
  }

  // Save data with fallback to memory storage
  saveData(data: Partial<StorageData>): void {
    const currentData = this.getData();
    const newData = { ...currentData, ...data };
    
    if (this.isLocalStorageAvailable()) {
      try {
        localStorage.setItem(this.storageKey, JSON.stringify(newData));
        return;
      } catch (e) {
        console.warn('Failed to save to localStorage, using memory storage');
      }
    }
    
    // Fallback to memory storage
    this.fallbackData = newData;
  }

  // Clear all data
  clearData(): void {
    if (this.isLocalStorageAvailable()) {
      try {
        localStorage.removeItem(this.storageKey);
      } catch (e) {
        console.warn('Failed to clear localStorage');
      }
    }
    this.fallbackData = {
      cart: [],
      orders: [],
      adminSettings: {}
    };
  }

  // Get specific data type
  getCart(): any[] {
    return this.getData().cart || [];
  }

  getOrders(): any[] {
    return this.getData().orders || [];
  }

  // Save specific data type
  saveCart(cart: any[]): void {
    this.saveData({ cart });
  }

  saveOrders(orders: any[]): void {
    this.saveData({ orders });
  }
}

export const storageManager = new StorageManager();