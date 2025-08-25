import React, { useState } from 'react';
import { X } from 'lucide-react';
import { MenuItem } from '../types';

interface CustomizationModalProps {
  item: MenuItem;
  onClose: () => void;
  onAddToCart: (customizations: { portion?: string; braaIStyle?: string }) => void;
}

const CustomizationModal: React.FC<CustomizationModalProps> = ({
  item,
  onClose,
  onAddToCart
}) => {
  const [selectedPortion, setSelectedPortion] = useState(item.portions?.[0] || '');

  const handleSubmit = () => {
    onAddToCart({
      portion: selectedPortion
    });
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-end sm:items-center justify-center p-0 sm:p-4 z-50">
      <div className="bg-white rounded-t-xl sm:rounded-xl max-w-md w-full max-h-[90vh] sm:max-h-96 overflow-y-auto shadow-2xl">
        <div className="flex justify-between items-center p-6 border-b">
          <h2 className="text-lg sm:text-2xl font-bold text-gray-800">Customize {item.name}</h2>
          <button
            onClick={onClose}
            className="p-2 hover:bg-gray-100 rounded-full transition-colors min-h-[44px] min-w-[44px]"
          >
            <X size={24} />
          </button>
        </div>

        <div className="p-6 space-y-6">
          {/* Portion Selection */}
          {item.portions && (
            <div>
              <h3 className="text-base sm:text-lg font-semibold mb-3 text-gray-800">How many pieces?</h3>
              <div className="grid grid-cols-2 gap-2">
                {item.portions.map(portion => (
                  <button
                    key={portion}
                    onClick={() => setSelectedPortion(portion)}
                    className={`p-3 rounded-lg border-2 transition-all duration-200 min-h-[44px] text-sm sm:text-base active:scale-95 ${
                      selectedPortion === portion
                        ? 'border-orange-600 bg-orange-50 text-orange-800'
                        : 'border-gray-200 hover:border-orange-300'
                    }`}
                  >
                    {portion}
                  </button>
                ))}
              </div>
            </div>
          )}
        </div>

        <div className="p-6 border-t bg-gray-50 rounded-b-xl">
          <button
            onClick={handleSubmit}
            className="w-full bg-gradient-to-r from-orange-600 to-red-600 text-white py-3 rounded-lg font-semibold hover:from-orange-700 hover:to-red-700 transition-all duration-200 shadow-lg min-h-[44px] active:scale-95"
          >
            Add to Cart - R{item.price}/piece
          </button>
        </div>
      </div>
    </div>
  );
};

export default CustomizationModal;