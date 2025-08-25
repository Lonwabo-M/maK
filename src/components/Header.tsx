import React from 'react';
import { ShoppingCart, User, Home, Clock, Settings } from 'lucide-react';
import { useApp } from '../contexts/AppContext';

const Header: React.FC = () => {
  const { currentPage, setCurrentPage, cartItemCount, isAdmin, setIsAdmin } = useApp();

  const navItems = isAdmin ? [
    { id: 'admin' as const, icon: Settings, label: 'Admin' },
  ] : [
    { id: 'menu' as const, icon: Home, label: 'Menu' },
    { id: 'track' as const, icon: Clock, label: 'Track' },
    { id: 'cart' as const, icon: ShoppingCart, label: 'Cart', badge: cartItemCount },
  ];

  return (
    <header className="bg-gradient-to-r from-orange-600 to-red-600 text-white shadow-lg sticky top-0 z-40">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-14 sm:h-16">
          <div className="flex items-center">
            <div className="text-lg sm:text-xl md:text-2xl font-bold">🥩 maK</div>
            <p className="ml-2 sm:ml-3 text-orange-200 text-xs sm:text-sm hidden xs:block">Premium Meat</p>
          </div>

          <nav className="flex items-center space-x-1 sm:space-x-2">
            {navItems.map(({ id, icon: Icon, label, badge }) => (
              <button
                key={id}
                onClick={() => setCurrentPage(id)}
                className={`relative px-2 sm:px-3 py-2 rounded-lg transition-colors duration-200 flex items-center space-x-1 min-h-[44px] ${
                  currentPage === id
                    ? 'bg-white bg-opacity-20 text-white'
                    : 'text-orange-100 hover:bg-white hover:bg-opacity-10'
                }`}
              >
                <Icon size={18} className="sm:w-5 sm:h-5" />
                <span className="hidden sm:inline text-sm">{label}</span>
                {badge && badge > 0 && (
                  <span className="absolute -top-1 -right-1 bg-yellow-400 text-orange-800 text-xs rounded-full h-4 w-4 sm:h-5 sm:w-5 flex items-center justify-center font-bold">
                    {badge}
                  </span>
                )}
              </button>
            ))}

            <button
              onClick={() => {
                setIsAdmin(!isAdmin);
                setCurrentPage(isAdmin ? 'menu' : 'admin');
              }}
              className="ml-2 sm:ml-4 px-2 sm:px-3 py-2 rounded-lg bg-white bg-opacity-10 hover:bg-opacity-20 transition-colors duration-200 flex items-center space-x-1 min-h-[44px]"
            >
              <User size={18} className="sm:w-5 sm:h-5" />
              <span className="hidden sm:inline text-sm">
                {isAdmin ? 'Customer View' : 'Admin'}
              </span>
            </button>
          </nav>
        </div>
      </div>
    </header>
  );
};

export default Header;