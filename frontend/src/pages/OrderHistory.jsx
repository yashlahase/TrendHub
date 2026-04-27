import React, { useEffect, useState, useContext } from 'react';
import { Link } from 'react-router-dom';
import api from '../services/api';
import { ShopContext } from '../context/ShopContext';
import { Package, Clock, CheckCircle, Truck, ArrowRight } from 'lucide-react';

const OrderHistory = () => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const { userInfo } = useContext(ShopContext);

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const { data } = await api.get('/orders/myorders');
        setOrders(data);
        setLoading(false);
      } catch (err) {
        setError(err.response?.data?.message || err.message);
        setLoading(false);
      }
    };

    if (userInfo) {
      fetchOrders();
    } else {
      setLoading(false);
    }
  }, [userInfo]);

  const cancelHandler = async (id) => {
    if (window.confirm('Are you sure you want to cancel this order?')) {
      try {
        await api.put(`/orders/${id}/cancel`);
        const { data } = await api.get('/orders/myorders');
        setOrders(data);
      } catch (err) {
        alert(err.response?.data?.message || err.message);
      }
    }
  };

  if (loading) return <div className="pt-40 text-center">Loading your order history...</div>;
  if (error) return <div className="pt-40 text-center text-red-500">Error: {error}</div>;

  if (!userInfo) {
    return (
      <div className="pt-40 text-center min-h-screen">
        <h2 className="text-2xl font-serif mb-4">Please log in to view your orders</h2>
        <Link to="/login" className="btn-primary inline-block">Log In</Link>
      </div>
    );
  }

  return (
    <div className="bg-white min-h-screen pt-32 pb-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h1 className="text-4xl font-serif mb-12">Order <span className="italic text-accent underline">History</span></h1>

        {orders.length === 0 ? (
          <div className="text-center py-20 bg-secondary">
            <Package size={48} className="mx-auto text-gray-400 mb-4" />
            <p className="text-gray-500 mb-8">You haven't placed any orders yet.</p>
            <Link to="/" className="btn-primary">Start Shopping</Link>
          </div>
        ) : (
          <div className="space-y-8">
            {orders.map((order) => (
              <div key={order._id} className="border-2 border-secondary overflow-hidden group hover:border-primary transition-colors">
                <div className="bg-secondary p-6 flex flex-col md:flex-row justify-between items-center gap-4">
                  <div className="flex items-center gap-6">
                    <div className="bg-white p-3 rounded-full">
                      <Package size={24} className="text-primary" />
                    </div>
                    <div>
                      <p className="text-[10px] font-bold uppercase tracking-widest text-gray-400">Order ID</p>
                      <p className="font-mono text-sm">{order._id}</p>
                    </div>
                    <div>
                      <p className="text-[10px] font-bold uppercase tracking-widest text-gray-400">Date</p>
                      <p className="text-sm">{new Date(order.createdAt).toLocaleDateString()}</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-8">
                    <div className="text-right">
                      <p className="text-[10px] font-bold uppercase tracking-widest text-gray-400">Total Amount</p>
                      <p className="text-lg font-bold text-accent">₹{order.totalPrice}</p>
                    </div>
                    <div className={`px-4 py-1 text-[10px] font-bold uppercase tracking-widest ${order.isCancelled ? 'bg-red-100 text-red-700' : (order.isPaid ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700')}`}>
                      {order.isCancelled ? 'Cancelled' : (order.isPaid ? 'Paid' : 'Payment Pending')}
                    </div>
                  </div>
                </div>

                <div className="p-8">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
                    {/* Items */}
                    <div className="space-y-6">
                      <h3 className="text-sm font-bold uppercase tracking-widest border-b border-secondary pb-2 mb-4">Ordered Items</h3>
                      {order.orderItems.map((item) => (
                        <div key={item._id} className="flex gap-4">
                          <img src={item.image} alt={item.name} className="w-16 h-20 object-cover bg-secondary" />
                          <div className="flex-grow flex flex-col justify-center">
                            <h4 className="text-sm font-serif">{item.name}</h4>
                            <p className="text-xs text-gray-500 mt-1">Qty: {item.qty} × ₹{item.price}</p>
                          </div>
                          <div className="flex items-center">
                            <p className="font-bold text-sm">₹{item.qty * item.price}</p>
                          </div>
                        </div>
                      ))}
                    </div>

                    {/* Status Tracker */}
                    <div className="space-y-6">
                      <h3 className="text-sm font-bold uppercase tracking-widest border-b border-secondary pb-2 mb-4">Tracking</h3>
                      {order.isCancelled ? (
                        <div className="bg-red-50 border border-red-200 p-4 text-center">
                          <p className="text-red-700 font-bold mb-1">Order Cancelled</p>
                          <p className="text-xs text-red-500">Cancelled on {new Date(order.cancelledAt).toLocaleString()}</p>
                        </div>
                      ) : (
                        <div className="relative">
                          <div className="absolute left-4 top-0 bottom-0 w-0.5 bg-secondary"></div>
                          <div className="space-y-8 relative">
                            <div className="flex items-start gap-6">
                              <div className={`z-10 w-8 h-8 rounded-full flex items-center justify-center ${order.createdAt ? 'bg-primary text-white' : 'bg-secondary text-gray-400'}`}>
                                <CheckCircle size={16} />
                              </div>
                              <div>
                                <p className="text-xs font-bold uppercase tracking-widest">Order Placed</p>
                                <p className="text-[10px] text-gray-500">{new Date(order.createdAt).toLocaleString()}</p>
                              </div>
                            </div>
                            <div className="flex items-start gap-6">
                              <div className={`z-10 w-8 h-8 rounded-full flex items-center justify-center ${order.isPaid ? 'bg-primary text-white' : 'bg-secondary text-gray-400'}`}>
                                <Clock size={16} />
                              </div>
                              <div>
                                <p className="text-xs font-bold uppercase tracking-widest">Processing Payment</p>
                                <p className="text-[10px] text-gray-500">{order.isPaid ? 'Confirmed' : 'Awaiting confirmation'}</p>
                              </div>
                            </div>
                            <div className="flex items-start gap-6">
                              <div className={`z-10 w-8 h-8 rounded-full flex items-center justify-center ${order.isDelivered ? 'bg-primary text-white' : 'bg-secondary text-gray-400'}`}>
                                <Truck size={16} />
                              </div>
                              <div>
                                <p className="text-xs font-bold uppercase tracking-widest">Shipping Status</p>
                                <p className="text-[10px] text-gray-500">{order.isDelivered ? `Delivered on ${new Date(order.deliveredAt).toLocaleDateString()}` : 'In transit'}</p>
                              </div>
                            </div>
                          </div>
                        </div>
                      )}
                      
                      <div className="pt-6 flex items-center justify-between">
                        <Link 
                          to={`/product/${order.orderItems[0].product}`} 
                          className="text-[10px] font-bold uppercase tracking-widest text-primary flex items-center group-hover:text-accent transition-colors"
                        >
                          Buy it again <ArrowRight size={14} className="ml-2 group-hover:translate-x-1 transition-transform" />
                        </Link>
                        {!order.isCancelled && !order.isDelivered && (
                          <button 
                            onClick={() => cancelHandler(order._id)}
                            className="text-[10px] font-bold uppercase tracking-widest text-red-500 hover:text-red-700 transition-colors"
                          >
                            Cancel Order
                          </button>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default OrderHistory;
