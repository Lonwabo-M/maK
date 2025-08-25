import React from 'react';
import { AlertTriangle, X } from 'lucide-react';

interface StorageWarningProps {
  message: string;
  onDismiss: () => void;
}

const StorageWarning: React.FC<StorageWarningProps> = ({ message, onDismiss }) => {
  return (
    <div className="fixed top-4 left-4 right-4 z-50 max-w-md mx-auto">
      <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4 shadow-lg">
        <div className="flex items-start space-x-3">
          <AlertTriangle className="text-yellow-600 flex-shrink-0 mt-0.5" size={20} />
          <div className="flex-1">
            <h3 className="text-sm font-medium text-yellow-800 mb-1">
              Storage Notice
            </h3>
            <p className="text-sm text-yellow-700">
              {message}
            </p>
            <p className="text-xs text-yellow-600 mt-2">
              Your cart and orders will work normally but won't be saved when you close the browser.
            </p>
          </div>
          <button
            onClick={onDismiss}
            className="text-yellow-600 hover:text-yellow-800 flex-shrink-0"
          >
            <X size={16} />
          </button>
        </div>
      </div>
    </div>
  );
};

export default StorageWarning;