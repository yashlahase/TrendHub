import React, { createContext, useState, useEffect } from 'react';
import api from '../services/api';

export const ShopContext = createContext();

const ShopProvider = ({ children }) => {
  const [products, setProducts] = useState([]);
  const [cart, setCart] = useState(
    localStorage.getItem('cart') ? JSON.parse(localStorage.getItem('cart')) : []
  );
  const [userInfo, setUserInfo] = useState(
    localStorage.getItem('userInfo') ? JSON.parse(localStorage.getItem('userInfo')) : null
  );
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  // Fetch all products on mount
  useEffect(() => {
    const fetchProducts = async () => {
      setLoading(true);
      try {
        const { data } = await api.get('/products');
        setProducts(data);
        setLoading(false);
      } catch (err) {
        setError(err.response?.data?.message || err.message);
        setLoading(false);
      }
    };
    fetchProducts();
  }, []);

  // Update localStorage when cart changes
  useEffect(() => {
    localStorage.setItem('cart', JSON.stringify(cart));
  }, [cart]);

  // Update localStorage when userInfo changes
  useEffect(() => {
    if (userInfo) {
      localStorage.setItem('userInfo', JSON.stringify(userInfo));
    } else {
      localStorage.removeItem('userInfo');
    }
  }, [userInfo]);

  const addToCart = (product, qty) => {
    const itemExists = cart.find((x) => x._id === product._id);
    if (itemExists) {
      setCart(
        cart.map((x) =>
          x._id === product._id ? { ...itemExists, qty: qty } : x
        )
      );
    } else {
      setCart([...cart, { ...product, qty }]);
    }
  };

  const removeFromCart = (id) => {
    setCart(cart.filter((x) => x._id !== id));
  };

  const login = async (email, password) => {
    try {
      const { data } = await api.post('/users/login', { email, password });
      setUserInfo(data);
      return data;
    } catch (err) {
      throw new Error(err.response?.data?.message || err.message);
    }
  };

  const register = async (name, email, password) => {
    try {
      const { data } = await api.post('/users', { name, email, password });
      setUserInfo(data);
      return data;
    } catch (err) {
      throw new Error(err.response?.data?.message || err.message);
    }
  };

  const logout = () => {
    setUserInfo(null);
  };

  return (
    <ShopContext.Provider
      value={{
        products,
        cart,
        userInfo,
        loading,
        error,
        addToCart,
        removeFromCart,
        login,
        register,
        logout,
      }}
    >
      {children}
    </ShopContext.Provider>
  );
};

export default ShopProvider;
