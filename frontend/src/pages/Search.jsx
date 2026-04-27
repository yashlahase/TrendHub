import React, { useEffect, useState, useContext } from 'react';
import { useParams, Link } from 'react-router-dom';
import api from '../services/api';
import ProductCard from '../components/ProductCard';
import { Search as SearchIcon, ArrowLeft } from 'lucide-react';

const Search = () => {
  const { keyword } = useParams();
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchProducts = async () => {
      setLoading(true);
      try {
        const { data } = await api.get(`/products?keyword=${keyword}`);
        setProducts(data);
        setLoading(false);
      } catch (err) {
        setError(err.response?.data?.message || err.message);
        setLoading(false);
      }
    };

    if (keyword) {
      fetchProducts();
    }
  }, [keyword]);

  if (loading) return <div className="pt-40 text-center">Searching luxury collections...</div>;
  if (error) return <div className="pt-40 text-center text-red-500">Error: {error}</div>;

  return (
    <div className="bg-white min-h-screen pt-32 pb-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mb-12">
          <Link to="/" className="flex items-center text-[10px] font-bold uppercase tracking-widest text-gray-400 hover:text-primary transition-colors mb-4">
            <ArrowLeft size={14} className="mr-2" /> Back to Home
          </Link>
          <h1 className="text-4xl font-serif">
            Search Results for <span className="italic text-accent underline">"{keyword}"</span>
          </h1>
        </div>

        {products.length === 0 ? (
          <div className="text-center py-20 bg-secondary flex flex-col items-center">
            <SearchIcon size={64} className="text-gray-300 mb-6" />
            <h2 className="text-2xl font-serif mb-4">No products found</h2>
            <p className="text-gray-500 mb-8 max-w-md">
              We couldn't find anything matching "{keyword}". Try adjusting your search or browse our featured collections.
            </p>
            <Link to="/" className="btn-primary">Browse All</Link>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {products.map((product) => (
              <ProductCard key={product._id} product={product} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default Search;
