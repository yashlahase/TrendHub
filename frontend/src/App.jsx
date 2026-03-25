import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Home from './pages/Home';
import ProductDetails from './pages/ProductDetails';
import Cart from './pages/Cart';
import Login from './pages/Login';
import Register from './pages/Register';

const App = () => {
  return (
    <Router>
      <Navbar />
      <main className="min-h-screen">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/product/:id" element={<ProductDetails />} />
          <Route path="/cart" element={<Cart />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/category/:category" element={<div>Category Page</div>} />
        </Routes>
      </main>
      
      {/* Footer Placeholder for now */}
      <footer className="bg-primary text-white py-12 border-t border-accent/20">
        <div className="max-w-7xl mx-auto px-4 text-center">
          <p className="text-sm tracking-widest uppercase">© 2026 TRENDHUB. ALL RIGHTS RESERVED.</p>
        </div>
      </footer>
    </Router>
  );
};

export default App;
