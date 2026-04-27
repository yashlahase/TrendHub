import React, { useState, useContext } from 'react';
import { ShoppingCart, Star, Truck, ShieldCheck, ArrowLeft } from 'lucide-react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { ShopContext } from '../context/ShopContext';
import api from '../services/api';

const ProductDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [qty, setQty] = useState(1);
  const [selectedSize, setSelectedSize] = useState('M');
  const [rating, setRating] = useState('');
  const [comment, setComment] = useState('');
  const { products, addToCart, userInfo } = useContext(ShopContext);

  const product = products.find((p) => p._id === id);

  const submitReviewHandler = async (e) => {
    e.preventDefault();
    try {
      await api.post(`/products/${id}/reviews`, { rating, comment });
      alert('Review submitted successfully! Please refresh to see it.');
      setRating('');
      setComment('');
    } catch (err) {
      alert(err.response?.data?.message || err.message);
    }
  };

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
                    <button 
                      key={size} 
                      onClick={() => setSelectedSize(size)}
                      className={`w-12 h-12 border-2 flex items-center justify-center text-sm font-bold transition-colors ${selectedSize === size ? 'border-primary bg-primary text-white' : 'border-secondary hover:border-accent'}`}
                    >
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
              onClick={() => {
                addToCart(product, qty);
                navigate('/cart');
              }}
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

        {/* Reviews Section */}
        <div className="mt-24 border-t border-secondary pt-16">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-16">
            {/* Reviews List */}
            <div className="lg:col-span-2">
              <h3 className="text-2xl font-serif mb-8">Customer <span className="italic text-accent underline">Reviews</span></h3>
              {product.reviews && product.reviews.length === 0 ? (
                <div className="bg-secondary p-8 text-center text-gray-500">No reviews yet. Be the first to review this product.</div>
              ) : (
                <div className="space-y-8">
                  {product.reviews && product.reviews.map((review) => (
                    <div key={review._id} className="border-b border-secondary pb-8">
                      <div className="flex justify-between items-center mb-4">
                        <span className="font-bold text-sm uppercase tracking-widest">{review.name}</span>
                        <span className="text-xs text-gray-400">{new Date(review.createdAt).toLocaleDateString()}</span>
                      </div>
                      <div className="flex text-accent mb-4">
                        {[...Array(5)].map((_, i) => (
                          <Star 
                            key={i} 
                            size={14} 
                            className={i < review.rating ? "fill-accent" : "fill-none"} 
                          />
                        ))}
                      </div>
                      <p className="text-gray-500 text-sm leading-relaxed">{review.comment}</p>
                    </div>
                  ))}
                </div>
              )}
            </div>

            {/* Review Form */}
            <div>
              <h3 className="text-2xl font-serif mb-8">Write a <span className="italic text-accent underline">Review</span></h3>
              {userInfo ? (
                <div className="bg-secondary p-8 border-2 border-primary">
                  <form onSubmit={submitReviewHandler} className="space-y-6">
                    <div>
                      <label className="text-[10px] font-bold uppercase tracking-widest mb-2 block text-gray-500">Rating</label>
                      <select 
                        value={rating} 
                        onChange={(e) => setRating(e.target.value)}
                        className="w-full p-3 bg-white border-2 border-secondary focus:border-accent outline-none"
                        required
                      >
                        <option value="">Select...</option>
                        <option value="1">1 - Poor</option>
                        <option value="2">2 - Fair</option>
                        <option value="3">3 - Good</option>
                        <option value="4">4 - Very Good</option>
                        <option value="5">5 - Excellent</option>
                      </select>
                    </div>
                    <div>
                      <label className="text-[10px] font-bold uppercase tracking-widest mb-2 block text-gray-500">Comment</label>
                      <textarea 
                        rows="4" 
                        value={comment}
                        onChange={(e) => setComment(e.target.value)}
                        className="w-full p-3 bg-white border-2 border-secondary focus:border-accent outline-none" 
                        placeholder="Share your thoughts..."
                        required
                      ></textarea>
                    </div>
                    <button type="submit" className="btn-primary w-full">Submit Review</button>
                  </form>
                </div>
              ) : (
                <div className="bg-secondary p-8 text-center border-2 border-primary">
                  <p className="mb-4">Please log in to write a review.</p>
                  <Link to="/login" className="btn-primary inline-block">Log In</Link>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductDetails;
