import React, { useState } from 'react';
import { ShoppingCart, User, Search, Menu, X } from 'lucide-react';
import { Link } from 'react-router-dom';

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <nav className="fixed w-full z-50 bg-white/80 backdrop-blur-md border-b border-secondary">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-20 items-center">
          {/* Logo */}
          <div className="flex-shrink-0 flex items-center">
            <Link to="/" className="text-2xl font-bold tracking-tighter text-primary">
              TREND<span className="text-accent">HUB</span>
            </Link>
          </div>

          {/* Desktop Menu */}
          <div className="hidden md:flex space-x-12 items-center">
            <Link to="/category/men" className="nav-link">Men</Link>
            <Link to="/category/women" className="nav-link">Women</Link>
            <Link to="/category/kids" className="nav-link">Kids</Link>
            <Link to="/category/accessories" className="nav-link">Accessories</Link>
          </div>

          {/* Actions */}
          <div className="hidden md:flex items-center space-x-6">
            <button className="text-primary hover:text-accent transition-colors duration-300">
              <Search size={22} className="stroke-[1.5px]" />
            </button>
            <Link to="/login" className="text-primary hover:text-accent transition-colors duration-300">
              <User size={22} className="stroke-[1.5px]" />
            </Link>
            <Link to="/cart" className="relative group text-primary hover:text-accent transition-colors duration-300">
              <ShoppingCart size={22} className="stroke-[1.5px]" />
              <span className="absolute -top-2 -right-2 bg-accent text-white text-[10px] w-4 h-4 rounded-full flex items-center justify-center font-bold">
                0
              </span>
            </Link>
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden flex items-center">
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="text-primary p-2 focus:outline-none"
            >
              {isOpen ? <X size={28} /> : <Menu size={28} />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      {isOpen && (
        <div className="md:hidden bg-white border-t border-secondary animate-in slide-in-from-top duration-300">
          <div className="px-4 pt-4 pb-8 space-y-4">
            <Link to="/category/men" className="block text-lg font-medium text-primary py-2 border-b border-secondary" onClick={() => setIsOpen(false)}>Men</Link>
            <Link to="/category/women" className="block text-lg font-medium text-primary py-2 border-b border-secondary" onClick={() => setIsOpen(false)}>Women</Link>
            <Link to="/category/kids" className="block text-lg font-medium text-primary py-2 border-b border-secondary" onClick={() => setIsOpen(false)}>Kids</Link>
            <Link to="/category/accessories" className="block text-lg font-medium text-primary py-2 border-b border-secondary" onClick={() => setIsOpen(false)}>Accessories</Link>
            <div className="flex space-x-6 pt-4">
              <Link to="/login" onClick={() => setIsOpen(false)}><User size={24} /></Link>
              <Link to="/cart" className="relative" onClick={() => setIsOpen(false)}>
                <ShoppingCart size={24} />
                <span className="absolute -top-2 -right-2 bg-accent text-white text-[10px] w-4 h-4 rounded-full flex items-center justify-center font-bold">
                  0
                </span>
              </Link>
            </div>
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
