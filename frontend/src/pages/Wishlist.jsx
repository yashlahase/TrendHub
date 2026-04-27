import React, { useContext } from 'react';
import { Heart, ArrowLeft } from 'lucide-react';
import { Link } from 'react-router-dom';
import { ShopContext } from '../context/ShopContext';
import ProductCard from '../components/ProductCard';

const Wishlist = () => {
  const { wishlist } = useContext(ShopContext);

  return (
    <div className="bg-white min-h-screen pt-32 pb-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h1 className="text-4xl font-serif mb-12">Your <span className="italic text-accent underline">Wishlist</span></h1>

        {wishlist.length === 0 ? (
          <div className="text-center py-20 bg-secondary flex flex-col items-center">
            <Heart size={64} className="text-gray-300 mb-6" />
            <h2 className="text-2xl font-serif mb-4">Your wishlist is empty</h2>
            <Link to="/" className="btn-primary flex items-center">
              <ArrowLeft size={18} className="mr-2" /> Start Shopping
            </Link>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {wishlist.map((product) => (
              <ProductCard key={product._id} product={product} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default Wishlist;
