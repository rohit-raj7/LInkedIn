 

import React, { useContext, useState } from 'react';
import axios from 'axios';
import SetupProfileForm from './SetupProfileForm';
import { AppContext } from '../context/AppContext';

function AuthModal({ isOpen, onClose }) {
  const { setUser, fetchUser } = useContext(AppContext);  

  const [isLogin, setIsLogin] = useState(true);
  const [formData, setFormData] = useState({ name: '', email: '', password: '' });
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [showProfileForm, setShowProfileForm] = useState(false);
  const [newUserId, setNewUserId] = useState(null);


  // const apiUrl = 'https://linkedinbackerd.vercel.app';

  const apiUrl = 'http://localhost:3001';

  if (!isOpen) return null;

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.id]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      if (isLogin) {
        const res = await axios.post(`${apiUrl}/api/auth/login`, {
          email: formData.email,
          password: formData.password
        });
        localStorage.setItem('token', res.data.token);
        localStorage.setItem('user', JSON.stringify(res.data.user)); 
        alert("Logged in successfully");
        setUser(res.data.user);
        onClose();
        window.location.reload();
      } else {
        const res = await axios.post(`${apiUrl}/api/auth/register`, {
          name: formData.name,
          email: formData.email,
          password: formData.password
        });
        localStorage.setItem('token', res.data.token);
        localStorage.setItem('user', JSON.stringify(res.data.user));
        setUser(res.data.user);
        setNewUserId(res.data.user._id); 
        setShowProfileForm(true); // Show setup form

      }
    } catch (err) {
      const msg = err.response?.data?.message || 'Something went wrong';
      if (msg.toLowerCase().includes("user not found")) {
        setError("User not registered. Please register first.");
      } else {
        setError(msg);
      }
    } finally {
      setLoading(false);
    }
  };

  const handleProfileComplete = () => {
    alert("Profile setup completed successfully!");
    onClose();
    window.location.reload();
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg shadow-xl w-full max-w-md">
        {showProfileForm ? (
          <SetupProfileForm userId={newUserId} onComplete={handleProfileComplete} />
        ) : (
          <>
            {/* Header */}
            <div className="flex justify-between items-center border-b px-6 py-4">
              <h3 className="text-lg font-semibold text-gray-900">
                {isLogin ? 'Login to your account' : 'Create your account'}
              </h3>
              <button onClick={onClose} className="text-gray-500 hover:text-gray-700">
                <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>

            {/* Toggle Buttons */}
            <div className="flex border-b">
              <button
                className={`flex-1 py-3 px-4 text-center font-medium ${isLogin ? 'text-blue-600 border-b-2 border-blue-600' : 'text-gray-500 hover:text-gray-700'}`}
                onClick={() => {
                  setIsLogin(true);
                  setError('');
                }}
              >
                Sign In
              </button>
              <button
                className={`flex-1 py-3 px-4 text-center font-medium ${!isLogin ? 'text-blue-600 border-b-2 border-blue-600' : 'text-gray-500 hover:text-gray-700'}`}
                onClick={() => {
                  setIsLogin(false);
                  setError('');
                }}
              >
                Sign Up
              </button>
            </div>

            {/* Form Section */}
            <div className="p-6">
              {error && <p className="text-red-500 mb-4">{error}</p>}
              <form onSubmit={handleSubmit}>
                {!isLogin && (
                  <div className="mb-4">
                    <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">Full Name</label>
                    <input
                      type="text"
                      id="name"
                      onChange={handleChange}
                      value={formData.name}
                      className="w-full px-3 py-2 border rounded-md focus:ring-2 focus:ring-blue-500"
                      required
                    />
                  </div>
                )}
                <div className="mb-4">
                  <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">Email</label>
                  <input
                    type="email"
                    id="email"
                    onChange={handleChange}
                    value={formData.email}
                    className="w-full px-3 py-2 border rounded-md focus:ring-2 focus:ring-blue-500"
                    required
                  />
                </div>
                <div className="mb-4">
                  <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-1">Password</label>
                  <div className="relative">
                    <input
                      type={showPassword ? "text" : "password"}
                      id="password"
                      onChange={handleChange}
                      value={formData.password}
                      className="w-full px-3 py-2 border rounded-md focus:ring-2 focus:ring-blue-500"
                      required
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      className="absolute right-2 top-2 text-sm text-gray-500"
                    >
                      {showPassword ? "Hide" : "Show"}
                    </button>
                  </div>
                </div>
                <button
                  type="submit"
                  disabled={loading}
                  className="w-full bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {loading ? 'Please wait...' : isLogin ? 'Sign In' : 'Sign Up'}
                </button>
              </form>

              {/* Toggle prompt below form */}
              <div className="mt-4 text-center text-sm">
                {isLogin ? (
                  <span>
                    Don’t have an account?{' '}
                    <button onClick={() => setIsLogin(false)} className="text-blue-600 hover:underline">
                      Sign Up
                    </button>
                  </span>
                ) : (
                  <span>
                    Already have an account?{' '}
                    <button onClick={() => setIsLogin(true)} className="text-blue-600 hover:underline">
                      Sign In
                    </button>
                  </span>
                )}
              </div>
            </div>
          </>
        )}
      </div>
    </div>
  );
}

export default AuthModal;

 