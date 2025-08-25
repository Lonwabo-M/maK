import React, { useState } from 'react';
import { CreditCard, Truck, MapPin, Phone, Mail, User } from 'lucide-react';
import { useApp } from '../contexts/AppContext';
import { Order, CustomerInfo } from '../types';

const CheckoutPage: React.FC = () => {
  const { cartItems, totalCartValue, addOrder, clearCart, setCurrentPage } = useApp();
  const [customerInfo, setCustomerInfo] = useState<CustomerInfo>({
    name: '',
    phone: '',
    email: ''
  });
  const [paymentMethod, setPaymentMethod] = useState<'cash' | 'eft' | 'mobile'>('cash');
  const [orderType, setOrderType] = useState<'collection' | 'delivery'>('collection');
  const [deliveryAddress, setDeliveryAddress] = useState('');
  const [isProcessing, setIsProcessing] = useState(false);

  const deliveryFee = orderType === 'delivery' ? 25 : 0;
  const finalTotal = totalCartValue + deliveryFee;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsProcessing(true);

    // Simulate payment processing
    await new Promise(resolve => setTimeout(resolve, 2000));

    const newOrder: Order = {
      id: Date.now().toString(),
      items: cartItems,
      customerInfo,
      paymentMethod,
      orderType,
      status: 'pending',
      total: finalTotal,
      estimatedTime: 25 + Math.floor(Math.random() * 15), // 25-40 minutes
      createdAt: new Date(),
      deliveryAddress: orderType === 'delivery' ? deliveryAddress : undefined,
      phone: customerInfo.phone,
      email: customerInfo.email
    };

    addOrder(newOrder);
    clearCart();
    setCurrentPage('track');
    setIsProcessing(false);
  };

  const paymentOptions = [
    { id: 'cash' as const, name: 'Cash on Collection/Delivery', icon: '💰' },
    { id: 'eft' as const, name: 'EFT Transfer', icon: '🏦' },
    { id: 'mobile' as const, name: 'Mobile Payment', icon: '📱' }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-50 to-red-50">
      <div className="max-w-4xl mx-auto px-3 sm:px-4 lg:px-8 py-6 sm:py-8">
        <div className="bg-white rounded-xl shadow-lg overflow-hidden">
          <div className="bg-gradient-to-r from-orange-600 to-red-600 text-white p-6">
            <h1 className="text-xl sm:text-2xl font-bold flex items-center">
              <CreditCard className="mr-3" />
              Checkout
            </h1>
          </div>

          <form onSubmit={handleSubmit} className="p-6 space-y-8">
            {/* Customer Information */}
            <div>
              <h2 className="text-lg sm:text-xl font-semibold mb-4 flex items-center">
                <User className="mr-2" />
                Customer Information
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Full Name *
                  </label>
                  <input
                    type="text"
                    required
                    value={customerInfo.name}
                    onChange={(e) => setCustomerInfo(prev => ({ ...prev, name: e.target.value }))}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent min-h-[44px]"
                    placeholder="Your name"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Phone Number *
                  </label>
                  <input
                    type="tel"
                    required
                    value={customerInfo.phone}
                    onChange={(e) => setCustomerInfo(prev => ({ ...prev, phone: e.target.value }))}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent min-h-[44px]"
                    placeholder="078 123 4567"
                  />
                </div>
                <div className="md:col-span-2">
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Email (Optional)
                  </label>
                  <input
                    type="email"
                    value={customerInfo.email}
                    onChange={(e) => setCustomerInfo(prev => ({ ...prev, email: e.target.value }))}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent min-h-[44px]"
                    placeholder="your@email.com"
                  />
                </div>
              </div>
            </div>

            {/* Order Type */}
            <div>
              <h2 className="text-lg sm:text-xl font-semibold mb-4 flex items-center">
                <Truck className="mr-2" />
                Order Type
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <label className={`relative p-4 border-2 rounded-lg cursor-pointer transition-all ${
                  orderType === 'collection'
                    ? 'border-orange-500 bg-orange-50'
                    : 'border-gray-300 hover:border-gray-400'
                }`}>
                  <input
                    type="radio"
                    name="orderType"
                    value="collection"
                    checked={orderType === 'collection'}
                    onChange={(e) => setOrderType(e.target.value as 'collection')}
                    className="sr-only"
                  />
                  <div className="flex items-center space-x-3">
                    <MapPin size={24} />
                    <div>
                      <p className="font-semibold">Collection</p>
                      <p className="text-sm text-gray-600">Pick up from restaurant</p>
                    </div>
                  </div>
                </label>
                
                <label className={`relative p-4 border-2 rounded-lg cursor-pointer transition-all ${
                  orderType === 'delivery'
                    ? 'border-orange-500 bg-orange-50'
                    : 'border-gray-300 hover:border-gray-400'
                }`}>
                  <input
                    type="radio"
                    name="orderType"
                    value="delivery"
                    checked={orderType === 'delivery'}
                    onChange={(e) => setOrderType(e.target.value as 'delivery')}
                    className="sr-only"
                  />
                  <div className="flex items-center space-x-3">
                    <Truck size={24} />
                    <div>
                      <p className="font-semibold">Delivery (+R25)</p>
                      <p className="text-sm text-gray-600">Delivered to your door</p>
                    </div>
                  </div>
                </label>
              </div>

              {orderType === 'delivery' && (
                <div className="mt-4">
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Delivery Address *
                  </label>
                  <textarea
                    required
                    value={deliveryAddress}
                    onChange={(e) => setDeliveryAddress(e.target.value)}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent min-h-[88px]"
                    placeholder="Enter your full delivery address"
                    rows={3}
                  />
                </div>
              )}
            </div>

            {/* Payment Method */}
            <div>
              <h2 className="text-lg sm:text-xl font-semibold mb-4 flex items-center">
                <CreditCard className="mr-2" />
                Payment Method
              </h2>
              <div className="space-y-3">
                {paymentOptions.map(option => (
                  <label key={option.id} className={`relative p-4 border-2 rounded-lg cursor-pointer transition-all ${
                    paymentMethod === option.id
                      ? 'border-orange-500 bg-orange-50'
                      : 'border-gray-300 hover:border-gray-400'
                  }`}>
                    <input
                      type="radio"
                      name="paymentMethod"
                      value={option.id}
                      checked={paymentMethod === option.id}
                      onChange={(e) => setPaymentMethod(e.target.value as typeof paymentMethod)}
                      className="sr-only"
                    />
                    <div className="flex items-center space-x-3">
                      <span className="text-2xl">{option.icon}</span>
                      <p className="font-semibold">{option.name}</p>
                    </div>
                  </label>
                ))}
              </div>
            </div>

            {/* Order Summary */}
            <div className="bg-gray-50 p-6 rounded-lg">
              <h3 className="text-base sm:text-lg font-semibold mb-4">Order Summary</h3>
              <div className="space-y-2">
                <div className="flex justify-between">
                  <span>Subtotal:</span>
                  <span>R{totalCartValue.toFixed(2)}</span>
                </div>
                {deliveryFee > 0 && (
                  <div className="flex justify-between">
                    <span>Delivery Fee:</span>
                    <span>R{deliveryFee.toFixed(2)}</span>
                  </div>
                )}
                <div className="border-t pt-2 flex justify-between text-lg font-bold">
                  <span>Total:</span>
                  <span className="text-orange-600 text-lg sm:text-xl">R{finalTotal.toFixed(2)}</span>
                </div>
              </div>
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              disabled={isProcessing}
              className="w-full bg-gradient-to-r from-orange-600 to-red-600 text-white py-4 rounded-lg font-bold text-base sm:text-lg hover:from-orange-700 hover:to-red-700 transition-all duration-200 shadow-lg disabled:opacity-50 min-h-[52px] active:scale-95"
            >
              {isProcessing ? 'Processing Order...' : `Place Order - R${finalTotal.toFixed(2)}`}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default CheckoutPage;