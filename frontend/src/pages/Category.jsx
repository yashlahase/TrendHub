import React, { useContext } from 'react';
import { useParams, Link } from 'react-router-dom';
import { ShopContext } from '../context/ShopContext';
import ProductCard from '../components/ProductCard';
import { ArrowLeft } from 'lucide-react';

const Category = () => {
  const { category } = useParams();
  const { products, loading, error } = useContext(ShopContext);

  if (loading) return <div className="pt-40 text-center">Loading luxury collections...</div>;
  if (error) return <div className="pt-40 text-center text-red-500">Error: {error}</div>;

  // Filter products by category, case-insensitive
  const categoryProducts = products.filter(
    (product) => product.category.toLowerCase() === category.toLowerCase()
  );

  return (
    <div className="bg-white min-h-screen pt-32 pb-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <Link to="/" className="flex items-center text-sm font-bold uppercase tracking-widest text-gray-500 hover:text-accent transition-colors mb-8">
          <ArrowLeft size={16} className="mr-2" /> Back to Home
        </Link>
        <h1 className="text-4xl font-serif mb-12 capitalize">{category} <span className="italic text-accent underline">Collection</span></h1>

        {categoryProducts.length === 0 ? (
          <div className="text-center py-20 bg-secondary flex flex-col items-center">
            <h2 className="text-2xl font-serif mb-4">No products found in this category</h2>
            <Link to="/" className="btn-primary inline-block">Continue Shopping</Link>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {categoryProducts.map((product) => (
              <ProductCard key={product._id} product={product} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default Category;
