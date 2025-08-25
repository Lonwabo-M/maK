import React from 'react';
import { AppProvider, useApp } from './contexts/AppContext';
import StorageWarning from './components/StorageWarning';
import Header from './components/Header';
import MenuPage from './components/MenuPage';
import CartPage from './components/CartPage';
import CheckoutPage from './components/CheckoutPage';
import TrackOrderPage from './components/TrackOrderPage';
import AdminPage from './components/AdminPage';

const AppContent: React.FC = () => {
  const { currentPage, storageError, dismissStorageError } = useApp();

  const renderPage = () => {
    switch (currentPage) {
      case 'menu':
        return <MenuPage />;
      case 'cart':
        return <CartPage />;
      case 'checkout':
        return <CheckoutPage />;
      case 'track':
        return <TrackOrderPage />;
      case 'admin':
        return <AdminPage />;
      default:
        return <MenuPage />;
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {storageError && (
        <StorageWarning 
          message={storageError} 
          onDismiss={dismissStorageError} 
        />
      )}
      <Header />
      {renderPage()}
    </div>
  );
};

function App() {
  return (
    <AppProvider>
      <AppContent />
    </AppProvider>
  );
}

export default App;