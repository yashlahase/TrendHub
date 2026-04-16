import React, { useState, useContext } from 'react';
import { ShoppingCart, Star, Truck, ShieldCheck, ArrowLeft } from 'lucide-react';
import { useParams, Link } from 'react-router-dom';
import { ShopContext } from '../context/ShopContext';

const ProductDetails = () => {
  const { id } = useParams();
  const [qty, setQty] = useState(1);
  const { products, addToCart } = useContext(ShopContext);

  const product = products.find((p) => p._id === id);

  if (!product) return <div className="pt-40 text-center">Product not found.</div>;

  return (
    <div className="bg-white min-h-screen pt-32 pb-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <Link to="/" className="flex items-center text-sm font-bold uppercase tracking-widest text-gray-500 hover:text-accent transition-colors mb-12">
          <ArrowLeft size={16} className="mr-2" /> Back to Collection
        </Link>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-start">
          {/* Image Gallery */}
          <div className="bg-secondary p-8 aspect-square overflow-hidden group">
            <img 
              src={product.image} 
              alt={product.name} 
              className="w-full h-full object-cover transition-transform duration-700 hover:scale-105"
            />
          </div>

          {/* Product Details */}
          <div className="flex flex-col space-y-8 animate-in fade-in slide-in-from-right duration-700">
            <div>
              <span className="text-xs font-bold uppercase tracking-widest text-accent mb-4 block">{product.category}</span>
              <h1 className="text-4xl md:text-5xl font-serif mb-4 leading-tight">{product.name}</h1>
              <div className="flex items-center space-x-4 mb-4">
                <div className="flex text-accent">
                  {[...Array(5)].map((_, i) => (
                    <Star 
                      key={i} 
                      size={18} 
                      className={i < Math.floor(product.rating) ? "fill-accent" : "fill-none"} 
                    />
                  ))}
                </div>
                <span className="text-sm font-medium text-gray-400">({product.numReviews} Reviews)</span>
              </div>
              <p className="text-3xl font-bold tracking-tight text-primary mt-6">₹{product.price}</p>
            </div>

            <p className="text-gray-500 leading-relaxed max-w-lg">
              {product.description}
            </p>

            <div className="space-y-6">
              {/* Size Selector placeholder */}
              <div>
                <label className="text-xs font-bold uppercase tracking-widest block mb-4">Select Size</label>
                <div className="flex space-x-3">
                  {['S', 'M', 'L', 'XL'].map((size) => (
                    <button key={size} className="w-12 h-12 border-2 border-secondary flex items-center justify-center text-sm font-bold hover:border-accent transition-colors">
                      {size}
                    </button>
                  ))}
                </div>
              </div>

              {/* Quantity */}
              <div className="flex items-center space-x-6">
                <label className="text-xs font-bold uppercase tracking-widest">Quantity</label>
                <div className="flex items-center border-2 border-secondary">
                  <button 
                    onClick={() => setQty(Math.max(1, qty - 1))}
                    className="px-4 py-2 hover:bg-secondary transition-colors"
                  >
                    -
                  </button>
                  <span className="px-6 py-2 font-bold">{qty}</span>
                  <button 
                    onClick={() => setQty(Math.min(product.countInStock, qty + 1))}
                    className="px-4 py-2 hover:bg-secondary transition-colors"
                  >
                    +
                  </button>
                </div>
              </div>
            </div>

            <button 
              onClick={() => addToCart(product, qty)}
              className="btn-primary w-full md:w-auto mt-4 px-12 group"
            >
              <ShoppingCart size={18} className="inline-block mr-2 group-hover:scale-110 transition-transform" /> Add to Cart
            </button>

            {/* Badges */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 pt-12 border-t border-secondary mt-12">
              <div className="flex items-start space-x-4">
                <Truck className="text-accent stroke-[1.5px]" />
                <div>
                  <h4 className="text-sm font-bold uppercase tracking-wider mb-1">Free Delivery</h4>
                  <p className="text-xs text-gray-400">On orders over ₹5,000</p>
                </div>
              </div>
              <div className="flex items-start space-x-4">
                <ShieldCheck className="text-accent stroke-[1.5px]" />
                <div>
                  <h4 className="text-sm font-bold uppercase tracking-wider mb-1">Secure Payment</h4>
                  <p className="text-xs text-gray-400">100% Secure payment processing</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductDetails;
