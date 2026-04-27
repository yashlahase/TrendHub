import React, { useState, useContext } from 'react';
import { ShoppingCart, User, Search, Menu, X, Heart, Package } from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';
import { ShopContext } from '../context/ShopContext';

const Navbar = () => {
  const navigate = useNavigate();
  const [isOpen, setIsOpen] = useState(false);
  const { cart, wishlist, userInfo, logout } = useContext(ShopContext);
  const cartCount = cart.reduce((acc, item) => acc + item.qty, 0);

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
            <div className="relative group">
              <input 
                type="text" 
                placeholder="Search..." 
                onKeyDown={(e) => {
                  if (e.key === 'Enter') {
                    navigate(`/search/${e.target.value}`);
                  }
                }}
                className="w-32 focus:w-48 transition-all duration-300 bg-secondary/50 border-none rounded-full px-4 py-1.5 text-xs outline-none focus:ring-1 focus:ring-accent"
              />
              <Search size={14} className="absolute right-3 top-2 text-gray-400 pointer-events-none" />
            </div>
            <Link to="/wishlist" className="relative group text-primary hover:text-accent transition-colors duration-300">
              <Heart size={22} className="stroke-[1.5px]" fill={wishlist.length > 0 ? "currentColor" : "none"} />
              {wishlist.length > 0 && (
                <span className="absolute -top-2 -right-2 bg-accent text-white text-[10px] w-4 h-4 rounded-full flex items-center justify-center font-bold">
                  {wishlist.length}
                </span>
              )}
            </Link>
            
            {userInfo ? (
              <div className="flex items-center space-x-6">
                <Link to="/orders" className="text-primary hover:text-accent transition-colors duration-300" title="My Orders">
                  <Package size={22} className="stroke-[1.5px]" />
                </Link>
                
                {userInfo.role === 'admin' && (
                  <div className="flex items-center space-x-4 border-l border-secondary pl-4">
                    <Link to="/admin/products" className="text-[10px] font-bold uppercase tracking-widest text-gray-400 hover:text-primary transition-colors">
                      Products
                    </Link>
                    <Link to="/admin/orders" className="text-[10px] font-bold uppercase tracking-widest text-gray-400 hover:text-primary transition-colors">
                      Orders
                    </Link>
                  </div>
                )}

                <button onClick={logout} className="text-primary hover:text-accent transition-colors duration-300 uppercase tracking-widest text-[10px] font-bold">
                  Logout
                </button>
              </div>
            ) : (
              <Link to="/login" className="text-primary hover:text-accent transition-colors duration-300">
                <User size={22} className="stroke-[1.5px]" />
              </Link>
            )}

            <Link to="/cart" className="relative group text-primary hover:text-accent transition-colors duration-300">
              <ShoppingCart size={22} className="stroke-[1.5px]" />
              <span className="absolute -top-2 -right-2 bg-accent text-white text-[10px] w-4 h-4 rounded-full flex items-center justify-center font-bold">
                {cartCount}
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
              <Link to="/wishlist" className="relative" onClick={() => setIsOpen(false)}>
                <Heart size={24} fill={wishlist.length > 0 ? "currentColor" : "none"} />
                {wishlist.length > 0 && (
                  <span className="absolute -top-2 -right-2 bg-accent text-white text-[10px] w-4 h-4 rounded-full flex items-center justify-center font-bold">
                    {wishlist.length}
                  </span>
                )}
              </Link>
              <Link to="/cart" className="relative" onClick={() => setIsOpen(false)}>
                <ShoppingCart size={24} />
                <span className="absolute -top-2 -right-2 bg-accent text-white text-[10px] w-4 h-4 rounded-full flex items-center justify-center font-bold">
                  {cartCount}
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
