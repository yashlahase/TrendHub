import React, { useEffect, useState, useContext } from 'react';
import { Link } from 'react-router-dom';
import api from '../services/api';
import { ShopContext } from '../context/ShopContext';
import { Eye, Truck, CheckCircle, Clock, Package } from 'lucide-react';

const AdminOrders = () => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const { userInfo } = useContext(ShopContext);

  const fetchOrders = async () => {
    try {
      const { data } = await api.get('/orders');
      setOrders(data);
      setLoading(false);
    } catch (err) {
      setError(err.response?.data?.message || err.message);
      setLoading(false);
    }
  };

  useEffect(() => {
    if (userInfo && userInfo.role === 'admin') {
      fetchOrders();
    } else {
      setLoading(false);
    }
  }, [userInfo]);

  const deliverHandler = async (id) => {
    try {
      await api.put(`/orders/${id}/deliver`);
      fetchOrders();
    } catch (err) {
      alert(err.response?.data?.message || err.message);
    }
  };

  if (loading) return <div className="pt-40 text-center">Loading orders...</div>;
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
        <h1 className="text-4xl font-serif mb-12">Order <span className="italic text-accent underline">Management</span></h1>

        <div className="bg-white border-2 border-secondary overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-left">
              <thead>
                <tr className="bg-secondary text-primary uppercase text-[10px] font-bold tracking-widest border-b border-secondary">
                  <th className="px-6 py-4">Order ID</th>
                  <th className="px-6 py-4">Customer</th>
                  <th className="px-6 py-4">Date</th>
                  <th className="px-6 py-4">Total</th>
                  <th className="px-6 py-4">Paid</th>
                  <th className="px-6 py-4">Delivered</th>
                  <th className="px-6 py-4 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-secondary">
                {orders.map((order) => (
                  <tr key={order._id} className="hover:bg-secondary/50 transition-colors">
                    <td className="px-6 py-4 font-mono text-xs">{order._id}</td>
                    <td className="px-6 py-4 text-sm font-serif">{order.user?.name || 'Deleted User'}</td>
                    <td className="px-6 py-4 text-xs">{new Date(order.createdAt).toLocaleDateString()}</td>
                    <td className="px-6 py-4 font-bold">₹{order.totalPrice}</td>
                    <td className="px-6 py-4">
                      {order.isPaid ? (
                        <div className="flex items-center text-green-600">
                          <CheckCircle size={14} className="mr-1" />
                          <span className="text-[10px] font-bold uppercase tracking-widest">{new Date(order.paidAt).toLocaleDateString()}</span>
                        </div>
                      ) : (
                        <div className="flex items-center text-red-600">
                          <Clock size={14} className="mr-1" />
                          <span className="text-[10px] font-bold uppercase tracking-widest">Pending</span>
                        </div>
                      )}
                    </td>
                    <td className="px-6 py-4">
                      {order.isCancelled ? (
                        <div className="flex items-center text-red-600">
                          <span className="text-[10px] font-bold uppercase tracking-widest">Cancelled</span>
                        </div>
                      ) : order.isDelivered ? (
                        <div className="flex items-center text-green-600">
                          <Truck size={14} className="mr-1" />
                          <span className="text-[10px] font-bold uppercase tracking-widest">{new Date(order.deliveredAt).toLocaleDateString()}</span>
                        </div>
                      ) : (
                        <div className="flex items-center text-gray-400">
                          <Package size={14} className="mr-1" />
                          <span className="text-[10px] font-bold uppercase tracking-widest">Not Delivered</span>
                        </div>
                      )}
                    </td>
                    <td className="px-6 py-4 text-right">
                      <div className="flex justify-end space-x-4">
                        {!order.isDelivered && !order.isCancelled && (
                          <button onClick={() => deliverHandler(order._id)} className="text-[10px] font-bold uppercase tracking-widest text-primary hover:text-accent underline underline-offset-4">
                            Mark Delivered
                          </button>
                        )}
                        <Link to={`/order/${order._id}`} className="p-2 text-gray-400 hover:text-primary transition-colors">
                          <Eye size={18} />
                        </Link>
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

export default AdminOrders;
