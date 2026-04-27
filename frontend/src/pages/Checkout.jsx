import React, { useContext, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { ShopContext } from '../context/ShopContext';
import api from '../services/api';
import { CreditCard, Truck, ShieldCheck, CheckCircle } from 'lucide-react';

const Checkout = () => {
  const { cart, userInfo, clearCart } = useContext(ShopContext);
  const navigate = useNavigate();
  const [orderPlaced, setOrderPlaced] = useState(false);

  const subtotal = cart.reduce((acc, item) => acc + item.price * item.qty, 0);

  const handlePlaceOrder = async (e) => {
    e.preventDefault();
    
    if (!userInfo) {
      navigate('/login?redirect=checkout');
      return;
    }

    const formData = new FormData(e.target);
    const shippingAddress = {
      address: formData.get('address'),
      city: formData.get('city'),
      postalCode: formData.get('postalCode'),
      country: formData.get('country') || 'India'
    };

    try {
      const orderData = {
        orderItems: cart.map(item => ({
          name: item.name,
          qty: item.qty,
          image: item.image,
          price: item.price,
          product: item._id
        })),
        shippingAddress,
        paymentMethod: 'Credit Card',
        itemsPrice: subtotal,
        taxPrice: 0,
        shippingPrice: 0,
        totalPrice: subtotal,
      };

      const { data } = await api.post('/orders', orderData);
      setOrderPlaced(true);
      clearCart();
    } catch (err) {
      console.error(err);
      alert(err.response?.data?.message || 'Failed to place order');
    }
  };

  if (cart.length === 0 && !orderPlaced) {
    return (
      <div className="pt-40 text-center min-h-screen">
        <h2 className="text-2xl font-serif mb-4">Your cart is empty</h2>
        <Link to="/" className="btn-primary inline-block">Continue Shopping</Link>
      </div>
    );
  }

  if (orderPlaced) {
    return (
      <div className="pt-40 pb-20 text-center min-h-screen bg-secondary flex flex-col items-center justify-center">
        <CheckCircle size={80} className="text-green-500 mb-6" />
        <h1 className="text-5xl font-serif mb-4 text-primary">Order Confirmed</h1>
        <p className="text-gray-500 mb-8 max-w-md">
          Thank you for your purchase. Your luxury items will be processed and shipped shortly. You will receive an email confirmation soon.
        </p>
        <Link to="/" className="btn-primary">Return to Home</Link>
      </div>
    );
  }

  return (
    <div className="bg-white min-h-screen pt-32 pb-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h1 className="text-4xl font-serif mb-12">Secure <span className="italic text-accent underline">Checkout</span></h1>

        <form onSubmit={handlePlaceOrder} className="grid grid-cols-1 lg:grid-cols-3 gap-12">
          {/* Checkout Form */}
          <div className="lg:col-span-2 space-y-12">
            
            {/* Contact Info */}
            <section>
              <h2 className="text-xl font-serif border-b border-secondary pb-2 mb-6">1. Contact Information</h2>
              {!userInfo && (
                <div className="bg-secondary p-4 mb-6 text-sm flex justify-between items-center">
                  <span className="text-gray-600">Already have an account?</span>
                  <Link to="/login" className="text-primary font-bold hover:text-accent uppercase tracking-widest text-[10px]">Log in</Link>
                </div>
              )}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="text-[10px] font-bold uppercase tracking-widest mb-2 block text-gray-500">Email Address</label>
                  <input name="email" type="email" defaultValue={userInfo?.email || ''} className="w-full p-3 border-2 border-secondary focus:border-accent outline-none" required />
                </div>
                <div>
                  <label className="text-[10px] font-bold uppercase tracking-widest mb-2 block text-gray-500">Phone Number</label>
                  <input name="phone" type="tel" className="w-full p-3 border-2 border-secondary focus:border-accent outline-none" />
                </div>
              </div>
            </section>

            {/* Shipping Address */}
            <section>
              <h2 className="text-xl font-serif border-b border-secondary pb-2 mb-6">2. Shipping Address</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                <div>
                  <label className="text-[10px] font-bold uppercase tracking-widest mb-2 block text-gray-500">First Name</label>
                  <input name="firstName" type="text" className="w-full p-3 border-2 border-secondary focus:border-accent outline-none" required />
                </div>
                <div>
                  <label className="text-[10px] font-bold uppercase tracking-widest mb-2 block text-gray-500">Last Name</label>
                  <input name="lastName" type="text" className="w-full p-3 border-2 border-secondary focus:border-accent outline-none" required />
                </div>
              </div>
              <div className="mb-6">
                <label className="text-[10px] font-bold uppercase tracking-widest mb-2 block text-gray-500">Address</label>
                <input name="address" type="text" className="w-full p-3 border-2 border-secondary focus:border-accent outline-none mb-3" placeholder="Street address" required />
                <input name="address2" type="text" className="w-full p-3 border-2 border-secondary focus:border-accent outline-none" placeholder="Apartment, suite, etc. (optional)" />
              </div>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div>
                  <label className="text-[10px] font-bold uppercase tracking-widest mb-2 block text-gray-500">City</label>
                  <input name="city" type="text" className="w-full p-3 border-2 border-secondary focus:border-accent outline-none" required />
                </div>
                <div>
                  <label className="text-[10px] font-bold uppercase tracking-widest mb-2 block text-gray-500">State / Province</label>
                  <input name="state" type="text" className="w-full p-3 border-2 border-secondary focus:border-accent outline-none" required />
                </div>
                <div>
                  <label className="text-[10px] font-bold uppercase tracking-widest mb-2 block text-gray-500">Postal Code</label>
                  <input name="postalCode" type="text" className="w-full p-3 border-2 border-secondary focus:border-accent outline-none" required />
                </div>
              </div>
            </section>

            {/* Payment Method */}
            <section>
              <h2 className="text-xl font-serif border-b border-secondary pb-2 mb-6">3. Payment</h2>
              <div className="bg-secondary p-6 mb-6 border-2 border-primary relative overflow-hidden">
                <div className="absolute top-0 right-0 p-4">
                  <CreditCard size={24} className="text-primary opacity-20" />
                </div>
                <h3 className="font-bold text-sm uppercase tracking-widest mb-6">Credit Card</h3>
                <div className="space-y-4">
                  <div>
                    <input name="cardNumber" type="text" placeholder="Card Number" className="w-full p-3 border border-gray-300 outline-none" required />
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <input name="expiry" type="text" placeholder="MM/YY" className="w-full p-3 border border-gray-300 outline-none" required />
                    <input name="cvc" type="text" placeholder="CVC" className="w-full p-3 border border-gray-300 outline-none" required />
                  </div>
                  <div>
                    <input name="cardName" type="text" placeholder="Name on Card" className="w-full p-3 border border-gray-300 outline-none" required />
                  </div>
                </div>
              </div>
            </section>

          </div>

          {/* Order Summary */}
          <div className="lg:col-span-1">
            <div className="bg-white border-2 border-primary p-8 sticky top-32">
              <h2 className="text-2xl font-serif mb-8 border-b border-secondary pb-4">Order Summary</h2>
              
              <div className="space-y-6 mb-8 max-h-64 overflow-y-auto pr-2">
                {cart.map((item) => (
                  <div key={item._id} className="flex gap-4">
                    <div className="w-16 h-20 bg-secondary shrink-0">
                      <img src={item.image} alt={item.name} className="w-full h-full object-cover" />
                    </div>
                    <div className="flex-grow flex flex-col justify-center">
                      <h4 className="text-sm font-serif truncate hover:text-clip">{item.name}</h4>
                      <p className="text-xs text-gray-500 mt-1">Qty: {item.qty}</p>
                      <p className="font-bold text-sm mt-1">₹{item.price * item.qty}</p>
                    </div>
                  </div>
                ))}
              </div>

              <div className="space-y-4 mb-8 border-t border-secondary pt-6">
                <div className="flex justify-between text-sm uppercase tracking-widest">
                  <span className="text-gray-500">Subtotal</span>
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
              
              <button type="submit" className="btn-primary w-full flex items-center justify-center">
                <ShieldCheck size={18} className="mr-2" /> Place Order
              </button>

              <div className="mt-6 flex flex-col space-y-3">
                <div className="flex items-center text-[10px] text-gray-400 uppercase tracking-widest">
                  <Truck size={14} className="mr-2 shrink-0" /> Complimentary delivery
                </div>
                <div className="flex items-center text-[10px] text-gray-400 uppercase tracking-widest">
                  <ShieldCheck size={14} className="mr-2 shrink-0" /> Secure encrypted payment
                </div>
              </div>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Checkout;
