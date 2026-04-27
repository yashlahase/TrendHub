import React, { useEffect, useState, useContext } from 'react';
import { Link } from 'react-router-dom';
import api from '../services/api';
import { ShopContext } from '../context/ShopContext';
import { Edit, Trash2, Plus, Package, ExternalLink } from 'lucide-react';

const AdminProducts = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const { userInfo } = useContext(ShopContext);

  const fetchProducts = async () => {
    try {
      const { data } = await api.get('/products');
      setProducts(data);
      setLoading(false);
    } catch (err) {
      setError(err.response?.data?.message || err.message);
      setLoading(false);
    }
  };

  useEffect(() => {
    if (userInfo && userInfo.role === 'admin') {
      fetchProducts();
    } else {
      setLoading(false);
    }
  }, [userInfo]);

  const deleteHandler = async (id) => {
    if (window.confirm('Are you sure you want to delete this product?')) {
      try {
        await api.delete(`/products/${id}`);
        fetchProducts();
      } catch (err) {
        alert(err.response?.data?.message || err.message);
      }
    }
  };

  if (loading) return <div className="pt-40 text-center">Loading products...</div>;
  if (error) return <div className="pt-40 text-center text-red-500">Error: {error}</div>;

  if (!userInfo || userInfo.role !== 'admin') {
    return (
      <div className="pt-40 text-center min-h-screen">
        <h2 className="text-2xl font-serif mb-4">Access Denied</h2>
        <Link to="/" className="btn-primary inline-block">Return Home</Link>
      </div>
    );
  }

  return (
    <div className="bg-white min-h-screen pt-32 pb-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center mb-12">
          <h1 className="text-4xl font-serif">Product <span className="italic text-accent underline">Management</span></h1>
          <Link to="/admin/product/new" className="btn-primary flex items-center">
            <Plus size={18} className="mr-2" /> Add New Product
          </Link>
        </div>

        <div className="bg-white border-2 border-secondary overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-left">
              <thead>
                <tr className="bg-secondary text-primary uppercase text-[10px] font-bold tracking-widest border-b border-secondary">
                  <th className="px-6 py-4">Image</th>
                  <th className="px-6 py-4">Name</th>
                  <th className="px-6 py-4">Category</th>
                  <th className="px-6 py-4">Price</th>
                  <th className="px-6 py-4">Stock</th>
                  <th className="px-6 py-4 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-secondary">
                {products.map((product) => (
                  <tr key={product._id} className="hover:bg-secondary/50 transition-colors">
                    <td className="px-6 py-4">
                      <img src={product.image} alt={product.name} className="w-12 h-16 object-cover bg-secondary" />
                    </td>
                    <td className="px-6 py-4 font-serif text-sm">
                      <div className="flex items-center">
                        {product.name}
                        <Link to={`/product/${product._id}`} target="_blank" className="ml-2 text-gray-400 hover:text-accent">
                          <ExternalLink size={14} />
                        </Link>
                      </div>
                    </td>
                    <td className="px-6 py-4 text-xs font-bold uppercase tracking-widest text-gray-500">{product.category}</td>
                    <td className="px-6 py-4 font-bold">₹{product.price}</td>
                    <td className="px-6 py-4">
                      <span className={`px-2 py-1 text-[10px] font-bold uppercase tracking-widest ${product.countInStock > 10 ? 'text-green-600' : 'text-red-600'}`}>
                        {product.countInStock} IN STOCK
                      </span>
                    </td>
                    <td className="px-6 py-4 text-right">
                      <div className="flex justify-end space-x-4">
                        <Link to={`/admin/product/${product._id}/edit`} className="p-2 text-gray-400 hover:text-primary transition-colors">
                          <Edit size={18} />
                        </Link>
                        <button onClick={() => deleteHandler(product._id)} className="p-2 text-gray-400 hover:text-red-600 transition-colors">
                          <Trash2 size={18} />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminProducts;
