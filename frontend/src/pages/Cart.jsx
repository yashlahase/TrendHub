import React, { useContext } from 'react';
import { ShoppingCart, Trash2, ArrowLeft, ArrowRight, Minus, Plus } from 'lucide-react';
import { Link } from 'react-router-dom';
import { ShopContext } from '../context/ShopContext';

const Cart = () => {
  const { cart, addToCart, removeFromCart } = useContext(ShopContext);

  const updateQty = (id, newQty) => {
    const item = cart.find(x => x._id === id);
    if (item) {
      addToCart(item, newQty);
    }
  };

  const subtotal = cart.reduce((acc, item) => acc + item.price * item.qty, 0);

  return (
    <div className="bg-white min-h-screen pt-32 pb-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h1 className="text-4xl font-serif mb-12">Your Shopping <span className="italic text-accent underline">Bag</span></h1>

        {cart.length === 0 ? (
          <div className="text-center py-20 bg-secondary flex flex-col items-center">
            <ShoppingCart size={64} className="text-gray-300 mb-6" />
            <h2 className="text-2xl font-serif mb-4">Your cart is empty</h2>
            <Link to="/" className="btn-primary flex items-center">
              <ArrowLeft size={18} className="mr-2" /> Start Shopping
            </Link>
          </div>
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
            {/* Cart Items */}
            <div className="lg:col-span-2 space-y-8">
              {cart.map((item) => (
                <div key={item._id} className="flex gap-6 border-b border-secondary pb-8 group">
                  <div className="w-32 h-40 bg-secondary overflow-hidden shrink-0">
                    <img src={item.image} alt={item.name} className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110" />
                  </div>
                  <div className="flex-grow flex flex-col justify-between py-2">
                    <div className="flex justify-between items-start">
                      <div>
                        <h3 className="text-lg font-serif mb-1 hover:text-accent transition-colors">
                          <Link to={`/product/${item._id}`}>{item.name}</Link>
                        </h3>
                        <p className="text-xl font-bold tracking-tight text-primary">₹{item.price}</p>
                      </div>
                      <button 
                        onClick={() => removeFromCart(item._id)}
                        className="text-gray-400 hover:text-red-500 transition-colors p-2"
                      >
                        <Trash2 size={20} />
                      </button>
                    </div>
                    
                    <div className="flex items-center space-x-6 mt-4">
                      <div className="flex items-center border border-secondary bg-white">
                        <button 
                          onClick={() => updateQty(item._id, item.qty - 1)}
                          className="px-4 py-2 hover:bg-secondary transition-colors"
                        >
                          <Minus size={14} />
                        </button>
                        <span className="px-6 py-2 font-bold text-sm">{item.qty}</span>
                        <button 
                          onClick={() => updateQty(item._id, item.qty + 1)}
                          className="px-4 py-2 hover:bg-secondary transition-colors"
                        >
                          <Plus size={14} />
                        </button>
                      </div>
                      <span className="text-xs font-bold uppercase tracking-widest text-gray-400">Total: ₹{item.price * item.qty}</span>
                    </div>
                  </div>
                </div>
              ))}
              
              <Link to="/" className="inline-flex items-center text-sm font-bold uppercase tracking-widest text-gray-500 hover:text-accent transition-colors pt-4">
                <ArrowLeft size={16} className="mr-2" /> Continue Shopping
              </Link>
            </div>

            {/* Order Summary */}
            <div className="lg:col-span-1">
              <div className="bg-white border-2 border-primary p-8 sticky top-32">
                <h2 className="text-2xl font-serif mb-8 border-b border-secondary pb-4">Order Summary</h2>
                <div className="space-y-4 mb-8">
                  <div className="flex justify-between text-sm uppercase tracking-widest">
                    <span className="text-gray-500">Subtotal ({cart.length} items)</span>
                    <span className="font-bold">₹{subtotal}</span>
                  </div>
                  <div className="flex justify-between text-sm uppercase tracking-widest">
                    <span className="text-gray-500">Shipping</span>
                    <span className="font-bold">FREE</span>
                  </div>
                  <div className="border-t border-secondary pt-4 flex justify-between">
                    <span className="text-lg font-bold uppercase tracking-widest">Total</span>
                    <span className="text-2xl font-bold tracking-tight text-accent">₹{subtotal}</span>
                  </div>
                </div>
                <button className="btn-primary w-full group flex items-center justify-center">
                  Proceed to Checkout <ArrowRight size={18} className="ml-2 transform group-hover:translate-x-1 transition-transform" />
                </button>
                <div className="mt-8 space-y-4">
                  <p className="text-[10px] text-gray-400 uppercase tracking-widest text-center">
                    Complimentary shipping on all luxury orders.
                  </p>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Cart;
