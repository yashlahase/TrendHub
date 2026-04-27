import React, { useEffect, useState, useContext } from 'react';
import { useNavigate, useParams, Link } from 'react-router-dom';
import api from '../services/api';
import { ShopContext } from '../context/ShopContext';
import { Save, ArrowLeft, Upload } from 'lucide-react';

const AdminProductEdit = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { userInfo } = useContext(ShopContext);
  const isEditMode = Boolean(id);

  const [productData, setProductData] = useState({
    name: '',
    price: 0,
    image: '',
    brand: '',
    category: '',
    countInStock: 0,
    description: '',
  });

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (isEditMode) {
      const fetchProduct = async () => {
        setLoading(true);
        try {
          const { data } = await api.get(`/products/${id}`);
          setProductData(data);
          setLoading(false);
        } catch (err) {
          setError(err.response?.data?.message || err.message);
          setLoading(false);
        }
      };
      fetchProduct();
    }
  }, [id, isEditMode]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setProductData({ ...productData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      if (isEditMode) {
        await api.put(`/products/${id}`, productData);
      } else {
        await api.post('/products', productData);
      }
      setLoading(false);
      navigate('/admin/products');
    } catch (err) {
      setError(err.response?.data?.message || err.message);
      setLoading(false);
    }
  };

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
      <div className="max-w-3xl mx-auto px-4">
        <div className="mb-12">
          <Link to="/admin/products" className="flex items-center text-[10px] font-bold uppercase tracking-widest text-gray-400 hover:text-primary transition-colors mb-4">
            <ArrowLeft size={14} className="mr-2" /> Back to Products
          </Link>
          <h1 className="text-4xl font-serif">
            {isEditMode ? 'Edit' : 'Add'} <span className="italic text-accent underline">Product</span>
          </h1>
        </div>

        <form onSubmit={handleSubmit} className="space-y-8 bg-secondary p-8 border-2 border-primary">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div>
              <label className="text-[10px] font-bold uppercase tracking-widest mb-2 block text-gray-500">Product Name</label>
              <input name="name" value={productData.name} onChange={handleChange} className="w-full p-3 bg-white border-2 border-secondary focus:border-accent outline-none" required />
            </div>
            <div>
              <label className="text-[10px] font-bold uppercase tracking-widest mb-2 block text-gray-500">Brand</label>
              <input name="brand" value={productData.brand} onChange={handleChange} className="w-full p-3 bg-white border-2 border-secondary focus:border-accent outline-none" required />
            </div>
            <div>
              <label className="text-[10px] font-bold uppercase tracking-widest mb-2 block text-gray-500">Category</label>
              <select name="category" value={productData.category} onChange={handleChange} className="w-full p-3 bg-white border-2 border-secondary focus:border-accent outline-none" required>
                <option value="">Select Category</option>
                <option value="Men">Men</option>
                <option value="Women">Women</option>
                <option value="Kids">Kids</option>
                <option value="Accessories">Accessories</option>
              </select>
            </div>
            <div>
              <label className="text-[10px] font-bold uppercase tracking-widest mb-2 block text-gray-500">Price (₹)</label>
              <input name="price" type="number" value={productData.price} onChange={handleChange} className="w-full p-3 bg-white border-2 border-secondary focus:border-accent outline-none" required />
            </div>
            <div>
              <label className="text-[10px] font-bold uppercase tracking-widest mb-2 block text-gray-500">Count In Stock</label>
              <input name="countInStock" type="number" value={productData.countInStock} onChange={handleChange} className="w-full p-3 bg-white border-2 border-secondary focus:border-accent outline-none" required />
            </div>
            <div>
              <label className="text-[10px] font-bold uppercase tracking-widest mb-2 block text-gray-500">Image URL</label>
              <div className="relative">
                <input name="image" value={productData.image} onChange={handleChange} className="w-full p-3 bg-white border-2 border-secondary focus:border-accent outline-none" required />
                <Upload size={18} className="absolute right-3 top-3 text-gray-400" />
              </div>
            </div>
          </div>

          <div>
            <label className="text-[10px] font-bold uppercase tracking-widest mb-2 block text-gray-500">Description</label>
            <textarea name="description" rows="5" value={productData.description} onChange={handleChange} className="w-full p-3 bg-white border-2 border-secondary focus:border-accent outline-none" required></textarea>
          </div>

          <div className="pt-4">
            <button type="submit" disabled={loading} className="btn-primary w-full flex items-center justify-center">
              {loading ? 'Saving...' : (
                <>
                  <Save size={18} className="mr-2" /> {isEditMode ? 'Update Product' : 'Create Product'}
                </>
              )}
            </button>
          </div>
          {error && <p className="text-red-500 text-xs text-center">{error}</p>}
        </form>
      </div>
    </div>
  );
};

export default AdminProductEdit;
