import React from 'react';
import { Clock, CheckCircle, Truck, Phone, MessageCircle, Mail } from 'lucide-react';
import { useApp } from '../contexts/AppContext';

const TrackOrderPage: React.FC = () => {
  const { orders } = useApp();

  const activeOrders = orders.filter(order => 
    order.status !== 'completed' && order.status !== 'cancelled'
  );

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'pending': return 'text-yellow-600 bg-yellow-100';
      case 'preparing': return 'text-blue-600 bg-blue-100';
      case 'ready': return 'text-green-600 bg-green-100';
      default: return 'text-gray-600 bg-gray-100';
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'pending': return <Clock size={20} />;
      case 'preparing': return <Clock size={20} />;
      case 'ready': return <CheckCircle size={20} />;
      default: return <Clock size={20} />;
    }
  };

  if (activeOrders.length === 0) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-orange-50 to-red-50 flex items-center justify-center">
        <div className="text-center p-8">
          <Clock size={80} className="mx-auto text-gray-300 mb-4" />
          <h2 className="text-2xl font-bold text-gray-600 mb-2">No active orders</h2>
          <p className="text-gray-500 mb-6">Order some premium meat to track it here!</p>
          <button
            onClick={() => window.location.reload()}
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
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <h1 className="text-3xl font-bold text-gray-800 mb-8 text-center">Track Your Order</h1>
        
        <div className="space-y-6">
          {activeOrders.map(order => (
            <div key={order.id} className="bg-white rounded-xl shadow-lg overflow-hidden">
              <div className="bg-gradient-to-r from-orange-600 to-red-600 text-white p-6">
                <div className="flex justify-between items-start">
                  <div>
                    <h2 className="text-xl font-bold mb-1">Order #{order.id}</h2>
                    <p className="text-orange-200">
                      {order.createdAt.toLocaleDateString()} at {order.createdAt.toLocaleTimeString()}
                    </p>
                  </div>
                  <div className={`px-3 py-1 rounded-full flex items-center space-x-2 ${getStatusColor(order.status)}`}>
                    {getStatusIcon(order.status)}
                    <span className="font-semibold capitalize">{order.status}</span>
                  </div>
                </div>
              </div>

              <div className="p-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                  <div>
                    <h3 className="font-semibold text-gray-800 mb-2">Order Details</h3>
                    <div className="space-y-1 text-sm">
                      <p>Customer: {order.customerInfo.name}</p>
                      <p>Phone: {order.phone}</p>
                      <p>Type: {order.orderType === 'collection' ? 'Collection' : 'Delivery'}</p>
                      <p>Payment: {order.paymentMethod.toUpperCase()}</p>
                      <p className="font-semibold">Total: R{order.total.toFixed(2)}</p>
                    </div>
                  </div>
                  
                  <div>
                    <h3 className="font-semibold text-gray-800 mb-2">Estimated Time</h3>
                    <div className="text-2xl font-bold text-orange-600 mb-2">
                      {order.estimatedTime} minutes
                    </div>
                    <p className="text-sm text-gray-600">
                      Expected ready time: {' '}
                      {new Date(order.createdAt.getTime() + order.estimatedTime * 60000).toLocaleTimeString()}
                    </p>
                  </div>
                </div>

                <div className="border-t pt-4">
                  <h3 className="font-semibold text-gray-800 mb-3">Order Items</h3>
                  <div className="space-y-2">
                    {order.items.map((item, index) => (
                      <div key={index} className="flex justify-between items-center text-sm">
                        <div>
                          <span className="font-medium">{item.name}</span>
                          {item.selectedPortion && (
                            <span className="text-gray-600"> - {item.selectedPortion}</span>
                          )}
                          <span className="text-gray-600"> x{item.quantity}</span>
                        </div>
                        <span className="font-medium">R{(item.price * item.quantity).toFixed(2)}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {order.status === 'ready' && (
                  <div className="mt-6 p-4 bg-green-50 border border-green-200 rounded-lg">
                    <div className="flex items-center space-x-2 text-green-800 mb-2">
                      <CheckCircle size={20} />
                      <span className="font-semibold">Your order is ready!</span>
                    </div>
                    <p className="text-sm text-green-700">
                      {order.orderType === 'collection' 
                        ? 'Please come collect your order at the restaurant'
                        : 'Our delivery person is on the way to your address'
                      }
                    </p>
                  </div>
                )}

                <div className="mt-6 flex flex-wrap gap-3">
                  <a
                    href={`tel:${order.phone}`}
                    className="flex items-center space-x-2 px-4 py-2 bg-blue-100 text-blue-700 rounded-lg hover:bg-blue-200 transition-colors"
                  >
                    <Phone size={16} />
                    <span>Call</span>
                  </a>
                  <a
                    href={`https://wa.me/27${order.phone.replace(/^0/, '')}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center space-x-2 px-4 py-2 bg-green-100 text-green-700 rounded-lg hover:bg-green-200 transition-colors"
                  >
                    <MessageCircle size={16} />
                    <span>WhatsApp</span>
                  </a>
                  {order.email && (
                    <a
                      href={`mailto:${order.email}`}
                      className="flex items-center space-x-2 px-4 py-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition-colors"
                    >
                      <Mail size={16} />
                      <span>Email</span>
                    </a>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default TrackOrderPage;