 
import React, { useState, useEffect } from 'react';
import AuthModal from './AuthModal';
import { Link } from 'react-router-dom';



function Navbar() {
  const [isAuthModalOpen, setIsAuthModalOpen] = useState(false);
  const [user, setUser] = useState(null);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);


  useEffect(() => {
    const userData = localStorage.getItem('user');
    if (userData) {
      try {
        setUser(JSON.parse(userData));
      } catch (err) {
        console.error('Failed to parse user data:', err);
        localStorage.removeItem('user');
      }
    }
  }, []);

  const handleLogout = () => {
    localStorage.removeItem('user');
    localStorage.removeItem('token');
    setUser(null);
    setIsDropdownOpen(false);
    window.location.reload();
  };

  return (
    <>
      <nav className="bg-white border-b shadow-sm sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            {/* Logo and Brand */}
            <Link to="/" className="flex items-center space-x-2">
              
               
              <span className="text-xl font-bold text-blue-700 tracking-wide">ConnectHub</span>
            </Link>

            {/* Navigation Links */}
            <div className="hidden md:flex items-center space-x-6">
              <Link to="/" className="text-gray-700 hover:text-blue-600 font-medium text-sm">Feed</Link>
              <Link to="/" className="text-gray-700 hover:text-blue-600 font-medium text-sm">Network</Link>
              <Link to="/" className="text-gray-700 hover:text-blue-600 font-medium text-sm">Jobs</Link>
              <Link to="/" className="text-gray-700 hover:text-blue-600 font-medium text-sm">Messages</Link>
              <Link to="/setup-profile" className="text-gray-700 hover:text-blue-600 font-medium text-sm">Setup Profile</Link>
            </div>

            {/* User/Login Section */}
            <div className="flex items-center space-x-4 relative">
              {!user ? (
                <button
                  onClick={() => setIsAuthModalOpen(true)}
                  className="px-6 py-2 bg-blue-600 text-white text-sm font-semibold rounded-full hover:bg-blue-700 transition"
                >
                  Sign In
                </button>
              ) : (
                <div className="relative">
                  <button
                    onClick={() => setIsDropdownOpen(prev => !prev)}
                    className=" text-blue-600 font-medium hover:text-blue-500"
                  >
                    {user.name || 'User'}
                  </button>

                  {isDropdownOpen && (
                    <div className="absolute right-0 mt-2 w-44 bg-white border border-gray-200 rounded-xl shadow-xl z-20 animate-dropdown transition-all duration-200">
                      <div className="py-2">
                        {/* Optional: Profile link */}
                        <Link
                          to='/'
                          className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 hover:text-blue-600 transition rounded"
                        >
                          🧑‍💼 Profile
                        </Link>

                        <hr className="my-1 border-gray-200" />

                        {/* Logout */}
                        <button
                          onClick={handleLogout}
                          className="w-full text-left px-4 py-2 text-sm text-red-600 hover:bg-red-50 hover:text-red-700 transition rounded"
                        >
                          🚪 Logout
                        </button>
                      </div>
                    </div>
                  )}

                </div>
              )}
            </div>
          </div>
        </div>
      </nav>

      <AuthModal isOpen={isAuthModalOpen} onClose={() => setIsAuthModalOpen(false)} />
    </>
  );
}

export default Navbar;
