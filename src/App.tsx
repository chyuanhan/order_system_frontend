import React from 'react';
import { BrowserRouter as Router, Routes, Route} from 'react-router-dom';
import MenuPage from './pages/User/MenuPage';
import OrderDetailsPage from './pages/User/OrderDetailsPage';
import OrderConfirmationPage from './pages/User/OrderConfirmationPage';
import {CartProvider} from './context/CartContext';


const App: React.FC = () => {
  
  return (
    <CartProvider>
        <Router>
          <Routes>
            <Route path="/table/:tableNumber" element={<MenuPage />} />
            <Route path="/table/:tableNumber/order-details" element={<OrderDetailsPage />} />
            <Route path="/table/:tableNumber/order-confirmation" element={<OrderConfirmationPage />} />
          </Routes>
        </Router>
    </CartProvider>
  );
};

export default App;
