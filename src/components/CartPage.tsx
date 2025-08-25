import React from 'react';
import { Minus, Plus, Trash2, ShoppingBag } from 'lucide-react';
import { useApp } from '../contexts/AppContext';

const CartPage: React.FC = () => {
  const {
    cartItems,
    updateCartItem,
    removeFromCart,
    totalCartValue,
    setCurrentPage,
    cartItemCount
  } = useApp();

  const updateQuantity = (itemId: string, newQuantity: number) => {
    if (newQuantity <= 0) {
      removeFromCart(itemId);
    } else {
      updateCartItem(itemId, { quantity: newQuantity });
    }
  };

  if (cartItems.length === 0) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-orange-50 to-red-50 flex items-center justify-center">
        <div className="text-center p-8">
          <ShoppingBag size={80} className="mx-auto text-gray-300 mb-4" />
          <h2 className="text-2xl font-bold text-gray-600 mb-2">Your cart is empty</h2>
          <p className="text-gray-500 mb-6">Add some premium meat to get started!</p>
          <button
            onClick={() => setCurrentPage('menu')}
            className="bg-gradient-to-r from-orange-600 to-red-600 text-white px-8 py-3 rounded-lg font-semibold hover:from-orange-700 hover:to-red-700 transition-all duration-200 shadow-lg"
          >
            Browse Meat
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-50 to-red-50">
      <div className="max-w-4xl mx-auto px-3 sm:px-4 lg:px-8 py-6 sm:py-8">
        <div className="bg-white rounded-xl shadow-lg overflow-hidden">
          <div className="bg-gradient-to-r from-orange-600 to-red-600 text-white p-6">
            <h1 className="text-xl sm:text-2xl font-bold flex items-center">
              <ShoppingBag className="mr-3" />
              Your Order ({cartItemCount} items)
            </h1>
          </div>

          <div className="divide-y divide-gray-200">
            {cartItems.map((item, index) => (
              <div key={`${item.id}-${index}`} className="p-4 sm:p-6 hover:bg-gray-50 transition-colors">
                <div className="flex items-start sm:items-center space-x-3 sm:space-x-4">
                  <img
                    src={item.image}
                    alt={item.name}
                    className="w-12 h-12 sm:w-16 sm:h-16 object-cover rounded-lg flex-shrink-0"
                  />
                  
                  <div className="flex-1">
                    <h3 className="text-base sm:text-lg font-semibold text-gray-800">{item.name}</h3>
                    <div className="text-xs sm:text-sm text-gray-600 space-y-1">
                      {item.selectedPortion && (
                        <p>Portion: <span className="font-medium">{item.selectedPortion}</span></p>
                      )}
                    </div>
                  </div>

                  <div className="flex flex-col sm:flex-row items-center space-y-2 sm:space-y-0 sm:space-x-3">
                    <div className="flex items-center space-x-2 sm:space-x-3">
                    <button
                      onClick={() => updateQuantity(item.id, item.quantity - 1)}
                      className="p-2 rounded-full bg-gray-100 hover:bg-gray-200 transition-colors min-h-[44px] min-w-[44px] flex items-center justify-center"
                    >
                      <Minus size={16} />
                    </button>
                    
                    <span className="text-base sm:text-lg font-semibold min-w-[2.5rem] text-center">
                      {item.quantity}
                    </span>
                    
                    <button
                      onClick={() => updateQuantity(item.id, item.quantity + 1)}
                      className="p-2 rounded-full bg-gray-100 hover:bg-gray-200 transition-colors min-h-[44px] min-w-[44px] flex items-center justify-center"
                    >
                      <Plus size={16} />
                    </button>
                    </div>

                    <div className="text-center sm:text-right">
                      <p className="text-base sm:text-lg font-bold text-gray-800">
                        R{(item.price * item.quantity).toFixed(2)}
                      </p>
                      <button
                        onClick={() => removeFromCart(item.id)}
                        className="text-red-500 hover:text-red-700 transition-colors mt-1 p-1 min-h-[44px] min-w-[44px] flex items-center justify-center"
                      >
                        <Trash2 size={16} />
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>

          <div className="bg-gray-50 p-6 border-t-2 border-gray-200">
            <div className="flex justify-between items-center mb-6">
              <span className="text-lg sm:text-xl font-bold text-gray-800">Total:</span>
              <span className="text-xl sm:text-2xl font-bold text-orange-600">
                R{totalCartValue.toFixed(2)}
              </span>
            </div>
            
            <div className="flex flex-col sm:flex-row gap-3">
              <button
                onClick={() => setCurrentPage('menu')}
                className="flex-1 bg-gray-200 text-gray-800 py-3 rounded-lg font-semibold hover:bg-gray-300 transition-all duration-200 min-h-[44px] active:scale-95"
              >
                Continue Shopping
              </button>
              <button
                onClick={() => setCurrentPage('checkout')}
                className="flex-1 bg-gradient-to-r from-orange-600 to-red-600 text-white py-3 rounded-lg font-semibold hover:from-orange-700 hover:to-red-700 transition-all duration-200 shadow-lg min-h-[44px] active:scale-95"
              >
                Proceed to Checkout
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CartPage;