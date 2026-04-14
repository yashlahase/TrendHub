import React, { useState, useContext } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Mail, Lock, User, ArrowRight } from 'lucide-react';
import { ShopContext } from '../context/ShopContext';

const Register = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [localError, setLocalError] = useState('');
  const [localLoading, setLocalLoading] = useState(false);

  const { register } = useContext(ShopContext);
  const navigate = useNavigate();

  const submitHandler = async (e) => {
    e.preventDefault();
    if (password !== confirmPassword) {
      setLocalError('Passwords do not match');
      return;
    }
    setLocalLoading(true);
    setLocalError('');
    try {
      await register(name, email, password);
      navigate('/');
    } catch (err) {
      setLocalError(err.message);
    } finally {
      setLocalLoading(false);
    }
  };

  return (
    <div className="min-h-screen pt-32 pb-20 bg-secondary flex items-center justify-center px-4">
      <div className="max-w-md w-full bg-white p-10 shadow-2xl relative overflow-hidden group">
        <div className="absolute top-0 left-0 w-full h-1 bg-accent transform origin-left transition-transform duration-500 scale-x-0 group-hover:scale-x-100" />
        
        <div className="text-center mb-10">
          <h1 className="text-4xl font-serif mb-2">Join TrendHub</h1>
          <p className="text-gray-400 text-sm uppercase tracking-widest font-bold">Create your account</p>
        </div>

        <form onSubmit={submitHandler} className="space-y-6">
          <div className="relative">
            <label className="text-[10px] font-bold uppercase tracking-widest mb-2 block text-gray-400">Full Name</label>
            <div className="relative">
              <User className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-300" size={18} />
              <input
                type="text"
                placeholder="Enter name"
                className="w-full pl-10 pr-4 py-3 border-2 border-secondary focus:border-accent outline-none transition-colors"
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
              />
            </div>
          </div>

          <div className="relative">
            <label className="text-[10px] font-bold uppercase tracking-widest mb-2 block text-gray-400">Email Address</label>
            <div className="relative">
              <Mail className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-300" size={18} />
              <input
                type="email"
                placeholder="Enter email"
                className="w-full pl-10 pr-4 py-3 border-2 border-secondary focus:border-accent outline-none transition-colors"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>
          </div>

          <div className="relative flex gap-4">
            <div className="w-1/2">
              <label className="text-[10px] font-bold uppercase tracking-widest mb-2 block text-gray-400">Password</label>
              <div className="relative">
                <Lock className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-300" size={18} />
                <input
                  type="password"
                  placeholder="Password"
                  className="w-full pl-10 pr-4 py-3 border-2 border-secondary focus:border-accent outline-none transition-colors"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                />
              </div>
            </div>
            <div className="w-1/2">
              <label className="text-[10px] font-bold uppercase tracking-widest mb-2 block text-gray-400">Confirm</label>
              <div className="relative">
                <Lock className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-300" size={18} />
                <input
                  type="password"
                  placeholder="Confirm"
                  className="w-full pl-10 pr-4 py-3 border-2 border-secondary focus:border-accent outline-none transition-colors"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  required
                />
              </div>
            </div>
          </div>

          <button
            type="submit"
            className="btn-primary w-full group flex items-center justify-center"
          >
            Create Account <ArrowRight size={18} className="ml-2 transform group-hover:translate-x-1 transition-transform" />
          </button>
        </form>

        <div className="mt-8 text-center border-t border-secondary pt-8">
          <p className="text-sm text-gray-500">
            Already have an account?{' '}
            <Link to="/login" className="text-primary font-bold hover:text-accent transition-colors">
              Login here
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Register;
