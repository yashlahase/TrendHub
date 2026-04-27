import React, { useContext } from 'react';
import { ShoppingCart, Heart, Eye } from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';
import { ShopContext } from '../context/ShopContext';

const ProductCard = ({ product }) => {
  const { addToCart, toggleWishlist, wishlist } = useContext(ShopContext);
  const navigate = useNavigate();
  const inWishlist = wishlist.some((x) => x._id === product._id);

  const handleAddToCart = (e) => {
    e.stopPropagation();
    e.preventDefault();
    addToCart(product, 1);
    navigate('/cart');
  };

  return (
    <div className="group relative bg-white border border-secondary p-4 transition-all duration-500 hover:shadow-2xl overflow-hidden">
      {/* Product Image */}
      <div className="relative aspect-[4/5] overflow-hidden bg-secondary">
        <img
          src={product.image}
          alt={product.name}
          className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
        />
        
        {/* Quick Actions Overlay */}
        <div className="absolute inset-0 bg-black/20 flex flex-col items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
          <div className="flex gap-4">
            <button 
              onClick={(e) => { e.preventDefault(); navigate(`/product/${product._id}`); }}
              className="bg-white p-3 rounded-full hover:bg-accent hover:text-white transition-all transformtranslate-y-4 group-hover:translate-y-0 duration-300 shadow-lg">
              <Eye size={20} className="stroke-[1.5px]" />
            </button>
            <button 
              onClick={(e) => { e.preventDefault(); toggleWishlist(product); }}
              className={`bg-white p-3 rounded-full transition-all transform translate-y-4 group-hover:translate-y-0 duration-300 delay-75 shadow-lg ${inWishlist ? 'text-accent' : 'hover:bg-accent hover:text-white'}`}>
              <Heart size={20} className="stroke-[1.5px]" fill={inWishlist ? "currentColor" : "none"} />
            </button>
          </div>
          <button 
            onClick={handleAddToCart}
            className="mt-8 bg-primary text-white px-8 py-3 w-[80%] uppercase text-xs font-bold tracking-widest translate-y-8 group-hover:translate-y-4 transition-transform duration-500 hover:bg-accent">
            Add to Cart
          </button>
        </div>
      </div>

      {/* Product Info */}
      <div className="pt-6 pb-2 text-center">
        <span className="text-[10px] text-gray-400 uppercase tracking-widest font-bold mb-2 block">{product.category}</span>
        <Link to={`/product/${product._id}`}>
          <h3 className="text-lg font-serif mb-2 group-hover:text-accent transition-colors truncate">{product.name}</h3>
        </Link>
        <p className="text-xl font-bold tracking-tight text-primary">₹{product.price}</p>
      </div>
    </div>
  );
};

export default ProductCard;
