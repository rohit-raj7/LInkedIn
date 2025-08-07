 

import React, { useState, useEffect } from 'react';
import { Routes, Route, useLocation } from 'react-router-dom';
import { Toaster } from 'react-hot-toast'; // ✅ Added for toast notifications

import Navbar from './components/Navbar';
import FullProfileView from './components/FullProfileView';
import Profile from './components/Profile';
import Footer from './components/Footer';
import ProfileFeedLayout from './components/ProfileFeedLayout';
import SetupProfileForm from './components/SetupProfileForm';
import AppProvider from './context/AppContext';

const App = () => {
  const location = useLocation();
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [currentUser, setCurrentUser] = useState(null);
  const [posts, setPosts] = useState([]);
  const [isProfileSetup, setIsProfileSetup] = useState(false);
  const [loadingUser, setLoadingUser] = useState(true);

  useEffect(() => {
    const savedUser = localStorage.getItem('user');
    if (savedUser) {
      try {
        const parsedUser = JSON.parse(savedUser);
        setCurrentUser(parsedUser);
        setIsAuthenticated(true);
      } catch (err) {
        console.error('Failed to parse user:', err);
        localStorage.removeItem('user');
      }
    }
    setLoadingUser(false);
  }, []);

  const handleProfileSetupComplete = () => {
    setIsProfileSetup(true);
  };

  if (loadingUser) return <div className="text-center mt-10">Loading...</div>;

  return (
    <AppProvider>
      {/* ✅ Toast container for popup messages */}
      <Toaster position="top-center" reverseOrder={false} />

      <Navbar
        isAuthenticated={isAuthenticated}
        setIsAuthenticated={setIsAuthenticated}
        currentUser={currentUser}
        setCurrentUser={setCurrentUser}
      />

      <Routes>
        <Route
          path="/setup-profile"
          element={
            currentUser ? (
              <SetupProfileForm
                userId={currentUser.userId}
                onComplete={handleProfileSetupComplete}
              />
            ) : (
              <div className="text-center mt-10">Please log in first.</div>
            )
          }
        />
        <Route path="/profile/:userId" element={<FullProfileView />} />
        <Route
          path="/"
          element={
            isAuthenticated && isProfileSetup ? (
              <Profile currentUser={currentUser} posts={posts} />
            ) : (
              <ProfileFeedLayout />
            )
          }
        />
      </Routes>

      {location.pathname !== '/feed' && <Footer />}
    </AppProvider>
  );
};

export default App;
