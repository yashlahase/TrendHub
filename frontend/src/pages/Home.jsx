import React, { useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import Hero from '../components/Hero';
import ProductCard from '../components/ProductCard';
import { ShopContext } from '../context/ShopContext';

const Home = () => {
  const { products, loading, error } = useContext(ShopContext);
  const navigate = useNavigate();

  if (loading) return <div className="pt-40 text-center">Loading luxury collections...</div>;
  if (error) return <div className="pt-40 text-center text-red-500">Error: {error}</div>;

  return (
    <div className="bg-white">
      <Hero />
      
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 bg-white">
        <div className="flex flex-col md:flex-row justify-between items-end mb-12">
          <div className="max-w-md">
            <h2 className="text-4xl font-serif mb-4 leading-tight">Featured <span className="italic text-accent underline">Collections</span></h2>
            <p className="text-gray-500 text-sm leading-relaxed">
              Curated styles for the modern individual. Quality craftsmanship meets contemporary design.
            </p>
          </div>
          <button onClick={() => window.scrollTo({ top: 800, behavior: 'smooth' })} className="mt-8 md:mt-0 btn-outline text-xs px-6 py-3">View All Products</button>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {products.map((product) => (
            <ProductCard key={product._id} product={product} />
          ))}
        </div>
      </section>

      {/* Categories Section */}
      <section className="bg-secondary py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="relative h-[400px] group overflow-hidden bg-white">
              <img 
                src="https://images.unsplash.com/photo-1483985988355-763728e1935b?auto=format&fit=crop&q=80&w=2850" 
                alt="Women Category"
                className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-110 opacity-80"
              />
              <div className="absolute inset-0 flex flex-col justify-center items-center text-center">
                <h3 className="text-4xl font-serif text-white mb-6 drop-shadow-lg">Women’s Essentials</h3>
                <button onClick={() => navigate('/category/women')} className="bg-white text-primary px-8 py-3 text-xs font-bold tracking-widest hover:bg-accent hover:text-white transition-all transform hover:scale-105">Shop Now</button>
              </div>
            </div>
            <div className="relative h-[400px] group overflow-hidden bg-white">
              <img 
                src="https://images.unsplash.com/photo-1490578474895-699cd4e2cf59?auto=format&fit=crop&q=80&w=2850" 
                alt="Men Category"
                className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-110 opacity-80"
              />
              <div className="absolute inset-0 flex flex-col justify-center items-center text-center">
                <h3 className="text-4xl font-serif text-white mb-6 drop-shadow-lg">Men’s Signature</h3>
                <button onClick={() => navigate('/category/men')} className="bg-white text-primary px-8 py-3 text-xs font-bold tracking-widest hover:bg-accent hover:text-white transition-all transform hover:scale-105">Shop Now</button>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;
