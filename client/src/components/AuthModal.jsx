 

import React, { useState } from 'react';

function AuthModal({ isOpen, onClose }) {
  const [isLogin, setIsLogin] = useState(true);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg shadow-xl w-full max-w-md">
        <div className="flex justify-between items-center border-b px-6 py-4">
          <h3 className="text-lg font-semibold text-gray-900">Welcome to ConnectHub</h3>
          <button onClick={onClose} className="text-gray-500 hover:text-gray-700">
            <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        <div className="flex border-b">
          <button
            className={`flex-1 py-3 px-4 text-center font-medium ${isLogin ? 'text-blue-600 border-b-2 border-blue-600' : 'text-gray-500 hover:text-gray-700'}`}
            onClick={() => setIsLogin(true)}
          >
            Sign In
          </button>
          <button
            className={`flex-1 py-3 px-4 text-center font-medium ${!isLogin ? 'text-blue-600 border-b-2 border-blue-600' : 'text-gray-500 hover:text-gray-700'}`}
            onClick={() => setIsLogin(false)}
          >
            Sign Up
          </button>
        </div>

        <div className="p-6">
          {isLogin ? (
            <form>
              <div className="mb-4">
                <label htmlFor="login-email" className="block text-sm font-medium text-gray-700 mb-1">Email</label>
                <input type="email" id="login-email" className="w-full px-3 py-2 border rounded-md focus:ring-2 focus:ring-blue-500" placeholder="your@email.com" />
              </div>
              <div className="mb-4">
                <label htmlFor="login-password" className="block text-sm font-medium text-gray-700 mb-1">Password</label>
                <input type="password" id="login-password" className="w-full px-3 py-2 border rounded-md focus:ring-2 focus:ring-blue-500" placeholder="••••••••" />
              </div>
              <button type="submit" className="w-full bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 transition-colors">Sign In</button>
            </form>
          ) : (
            <form>
              <div className="mb-4">
                <label htmlFor="register-name" className="block text-sm font-medium text-gray-700 mb-1">Full Name</label>
                <input type="text" id="register-name" className="w-full px-3 py-2 border rounded-md focus:ring-2 focus:ring-blue-500" />
              </div>
              <div className="mb-4">
                <label htmlFor="register-email" className="block text-sm font-medium text-gray-700 mb-1">Email</label>
                <input type="email" id="register-email" className="w-full px-3 py-2 border rounded-md focus:ring-2 focus:ring-blue-500" />
              </div>
              <div className="mb-4">
                <label htmlFor="register-password" className="block text-sm font-medium text-gray-700 mb-1">Password</label>
                <input type="password" id="register-password" className="w-full px-3 py-2 border rounded-md focus:ring-2 focus:ring-blue-500" />
              </div>
              
              <button type="submit" className="w-full bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 transition-colors">Sign Up</button>
            </form>
          )}
        </div>
      </div>
    </div>
  );
}

export default AuthModal;
