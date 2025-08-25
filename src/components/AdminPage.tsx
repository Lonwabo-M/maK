import React, { useState } from 'react';
import { Package, DollarSign, Clock, CheckCircle2, Users, TrendingUp } from 'lucide-react';
import { useApp } from '../contexts/AppContext';

const AdminPage: React.FC = () => {
  const { orders, updateOrder } = useApp();
  const [activeTab, setActiveTab] = useState<'orders' | 'analytics'>('orders');

  const pendingOrders = orders.filter(order => order.status === 'pending');
  const preparingOrders = orders.filter(order => order.status === 'preparing');
  const readyOrders = orders.filter(order => order.status === 'ready');
  const completedOrders = orders.filter(order => order.status === 'completed');

  const todayOrders = orders.filter(order => {
    const today = new Date();
    const orderDate = new Date(order.createdAt);
    return orderDate.toDateString() === today.toDateString();
  });

  const todayRevenue = todayOrders.reduce((sum, order) => sum + order.total, 0);

  const handleStatusUpdate = (orderId: string, newStatus: string) => {
    updateOrder(orderId, { status: newStatus as any });
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'pending': return 'bg-yellow-100 text-yellow-800';
      case 'preparing': return 'bg-blue-100 text-blue-800';
      case 'ready': return 'bg-green-100 text-green-800';
      case 'completed': return 'bg-gray-100 text-gray-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const OrderCard = ({ order }: { order: any }) => (
    <div className="bg-white rounded-lg shadow-md p-4 mb-4">
      <div className="flex justify-between items-start mb-3">
        <div>
          <h3 className="font-bold text-lg">Order #{order.id}</h3>
          <p className="text-sm text-gray-600">{order.customerInfo.name} - {order.phone}</p>
          <p className="text-sm text-gray-600">
            {order.orderType === 'delivery' ? '🚚 Delivery' : '📦 Collection'}
          </p>
        </div>
        <div className="text-right">
          <p className="font-bold text-lg text-green-600">R{order.total.toFixed(2)}</p>
          <p className="text-xs text-gray-500">
            {new Date(order.createdAt).toLocaleTimeString()}
          </p>
        </div>
      </div>

      <div className="mb-3">
        <h4 className="font-semibold text-sm mb-1">Items:</h4>
        <div className="text-sm space-y-1">
          {order.items.map((item: any, idx: number) => (
            <div key={idx} className="flex justify-between">
              <span>
                {item.name} x{item.quantity}
                {item.selectedPortion && ` (${item.selectedPortion})`}
                {item.selectedBraaiStyle && ` - ${item.selectedBraaiStyle}`}
              </span>
              <span>R{(item.price * item.quantity).toFixed(2)}</span>
            </div>
          ))}
        </div>
      </div>

      <div className="flex justify-between items-center">
        <span className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(order.status)}`}>
          {order.status.toUpperCase()}
        </span>
        
        <div className="flex space-x-2">
          {order.status === 'pending' && (
            <button
              onClick={() => handleStatusUpdate(order.id, 'preparing')}
              className="px-3 py-1 bg-blue-600 text-white rounded text-xs hover:bg-blue-700 transition-colors"
            >
              Start Preparing
            </button>
          )}
          {order.status === 'preparing' && (
            <button
              onClick={() => handleStatusUpdate(order.id, 'ready')}
              className="px-3 py-1 bg-green-600 text-white rounded text-xs hover:bg-green-700 transition-colors"
            >
              Mark Ready
            </button>
          )}
          {order.status === 'ready' && (
            <button
              onClick={() => handleStatusUpdate(order.id, 'completed')}
              className="px-3 py-1 bg-gray-600 text-white rounded text-xs hover:bg-gray-700 transition-colors"
            >
              Complete
            </button>
          )}
        </div>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-gray-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-800 mb-2">maK Admin Dashboard</h1>
          <p className="text-gray-600">Manage your premium meat braai operations</p>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <div className="bg-white rounded-lg shadow-md p-6">
            <div className="flex items-center">
              <div className="p-3 bg-yellow-100 rounded-full">
                <Clock className="h-6 w-6 text-yellow-600" />
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-600">Pending Orders</p>
                <p className="text-2xl font-bold text-gray-900">{pendingOrders.length}</p>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-lg shadow-md p-6">
            <div className="flex items-center">
              <div className="p-3 bg-blue-100 rounded-full">
                <Package className="h-6 w-6 text-blue-600" />
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-600">Preparing</p>
                <p className="text-2xl font-bold text-gray-900">{preparingOrders.length}</p>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-lg shadow-md p-6">
            <div className="flex items-center">
              <div className="p-3 bg-green-100 rounded-full">
                <CheckCircle2 className="h-6 w-6 text-green-600" />
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-600">Ready</p>
                <p className="text-2xl font-bold text-gray-900">{readyOrders.length}</p>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-lg shadow-md p-6">
            <div className="flex items-center">
              <div className="p-3 bg-orange-100 rounded-full">
                <DollarSign className="h-6 w-6 text-orange-600" />
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-600">Today's Revenue</p>
                <p className="text-2xl font-bold text-gray-900">R{todayRevenue.toFixed(2)}</p>
              </div>
            </div>
          </div>
        </div>

        {/* Tab Navigation */}
        <div className="mb-6">
          <nav className="flex space-x-8">
            <button
              onClick={() => setActiveTab('orders')}
              className={`py-2 px-1 border-b-2 font-medium text-sm ${
                activeTab === 'orders'
                  ? 'border-orange-500 text-orange-600'
                  : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
              }`}
            >
              Order Management
            </button>
            <button
              onClick={() => setActiveTab('analytics')}
              className={`py-2 px-1 border-b-2 font-medium text-sm ${
                activeTab === 'analytics'
                  ? 'border-orange-500 text-orange-600'
                  : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
              }`}
            >
              Analytics
            </button>
          </nav>
        </div>

        {activeTab === 'orders' ? (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            <div>
              <h2 className="text-xl font-bold text-gray-800 mb-4 flex items-center">
                <Clock className="mr-2 text-yellow-600" />
                Pending ({pendingOrders.length})
              </h2>
              {pendingOrders.map(order => (
                <OrderCard key={order.id} order={order} />
              ))}
            </div>

            <div>
              <h2 className="text-xl font-bold text-gray-800 mb-4 flex items-center">
                <Package className="mr-2 text-blue-600" />
                Preparing ({preparingOrders.length})
              </h2>
              {preparingOrders.map(order => (
                <OrderCard key={order.id} order={order} />
              ))}
            </div>

            <div>
              <h2 className="text-xl font-bold text-gray-800 mb-4 flex items-center">
                <CheckCircle2 className="mr-2 text-green-600" />
                Ready ({readyOrders.length})
              </h2>
              {readyOrders.map(order => (
                <OrderCard key={order.id} order={order} />
              ))}
            </div>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="bg-white rounded-lg shadow-md p-6">
              <h2 className="text-xl font-bold text-gray-800 mb-4 flex items-center">
                <TrendingUp className="mr-2 text-green-600" />
                Today's Performance
              </h2>
              <div className="space-y-4">
                <div className="flex justify-between">
                  <span className="text-gray-600">Total Orders:</span>
                  <span className="font-semibold">{todayOrders.length}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Revenue:</span>
                  <span className="font-semibold text-green-600">R{todayRevenue.toFixed(2)}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Average Order:</span>
                  <span className="font-semibold">
                    R{todayOrders.length ? (todayRevenue / todayOrders.length).toFixed(2) : '0.00'}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Completed:</span>
                  <span className="font-semibold">{completedOrders.length}</span>
                </div>
              </div>
            </div>

            <div className="bg-white rounded-lg shadow-md p-6">
              <h2 className="text-xl font-bold text-gray-800 mb-4 flex items-center">
                <Users className="mr-2 text-blue-600" />
                Popular Items
              </h2>
              <div className="space-y-3">
                <div className="text-sm text-gray-600">Most ordered items today:</div>
                <div className="space-y-2">
                  <div className="flex justify-between items-center p-2 bg-gray-50 rounded">
                    <span>Boerewors</span>
                    <span className="font-semibold">8 orders</span>
                  </div>
                  <div className="flex justify-between items-center p-2 bg-gray-50 rounded">
                    <span>Lamb Chops</span>
                    <span className="font-semibold">5 orders</span>
                  </div>
                  <div className="flex justify-between items-center p-2 bg-gray-50 rounded">
                    <span>Chicken Wings</span>
                    <span className="font-semibold">4 orders</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default AdminPage;