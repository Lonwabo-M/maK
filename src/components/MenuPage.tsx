import React, { useState } from 'react';
import { Plus } from 'lucide-react';
import { menuItems } from '../data/menuData';
import { MenuItem, CartItem } from '../types';
import { useApp } from '../contexts/AppContext';
import CustomizationModal from './CustomizationModal';

const MenuPage: React.FC = () => {
  const { addToCart } = useApp();
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [customizingItem, setCustomizingItem] = useState<MenuItem | null>(null);

  const categories = [
    { id: 'all', name: 'All Items' },
    { id: 'meat', name: 'All Meat' }
  ];

  const filteredItems = selectedCategory === 'all' 
    ? menuItems 
    : menuItems.filter(item => item.category === selectedCategory);

  const handleAddToCart = (item: MenuItem, customizations?: { portion?: string; braaIStyle?: string }) => {
    const cartItem: CartItem = {
      ...item,
      quantity: 1,
      selectedPortion: customizations?.portion
    };
    addToCart(cartItem);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-50 to-red-50">
      {/* Hero Section */}
      <div className="bg-gradient-to-r from-orange-600 to-red-600 text-white py-8 sm:py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-2xl sm:text-3xl md:text-5xl font-bold mb-3 sm:mb-4">🥩 Welcome to maK</h1>
          <p className="text-lg sm:text-xl md:text-2xl text-orange-200 max-w-2xl mx-auto">
            Premium meat braai - beef, pork & sausage specialists
          </p>
          <div className="mt-4 sm:mt-6 text-xs sm:text-sm text-orange-200 bg-white bg-opacity-10 rounded-lg p-3 max-w-lg mx-auto">
            <p>🥩 Meat specialists • 🔥 Perfect braai • 🚚 Delivery available</p>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-3 sm:px-4 lg:px-8 py-6 sm:py-8">
        {/* Categories */}
        <div className="flex flex-wrap gap-2 mb-6 sm:mb-8 justify-center">
          {categories.map(category => (
            <button
              key={category.id}
              onClick={() => setSelectedCategory(category.id)}
              className={`px-4 sm:px-6 py-2 sm:py-3 rounded-full transition-all duration-200 font-medium text-sm sm:text-base min-h-[44px] ${
                selectedCategory === category.id
                  ? 'bg-orange-600 text-white shadow-lg'
                  : 'bg-white text-orange-600 hover:bg-orange-100 shadow-md'
              }`}
            >
              {category.name}
            </button>
          ))}
        </div>

        {/* Menu Items */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 sm:gap-6">
          {filteredItems.map(item => (
            <div
              key={item.id}
              className="bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1 active:scale-95"
            >
              <div className="relative">
                <img
                  src={item.image}
                  alt={item.name}
                  className="w-full h-40 sm:h-48 object-cover"
                />
                <div className="absolute top-4 right-4">
                  <span className="bg-orange-600 text-white px-2 sm:px-3 py-1 rounded-full text-xs sm:text-sm font-bold">
                    R{item.price}/piece
                  </span>
                </div>
              </div>

              <div className="p-4 sm:p-6">
                <h3 className="text-lg sm:text-xl font-bold text-gray-800 mb-2">{item.name}</h3>
                <p className="text-gray-600 mb-4 text-xs sm:text-sm leading-relaxed">{item.description}</p>
                
                <button
                  onClick={() => {
                    if (item.customizable) {
                      setCustomizingItem(item);
                    } else {
                      handleAddToCart(item);
                    }
                  }}
                  className="w-full bg-gradient-to-r from-orange-600 to-red-600 text-white py-3 sm:py-3 rounded-lg font-semibold hover:from-orange-700 hover:to-red-700 transition-all duration-200 flex items-center justify-center space-x-2 shadow-md hover:shadow-lg active:scale-95 min-h-[44px] text-sm sm:text-base"
                >
                  <Plus size={18} className="sm:w-5 sm:h-5" />
                  <span>{item.customizable ? 'Customize & Add' : 'Add to Cart'}</span>
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>

      {customizingItem && (
        <CustomizationModal
          item={customizingItem}
          onClose={() => setCustomizingItem(null)}
          onAddToCart={(customizations) => {
            handleAddToCart(customizingItem, customizations);
            setCustomizingItem(null);
          }}
        />
      )}
    </div>
  );
};

export default MenuPage;